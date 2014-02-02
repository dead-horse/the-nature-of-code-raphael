/* global Particle,PVector,Confetti */
(function (exports) {
  var ParticleSystem = function (origin, paper) {
    this.paper = paper;
    this.origin = origin.clone();
    this.particles = [];
  };

  ParticleSystem.prototype.add = function () {
    if (Math.random() < 0.5) {
      this.particles.push(new Particle(this.origin, this.paper));
    } else {
      this.particles.push(new Confetti(this.origin, this.paper));
    }
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
