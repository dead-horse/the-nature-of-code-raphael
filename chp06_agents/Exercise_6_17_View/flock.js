(function (exports) {
  var Flock = function (boids) {
    this.boids = boids || [];
  };

  Flock.prototype.add = function (b) {
    if (this.boids.length === 0) {
      b.select();
    }
    this.boids.push(b);
  };

  Flock.prototype.run =function () {
    var self = this;
    this.boids[0].view(this.boids);
    this.boids.forEach(function (b) {
      b.run(self.boids);
    });
  };

  exports.Flock = Flock;
})(this);
