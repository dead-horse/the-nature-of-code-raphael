/* global utils,PVector */
(function (exports) {
  var Particle = function (location, img, paper) {
    this.height = paper.height;
    this.location = location.clone();
    this.lifespan = 0.5;
    this.acceleration = new PVector(0, -0.05);
    this.velocity = new PVector(utils.random(-1, 1), utils.random(-1, 0));
    this.r = 24;
    this.body = paper.image(img, this.location.x - this.r / 2,
      this.location.y - this.r / 2, this.r, this.r);
  };

  Particle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 0.005;
    return this;
  };

  Particle.prototype.display = function () {
    this.body.animate({
      x: this.location.x - this.r / 2,
      y: this.location.y - this.r / 2,
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
