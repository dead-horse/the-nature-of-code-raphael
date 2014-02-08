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
      this.applyForce(steer);
    }
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
