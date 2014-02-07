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

    this._initBody();
  };

  Vehicle.prototype._getPath = function () {
    return 'M0 ' + (-this.r * 2) + 'L' + (-this.r) + ' ' +
      (this.r * 2) + 'L' + this.r + ' ' + (this.r * 2) + 'Z';
  };

  Vehicle.prototype._transform = function () {
    this.line.transform('t' + this.location.x + ',' + this.location.y + 'r' +
      utils.degree(this.velocity.heading() + Math.PI / 2));
  };

  Vehicle.prototype._initBody = function () {
    this.line = this.paper.path(this._getPath());
    this.line.attr({fill: '#888', stroke: '#222'});
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
    predict.normalize().mult(50);
    var predictLoc = PVector.add(this.location, predict);

    var normalPoint = this.getNormalPoint(predictLoc, path.start, path.end);

    // find target point a little further ahead normal point
    var dir = PVector.sub(path.start, path.end);
    dir.normalize().mult(10);
    var target = PVector.add(normalPoint, dir);

    // if in the path, do not seek
    var distance = PVector.dist(normalPoint, predictLoc);
    if (distance > path.radius) {
      this.seek(target);
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
    this._transform();
  };

  Vehicle.prototype.run = function () {
    this.update().display();
    return this;
  };

  Vehicle.prototype.borders = function (path) {
    if (this.location.x > path.end.x + this.r) {
      this.location.x = path.start.x - this.r;
      this.location.y = path.start.y + (this.location.y - path.end.y);
    }
    return this;
  };

  exports.Vehicle = Vehicle;
})(this);
