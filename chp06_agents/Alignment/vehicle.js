/* global PVector,utils */
(function (exports) {
  var Vehicle = function (x, y, ms, mf, paper) {
    this.acceleration = new PVector();
    this.velocity = new PVector(utils.random(-1, 1), utils.random(-1, 1));
    this.location = new PVector(x, y);
    this.r = 6;
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
    this.body.transform('t' + this.location.x + ',' + this.location.y);
  };

  Vehicle.prototype._initBody = function () {
    this.body = this.paper.circle(0, 0, this.r);
    this.body.attr({fill: '#888', stroke: '#222'});
    this._transform();
    return this;
  };

  Vehicle.prototype.applyForce = function (f) {
    this.acceleration.add(f);
    return this;
  };

  Vehicle.prototype.align = function (vehicles) {
    var neighbordist = 30;
    var sum = new PVector();
    var count = 0;
    var self = this;
    vehicles.forEach(function (vehicle) {
      var d = PVector.dist(self.location, vehicle.location);
      if (d > 0 && d < neighbordist) {
        sum.add(vehicle.velocity);
        count++;
      }
    });
    if (count > 0) {
      sum.div(count)
        .normalize()
        .mult(this.maxspeed);
      var steer = PVector.sub(sum, this.velocity)
        .limit(this.maxforce);
      this.applyForce(steer);
    }
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
