/* global utils */
(function (exports) {
  var DNA = function (num) {
    this.genes = [];
    for (var i = 0; i < num; i++) {
      var code = Math.floor(utils.random(32, 128));
      this.genes[i] = String.fromCharCode(code);
    }
    this.fitness;
  };

  DNA.prototype.getPhrase = function () {
    return this.genes.join('');
  };

  DNA.prototype.calcFitness = function (target) {
    var score = 0;
    this.genes.forEach(function (g, i) {
      if (g === target[i]) {
        score++;
      }
    });

    this.fitness = score / target.length;
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
        var code = Math.floor(utils.random(32, 128));
        this.genes[i] = String.fromCharCode(code);
      }
    }
  };

  exports.DNA = DNA;
})(this);
