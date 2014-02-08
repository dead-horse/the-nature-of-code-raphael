/* global PVector,utils */
(function (exports) {
  var Vehicle = function (x, y, ms, mf, paper) {
    this.acceleration = new PVector();
    this.velocity = new PVector(2,2);
    this.location = new PVector(x,y);
    this.r = 3;
    this.maxspeed = ms;
    this.maxforce = mf;

    this.paper = paper;
    this.width = this.paper.width;
    this.height = this.paper.height;

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

  Vehicle.prototype.applyForce = function (f) {
    this.acceleration.add(f);
    return this;
  };

  // follow the flow
  Vehicle.prototype.follow = function (flow) {
    var desired = flow.lookup(this.location);
    desired.mult(this.maxspeed);
    var steer = PVector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
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
