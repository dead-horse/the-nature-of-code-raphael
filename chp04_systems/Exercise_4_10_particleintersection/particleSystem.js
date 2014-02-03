/* global Particle,PVector */
(function (exports) {
  var ParticleSystem = function (origin, paper) {
    this.paper = paper;
    this.origin = origin.clone();
    this.particles = [];
  };

  ParticleSystem.prototype.setOrigin = function (x, y) {
    this.origin.set(x, y);
    return this;
  };

  ParticleSystem.prototype.add = function () {
    this.particles.push(new Particle(this.origin, this.paper));
    return this;
  };

  ParticleSystem.prototype.intersects = function () {
    var self = this;
    this.particles.forEach(function (p) {
      p.intersects(self.particles);
    });
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

  exports.ParticleSystem = ParticleSystem;
})(this);
