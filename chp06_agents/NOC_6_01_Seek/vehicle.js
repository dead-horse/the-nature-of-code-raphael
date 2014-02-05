/* global PVector,utils */
(function (exports) {
  var Vehicle = function (x, y, paper) {
    this.acceleration = new PVector();
    this.velocity = new PVector(0,-2);
    this.location = new PVector(x,y);
    this.r = 6;
    this.maxspeed = 4;
    this.maxforce = 0.1;

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

  Vehicle.prototype.applyForce = function (f) {
    this.acceleration.add(f);
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

  exports.Vehicle = Vehicle;
})(this);
