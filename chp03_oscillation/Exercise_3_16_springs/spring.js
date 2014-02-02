/* global PVector */
(function (exports) {
  var Spring = function (ballA, ballB, len, paper) {
    this.paper = paper;
    this.ballA = ballA;
    this.ballB = ballB;
    this.length = len;
    this.k = 0.2;

    this.line = paper.path();
    this.line.toBack();
  };

  Spring.prototype.update = function () {
    var force = PVector.sub(this.ballA.location, this.ballB.location);
    var dis = force.mag();

    force.normalize().mult(-this.k * (dis - this.length));
    this.ballA.applyForce(force);
    force.mult(-1);
    this.ballB.applyForce(force);
    return this;
  };

  Spring.prototype.display = function () {
    this.line.animate({
      path: 'M' + this.ballA.location.x + ' ' + this.ballA.location.y +
      'L' + this.ballB.location.x + ' ' + this.ballB.location.y
    });
    this.line.toBack();
  };

  exports.Spring = Spring;
})(this);
