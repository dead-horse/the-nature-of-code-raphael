/* global Particle,PVector */
(function (exports) {
  var rows = 20;
  var cols = 20;
  var ParticleSystem = function (origin, r, paper) {
    this.paper = paper;
    this.origin = origin.clone();
    this.particles = [];
    for (var i = 0; i < rows * cols; i++) {
      var p = new PVector(origin.x + (i % cols) * r,
        origin.y + Math.floor(i / rows) * r);
      this.particles.push(new Particle(p, r, paper));
    }
  };

  ParticleSystem.prototype.setOrigin = function (x, y) {
    this.origin.set(x, y);
    return this;
  };

  ParticleSystem.prototype.add = function () {
    this.particles.push(new Particle(this.origin, this.paper));
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

  ParticleSystem.prototype.isDead = function () {
    return !this.particles.length;
  };

  exports.ParticleSystem = ParticleSystem;
})(this);
