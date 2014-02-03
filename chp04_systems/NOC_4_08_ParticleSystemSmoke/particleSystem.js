/* global Particle,PVector */
(function (exports) {
  var ParticleSystem = function (origin, img, paper) {
    this.paper = paper;
    this.origin = origin.clone();
    this.particles = [];
    this.img = img;
  };

  ParticleSystem.prototype.add = function () {
    this.particles.push(new Particle(this.origin, this.img, this.paper));
    return this;
  };

  ParticleSystem.prototype.run = function () {
    var self = this;
    this.particles.forEach(function (p, index) {
      p.run();
      if (p.isDead()) {
        p.destroy();
        self.particles.splice(index, 1);
      }
    });
    return this;
  };

  ParticleSystem.prototype.applyForce = function (force) {
    this.particles.forEach(function (p) {
      p.applyForce(force);
    });
    return this;
  };

  exports.ParticleSystem = ParticleSystem;
})(this);
