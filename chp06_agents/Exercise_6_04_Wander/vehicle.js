/* global PVector,utils */
(function (exports) {
  var Vehicle = function (x, y, ms, mf, paper) {
    this.acceleration = new PVector();
    this.velocity = new PVector(utils.random(-1, 1), utils.random(-1, 1));
    this.location = new PVector(x, y);
    this.r = 3;
    this.maxspeed = ms;
    this.maxforce = mf;

    this.paper = paper;
    this.width = this.paper.width;
    this.height = this.paper.height;

    this.wandertheta = 0;

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

  Vehicle.prototype.seek = function (target) {
    // first get the desired velocity
    var desired = PVector.sub(target, this.location);
    desired.setMag(this.maxspeed);

    //get the diff of v, and calculate the steer force
    var steer = PVector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
    return this;
  };

  Vehicle.prototype.wander = function () {
    var wanderR = 25;
    var wanderD = 80;
    var change = 0.3;

    this.wandertheta += utils.random(-change, change);

    var circleloc = this.velocity.clone();
    circleloc.normalize().mult(wanderD).add(this.location);

    var h = this.velocity.heading();
    var circleOffSet = new PVector(wanderR * Math.cos(this.wandertheta + h),
      wanderR * Math.sin(this.wandertheta + h));
    var target = PVector.add(circleloc, circleOffSet);
    this.seek(target);
    return this;
  };

  Vehicle.prototype.applyForce = function (f) {
    this.acceleration.add(f);
    return this;
  };

  Vehicle.prototype.borders = function () {
    var location = this.location;
    var r = 3;
    if (location.x < -r) {
      location.x = this.width + r;
    }
    if (location.y < -r) {
      location.y = this.height + r;
    }
    if (location.x > this.width + r) {
      location.x = -r;
    }
    if (location.y > this.height + r) {
      location.y = -r;
    }
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
    this.update().borders().display();
    return this;
  };
  exports.Vehicle = Vehicle;
})(this);
