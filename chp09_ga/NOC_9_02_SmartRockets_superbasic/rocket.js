/* global DNA,utils,PVector */
(function (exports) {
  var Rocket = function (location, target, dna, paper) {
    this.acceleration = new PVector();
    this.velocity = new PVector();
    this.location = location.clone();
    this.r = 4;

    this.dna = dna;
    this.geneCounter = 0;

    this.target = target;

    this.fitness = 0;
    this.hitTarget = false;
    this.body = paper.circle(this.location.x, this.location.y, this.r);
    this.body.attr({
      fill: '#777',
      'stroke-width': 0
    });
  };

  Rocket.prototype.calFitness = function () {
    var d = PVector.dist(this.location, this.target);
    this.fitness = Math.pow(1 / d, 2);
    return this;
  };

  Rocket.prototype.run = function () {
    this.checkTarget();
    if (!this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update()
        .display();
    }
    return this;
  };

  Rocket.prototype.checkTarget = function () {
    var d = PVector.dist(this.location, this.target);
    if (d < 12) {
      this.hitTarget = true;
    }
    return this;
  };

  Rocket.prototype.applyForce = function (f) {
    this.acceleration.add(f);
    return this;
  };

  Rocket.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    return this;
  };

  Rocket.prototype.display = function () {
    this.body.animate({
      cx: this.location.x,
      cy: this.location.y
    });
    return this;
  };

  Rocket.prototype.getFitness = function () {
    return this.fitness;
  };

  Rocket.prototype.getDNA = function () {
    return this.dna;
  };

  Rocket.prototype.destroy = function () {
    this.body.remove();
    return this;
  }
  exports.Rocket = Rocket;
})(this);
