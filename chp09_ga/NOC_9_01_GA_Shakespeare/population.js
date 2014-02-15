/* global DNA,utils */
(function (exports) {
  var Population = function (target, mutationRate, total) {
    this.mutationRate = mutationRate;
    this.total = total;
    this.target = target;
    this.population = [];
    this.matingPool = [];

    this._init();
  };

  Population.prototype._init = function () {
    for (var i = 0; i < this.total; i++) {
      this.population.push(new DNA(this.target.length));
    }
    this.calcFitness();

    this.finished = false;
    this.generations = 0;
    this.perfectScore = 1;
  };

  Population.prototype.calcFitness = function () {
    var target = this.target;
    this.population.forEach(function (p) {
      p.calcFitness(target);
    });
    return this;
  };

  Population.prototype.naturalSelection = function () {
    this.matingPool = [];
    var self = this;
    var maxFitness = 0;
    this.population.forEach(function (p) {
      if (p.fitness > maxFitness) {
        maxFitness = p.fitness;
      }
    });

    this.population.forEach(function (p) {
      var fitness = utils.map(p.fitness, 0, maxFitness, 0, 1);
      var n = Math.floor(fitness * 100);
      for (var i = 0; i < n; i++) {
        self.matingPool.push(p);
      }
    });

    return this;
  };

  Population.prototype.generate = function () {
    var matingPool = this.matingPool;
    var length = this.matingPool.length;
    for (var i = 0; i < this.total; i++) {
      var a = Math.floor(utils.random(length));
      var b = Math.floor(utils.random(length));

      var partnerA = matingPool[a];
      var partnerB = matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
    return this;
  };

  Population.prototype.getBest = function () {
    var worldrecord = 0;
    var index = 0;
    this.population.forEach(function (p, i) {
      if (p.fitness > worldrecord) {
        index = i;
        worldrecord = p.fitness;
      }
    });

    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
    return this.population[index].getPhrase();
  };

  Population.prototype.getGenerations = function () {
    return this.generations;
  };

  Population.prototype.getAverageFitness = function () {
    var total = this.population.reduce(function (a, b) {
      return (a.fitness || a) + b.fitness;
    });
    return (total / this.total).toFixed(5);
  };

  Population.prototype.allPhrases = function () {
    var everything = '';
    var displayLimit = Math.min(this.population.length, 50);
    this.population.forEach(function (p, i) {
      everything += p.getPhrase() + '\n';
    });
    return everything;
  };

  exports.Population = Population;
}(this));
