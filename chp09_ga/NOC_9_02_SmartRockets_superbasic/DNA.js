/* global utils,PVector */
(function (exports) {
  var DNA = function () {
    this.genes = [];
    for (var i = 0; i < 360; i++) {
      var angle = utils.random(Math.PI * 2);
      this.genes[i] = new PVector(Math.cos(angle), Math.sin(angle));
    }
    this.fitness;
  };

  DNA.prototype.setGenes = function (newgenes) {
    this.genes = newgenes;
    return this;
  };

  DNA.prototype.crossover = function (partner) {
    var child = new DNA(this.genes.length);
    var midpoint = Math.floor(utils.random(this.genes.length));

    this.genes.forEach(function (g, i) {
      if (i > midpoint) {
        child.genes[i] = g;
      } else {
        child.genes[i] = partner.genes[i];
      }
    });

    return child;
  };

  DNA.prototype.mutate = function (mutationRate) {
    for (var i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        var angle = utils.random(Math.PI * 2);
        this.genes[i] = new PVector(Math.cos(angle), Math.sin(angle));
      }
    }
  };

  exports.DNA = DNA;
})(this);
