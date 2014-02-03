/* global Particle,PVector,utils */
(function (exports) {
  var ParticleSystem = function (origin, imgs, paper) {
    this.paper = paper;
    this.origin = origin.clone();
    this.particles = [];
    this.imgs = imgs;
  };

  ParticleSystem.prototype.setOrigin = function (x, y) {
    this.origin.set(x, y);
    return this;
  };

  ParticleSystem.prototype.add = function () {
    var index = Math.floor(utils.random(this.imgs.length));
    this.particles.push(new Particle(this.origin, this.imgs[index], this.paper));
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
