/* global utils,PVector */
(function (exports) {
  var Particle = function (location, paper) {
    this.height = paper.height;
    this.location = location.clone();
    this.lifespan = 1;
    this.acceleration = new PVector(0, -0.05);
    this.velocity = new PVector(utils.random(-1, 1), utils.random(1, -1));
    this.r = 6;
    this.highlight = false;
    this.body = paper.ellipse(this.location.x, this.location.y, this.r, this.r);
    this.body.attr({
      fill: '#777',
      stroke: '#222'
    });
  };

  Particle.prototype.intersects = function (particles) {
    this.highlight = false;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (p === this) {
        continue;
      }
      var d = PVector.dist(p.location, this.location);
      if (d < this.r + p.r) {
        this.highlight = true;
      }
    }
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
      opacity: this.lifespan,
      fill: '#777'
    });
    if (this.highlight) {
      this.body.animate({
        fill: '#900',
        opacity: 1
      });
    }
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
