/*global PVector,utils,Oscillator*/
(function (exports) {
  var Crawler = function (mass, location, velocity, paper) {
    this.width = paper.width;
    this.height = paper.height;

    this.location = location.clone();
    this.velocity = velocity.clone();
    this.acceleration = new PVector(0,0);
    this.mass = mass;

    this.body = paper.ellipse(this.location.x, this.location.y,
      mass, mass);
    this.body.attr({
      fill: '#ccc',
      stroke: '#222',
      opacity: 0.7
    });
    this.osc = new Oscillator(this.location, this.mass * 2, paper);
  };

  Crawler.prototype.applyForce = function (force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
    return this;
  };

  Crawler.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.osc.update(this.location, this.velocity);
    return this;
  };

  Crawler.prototype.move = function () {
    this.body.animate({
      cx: this.location.x,
      cy: this.location.y
    });
    this.osc.display();
    return this;
  };

  Crawler.prototype.destory = function () {
    this.body.remove();
  };

  exports.Crawler = Crawler;

})(this);
