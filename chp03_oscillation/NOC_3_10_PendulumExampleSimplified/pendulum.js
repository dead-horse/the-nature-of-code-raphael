/* global PVector,utils */
(function (exports) {
  var Pendulum = function (origin, r, paper) {
    this.origin = origin; //line origin
    this.r = r; // line length
    this.paper = paper;
    this.position = new PVector();
    this.ballr = 48;

    this.angle = Math.PI / 4;
    this.aVelocity = 0;
    this.aAcceleration = 0;
    this.damping = 0.995;

    this.ball;
    this.line;

    this.g = 0.4;

    this._init();
  };

  Pendulum.prototype._getLinePath = function() {
    return 'M ' + this.origin.x + ' ' + this.origin.y +
    'L' + this.position.x + ' ' + this.position.y;
  };

  Pendulum.prototype._calPosition = function() {
    this.position.x = this.origin.x + this.r * Math.sin(this.angle);
    this.position.y = this.origin.y + this.r * Math.cos(this.angle);
  };

  Pendulum.prototype._init = function() {
    this._calPosition();
    this.line = this.paper.path(this._getLinePath());
    this.ball = this.paper.ellipse(this.position.x, this.position.y,
      this.ballr / 2, this.ballr / 2);

    this.line.attr({
      stroke: '#222'
    });

    this.ball.attr({
      fill: '#aaa',
      stroke: '#222'
    });
  };

  Pendulum.prototype.update = function () {
    this.aAcceleration = (-1 * this.g / this.r) * Math.sin(this.angle);
    this.aVelocity += this.aAcceleration;
    this.aVelocity *= this.damping;
    this.angle += this.aVelocity;
    return this;
  };

  Pendulum.prototype.move = function () {
    this._calPosition();
    this.line.animate({
      path: this._getLinePath()
    });

    this.ball.animate({
      cx: this.position.x,
      cy: this.position.y
    });

    return this;
  };

  exports.Pendulum = Pendulum;

})(this);
