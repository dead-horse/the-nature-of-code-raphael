/* global PVector,utils */
(function (exports) {
  var Vehicle = function (x, y, ms, mf, paper) {
    this.acceleration = new PVector();
    this.location = new PVector(x,y);
    this.r = 6;
    this.maxspeed = ms;
    this.maxforce = mf;
    this.velocity = new PVector(ms, 0);

    this.paper = paper;
    this.width = this.paper.width;
    this.height - this.paper.height;

    this.normalPoint = new PVector(0, 0);
    this.target = new PVector(0, 0);

    this._initBody();
  };

  Vehicle.prototype._transform = function () {
    this.body.transform('t' + this.location.x + ',' + this.location.y);
    return this;
  };

  Vehicle.prototype._initBody = function () {
    this.body = this.paper.circle(0, 0, this.r);
    this.body.attr({fill: '#888', stroke: '#222'});
    this._transform();
    return this;
  };

  /**
   * A function to get the normal point from a point (p) to a line segment (a-b)
   */
  Vehicle.prototype.getNormalPoint = function (p, a, b) {
    var ap = PVector.sub(p, a);
    var ab = PVector.sub(b, a);
    ab.normalize();
    ab.mult(ap.dot(ab));
    var normalPoint = PVector.add(a, ab);
    return normalPoint;
  };

  /**
   * follow a path
   */
  Vehicle.prototype.follow = function (path) {
    var predict = this.velocity.clone();
    // predict location 50 ahead
    predict.normalize().mult(25);
    var predictLoc = PVector.add(this.location, predict);

    // get the nearest road
    var maxDist = 1000000;
    var pickPath = 0;
    var normalPoint;

    for (var i = 0; i < path.points.length; i++) {
      var start = path.points[i];
      var end = path.points[(i + 1) % path.points.length];
      var n = this.getNormalPoint(predictLoc, start, end);
      // check this vehicle if in this path
      if (n.x < Math.min(start.x, end.x) || n.x > Math.max(start.x, end.x) ||
        n.y < Math.min(start.y, end.y) || n.y > Math.max(start.y, end.y)) {
        n = end.clone();
        // e = 1;
      }

      var dist = PVector.dist(n, predictLoc);
      if (dist <= maxDist) {
        maxDist = dist;
        pickPath = i;
        normalPoint = n;
      }
    }

    // find target point a little further ahead normal point
    var dir = PVector.sub(path.points[(pickPath + 1) % path.points.length], path.points[pickPath]);
    dir.normalize().mult(25);
    this.target = PVector.add(normalPoint, dir);
    this.normalPoint = normalPoint;
    this.predictLoc = predictLoc;
    // if in the path, do not seek
    var distance = PVector.dist(normalPoint, predictLoc);
    if (distance > path.radius) {
      return this.seek(this.target);
    }

    return PVector();
  };

  Vehicle.prototype.separate = function (vehicles) {
    var desiredseparation = this.r * 2;
    var self = this;
    var count = 0;
    var sum = new PVector();
    vehicles.forEach(function (v) {
      var dist = PVector.dist(v.location, self.location);
      if (dist > 0 && dist < desiredseparation) {
        count++;
        var diff = PVector.sub(self.location, v.location);
        diff.normalize().div(dist);
        sum.add(diff);
      }
    });
    if (count > 0) {
      sum.normalize().mult(this.maxspeed);
      var steer = PVector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    }
    return new PVector();
  };

  Vehicle.prototype.applyForce = function (f) {
    this.acceleration.add(f);
    return this;
  };

  Vehicle.prototype.seek = function (target) {
    if (target.x === this.location.x && target.y === this.location.y) {
      return new PVector();
    }
    // first get the desired velocity
    var desired = PVector.sub(target, this.location);
    desired.setMag(this.maxspeed);

    //get the diff of v, and calculate the steer force
    var steer = PVector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  };

  Vehicle.prototype.update = function () {
    this.velocity.add(this.acceleration)
      .limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    return this;
  };

  Vehicle.prototype.applyBehaviors = function (path, vehicles) {
    // Follow path force
    var f = this.follow(path);
    // Separate from other boids force
    var s = this.separate(vehicles);
    // Arbitrary weighting
    f.mult(3);
    s.mult(1);
    // Accumulate in acceleration
    this.applyForce(f)
      .applyForce(s);
    return this;
  };

  Vehicle.prototype.display = function () {
    this._transform();
  };

  Vehicle.prototype.run = function () {
    this.update().display();
    return this;
  };

  exports.Vehicle = Vehicle;
})(this);
