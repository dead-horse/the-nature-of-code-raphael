/* global PVector,utils */
(function (exports) {
  var CannonBall = function (location, paper) {
    this.paper = paper;
    this.height = paper.height;

    this.mass = 1;
    this.topspeed = 10;
    this.location = location.clone();
    this.startLocation = location.clone();
    this.acceleration = new PVector();
    this.velocity = new PVector();

    this.angle = -Math.PI / 4;
    this.shotting = false;

    this.cannon = paper.rect(this.startLocation.x - 4, this.startLocation.y - 4, 50, 10);
    this.cannon.attr({
      fill: '#ddd',
      stroke: '#222'
    });
    this._rotateCannon();
    this.ball = paper.ellipse(this.location.x, this.location.y, 8, 8);
    this.ball.attr({
      fill: '#999',
      stroke: '#222'
    });
  };

  CannonBall.prototype.applyForce = function (force) {
    this.acceleration.add(force.div(this.mass));
    return this;
  };

  CannonBall.prototype.update = function () {
    this.velocity.add(this.acceleration).limit(this.topspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    if (this.location.y >= this.height) {
      this.shotting = false;
      this.location = this.startLocation.clone();
      this.velocity.mult(0);
    }
    return this;
  };

  CannonBall.prototype.move = function () {
    this.ball.animate({
      cx: this.location.x,
      cy: this.location.y
    });
  };

  CannonBall.prototype._rotateCannon = function () {
    this.cannon.transform('r' + utils.degree(this.angle) + ',' +
      (this.startLocation.x) + ',' + (this.startLocation.y));
  };

  CannonBall.prototype.turn = function (diff) {
    this.angle += diff;
    this._rotateCannon();
  };

  CannonBall.prototype.shot = function () {
    if (this.shotting) {
      return this;
    }
    this.shotting = true;
    var force = PVector.fromAngle(this.angle).mult(10);
    this.applyForce(force);
    return this;
  };

  exports.CannonBall = CannonBall;
})(this);
