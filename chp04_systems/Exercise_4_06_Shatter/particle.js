/* global utils,PVector */
(function (exports) {
  var Particle = function (location, r, paper) {
    this.height = paper.height;
    this.location = location.clone();
    this.lifespan = 1;
    this.acceleration = new PVector(0, 0.05);
    this.velocity = new PVector(utils.random(-0.5, 0.5), utils.random(-0.5, 0.5));

    this.body = paper.rect(this.location.x, this.location.y, r, r);
    this.body.attr({
      fill: '#222',
      stroke: '#222'
    });
    this.body.toBack();
  };

  Particle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 0.01;
    return this;
  };

  Particle.prototype.display = function () {
    this.body.animate({
      x: this.location.x,
      y: this.location.y,
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
