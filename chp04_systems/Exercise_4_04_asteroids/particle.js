/* global utils,PVector */
(function (exports) {
  var Particle = function (location, paper) {
    this.height = paper.height;
    this.location = location.clone();
    this.lifespan = 1;
    this.acceleration = new PVector(0, 0.05);
    this.velocity = new PVector(utils.random(-1, 1), utils.random(1, -1));

    this.body = paper.ellipse(this.location.x, this.location.y, 6, 6);
    this.body.attr({
      fill: '#c00',
      stroke: '#222'
    });
    this.body.toBack();
  };

  Particle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 0.005;
    return this;
  };

  Particle.prototype.display = function () {
    this.body.animate({
      cx: this.location.x,
      cy: this.location.y,
      opacity: this.lifespan
    });
  };

  Particle.prototype.run = function () {
    this.update().display();
  };

  Particle.prototype.isDead = function () {
    return this.lifespan < 0 || this.location.y > this.height;
  };

  Particle.prototype.destroy = function () {
    this.body.remove();
  };

  exports.Particle = Particle;
})(this);
