(function (exports) {
  var Flock = function (boids) {
    this.boids = boids || [];
  };

  Flock.prototype.add = function (b) {
    this.boids.push(b);
  };

  Flock.prototype.run =function () {
    var self = this;
    this.boids.forEach(function (b) {
      b.run(self.boids);
    });
  };

  exports.Flock = Flock;
})(this);
