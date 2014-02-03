/* global utils,PVector */
(function (exports) {
  var Particle = function (location, img, paper) {
    this.height = paper.height;
    this.location = location.clone();
    this.lifespan = 0.5;
    this.acceleration = new PVector(0, 0.1);
    // TODO: replace with gaussian rando
    this.velocity = new PVector(utils.random(-2, 2), utils.random(-2, 0));
    this.mass = 1;

    this.body = paper.image(img, this.location.x, this.location.y, 25, 25);
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
