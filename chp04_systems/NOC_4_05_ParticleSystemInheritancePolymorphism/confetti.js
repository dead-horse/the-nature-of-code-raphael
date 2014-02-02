/* global utils,Particle */
(function (exports) {
  var Confetti = function (origin, paper) {
    Particle.call(this, origin, paper);
    this.width = paper.width;
    this.theta = utils.map(this.location.x, 0, this.width, 0, 360);

    this.body.remove(); // remove particle body
    this.body = paper.rect(this.location.x, this.location.y, 12, 12);
    this.body.attr({
      fill: '#777',
      stroke: '#222'
    });
    this.body.transform('r' + this.theta);
  };

  utils.inherits(Confetti, Particle);

  Confetti.prototype.display = function () {
    this.body.animate({
      x: this.location.x,
      y: this.location.y,
      opacity: this.lifespan
    });
    this.theta = utils.map(this.location.x, 0, this.width, 0, 360);
    this.body.transform('r' + this.theta);
  };

  exports.Confetti = Confetti;
}(this));
