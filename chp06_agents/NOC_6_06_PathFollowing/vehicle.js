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
    this._initDebug();
    this.debug = true;
  };

  Vehicle.prototype._getPath = function () {
    return 'M0 ' + (-this.r * 2) + 'L' + (-this.r) + ' ' +
      (this.r * 2) + 'L' + this.r + ' ' + (this.r * 2) + 'Z';
  };

  Vehicle.prototype._transform = function () {
    this.line.transform('t' + this.location.x + ',' + this.location.y + 'r' +
      utils.degree(this.velocity.heading() + Math.PI / 2));
    return this;
  };

  Vehicle.prototype._initBody = function () {
    this.line = this.paper.path(this._getPath());
    this.line.attr({fill: '#888', stroke: '#222'});
    this._transform();
    return this;
  };

  Vehicle.prototype._initDebug = function () {
    this.paper.setStart();
    this.normalPointCircle = this.paper.circle(this.normalPoint.x, this.normalPoint.y, 3);
    this.targetCircle = this.paper.circle(this.target.x, this.target.y, 3);
    this.targetCircle.attr({fill: '#f00'});
    this.targetLine = this.paper.path().toBack();
    this.debugShape = this.paper.setFinish();
  };

  Vehicle.prototype._transformDebug = function () {
    this.targetCircle.animate({
      cx: this.target.x,
      cy: this.target.y
    }).toFront();
    this.normalPointCircle.animate({
      cx: this.normalPoint.x,
      cy: this.normalPoint.y
    }).toFront();
    this.targetLine.animate({
      path: 'M' + this.location.x + ' ' + this.location.y +
      'L' + this.target.x + ' ' + this.target.y
    });
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
    predict.normalize().mult(50);
    var predictLoc = PVector.add(this.location, predict);

    // get the nearest road
    var maxDist = 1000000;
    var pickPath = 0;
    var normalPoint;

    for (var i = 0; i < path.points.length - 1; i++) {
      var start = path.points[i];
      var end = path.points[i + 1];
      var n = this.getNormalPoint(predictLoc, start, end);

      // check this vehicle if in this path
      if ((start.x < end.x) && (n.x < start.x || n.x > end.x)) {
        n = end.clone();
      }

      var dist = PVector.dist(n, predictLoc);
      if (dist <= maxDist) {
        maxDist = dist;
        pickPath = i;
        normalPoint = n;
      }
    }

    // find target point a little further ahead normal point
    var dir = PVector.sub(path.points[pickPath + 1], path.points[pickPath]);
    dir.normalize().mult(10);
    this.target = PVector.add(normalPoint, dir);
    this.normalPoint = normalPoint;
    this.predictLoc = predictLoc;
    // if in the path, do not seek
    var distance = PVector.dist(normalPoint, predictLoc);
    if (distance > path.radius) {
      this.seek(this.target);
    }

    return this;
  };

  Vehicle.prototype.applyForce = function (f) {
    this.acceleration.add(f);
    return this;
  };

  Vehicle.prototype.seek = function (target) {
    if (target.x === this.location.x && target.y === this.location.y) {
      return this;
    }
    // first get the desired velocity
    var desired = PVector.sub(target, this.location);
    desired.setMag(this.maxspeed);

    //get the diff of v, and calculate the steer force
    var steer = PVector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);

    return this;
  };

  Vehicle.prototype.update = function () {
    this.velocity.add(this.acceleration)
      .limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    return this;
  };

  Vehicle.prototype.display = function () {
    this._transform()._transformDebug();
  };

  Vehicle.prototype.run = function () {
    this.update().display();
    return this;
  };

  Vehicle.prototype.borders = function (path) {
    if (this.location.x > path.getEnd().x + this.r) {
      this.location.x = path.getStart().x - this.r;
      this.location.y = path.getStart().y + (this.location.y - path.getEnd().y);
    }
    return this;
  };

  Vehicle.prototype.switchDebug = function () {
    this.debug = !this.debug;
    this.debug ? this.debugShape.show() : this.debugShape.hide();
    return this;
  };

  exports.Vehicle = Vehicle;
})(this);
