/* global PVector,utils */
(function (exports) {
  var Vehicle = function (x, y, paper) {
    this.acceleration = new PVector();
    this.velocity = new PVector(2,2);
    this.location = new PVector(x,y);
    this.r = 6;
    this.maxspeed = 4;
    this.maxforce = 0.1;

    this.paper = paper;
    this.width = this.paper.width;
    this.height - this.paper.height;

    this.history = [];
    this.maxHistory = 500;

    this._initBody();
  };

  Vehicle.prototype._getPath = function () {
    return 'M0 ' + (-this.r * 2) + 'L' + (-this.r) + ' ' +
      (this.r * 2) + 'L' + this.r + ' ' + (this.r * 2) + 'Z';
  };

  Vehicle.prototype._getHistoryPath = function () {
    var points = [];
    this.history.forEach(function (p) {
      points.push(Math.floor(p.x) + ',' + Math.floor(p.y));
    });
    return 'M' + points.join('L');
  };

  Vehicle.prototype._transform = function () {
    this.line.transform('t' + this.location.x + ',' + this.location.y + 'r' +
      utils.degree(this.velocity.heading() + Math.PI / 2));
  };

  Vehicle.prototype._initBody = function () {
    this.line = this.paper.path(this._getPath());
    this.line.attr({fill: '#888', stroke: '#222'});
    this.historyPath = this.paper.path();
    this.historyPath.attr({stroke: '#222'});
    this.historyPath.toBack();
    this._transform();
    return this;
  };

  Vehicle.prototype.applyForce = function (f) {
    this.acceleration.add(f);
    return this;
  };

  Vehicle.prototype.boundaries = function (bound) {
    var desired = null;
    if (this.location.x < bound.x) {
      desired = new PVector(this.maxspeed, this.velocity.y);
    } else if (this.location.x > bound.x + bound.width) {
      desired = new PVector(-this.maxspeed, this.velocity.y);
    }

    if (this.location.y < bound.y) {
      desired = new PVector(this.velocity.x, this.maxspeed);
    } else if (this.location.y > bound.y + bound.height) {
      desired = new PVector(this.velocity.x, -this.maxspeed);
    }

    if (desired) {
      desired.setMag(this.maxspeed);
      var steer = PVector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
    return this;
  };

  Vehicle.prototype.update = function () {
    this.history.push(this.location.clone());
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    this.velocity.add(this.acceleration)
      .limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    return this;
  };

  Vehicle.prototype.display = function () {
    this._transform();
    this.historyPath.animate({path: this._getHistoryPath()});
  };

  exports.Vehicle = Vehicle;
})(this);
