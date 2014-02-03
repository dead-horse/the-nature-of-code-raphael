/* global Particle,PVector */
(function (exports) {
  var ParticleSystem = function (num, origin, img, paper) {
    this.paper = paper;
    this.origin = origin.clone();
    this.particles = [];
    this.img = img;

    // init with num particles
    for (var i = 0; i < num; i++) {
      this.particles.push(new Particle(this.origin, this.img, this.paper));
    }
  };

  ParticleSystem.prototype.add = function (p) {
    if (p) {
      this.particles.push(p);
      return this;
    }
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

  exports.ParticleSystem = ParticleSystem;
})(this);
