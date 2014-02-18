/* global Rocket,utils,DNA,PVector */
(function (exports) {
  var Population = function (target, mutationRate, total, paper) {
    this.paper = paper;
    this.width = paper.width;
    this.height = paper.height;

    this.mutationRate = mutationRate;
    this.total = total;
    this.target = target;
    this.population = [];
    this.matingPool = [];

    this._init();
  };

  Population.prototype._init = function () {
    var l = new PVector(this.width / 2, this.height + 20);
    for (var i = 0; i < this.total; i++) {
      var r = new Rocket(l, this.target, new DNA(), this.paper);
      this.population.push(r);
    }

    this.finished = false;
    this.generations = 0;
    this.perfectScore = 1;
  };

  Population.prototype.live = function () {
    this.population.forEach(function (p) {
      p.run();
    });
    return this;
  };

  Population.prototype.fitness = function () {
    this.population.forEach(function (p) {
      p.calFitness();
    });
    return this;
  };

  Population.prototype.selection = function () {
    this.matingPool = [];
    var maxFitness = this.getMaxFitness();
    var self = this;
    self.population.forEach(function (p) {
      var fitnessNormal = utils.map(p.getFitness(), 0, maxFitness, 0, 1);
      var n = Math.floor(fitnessNormal * 100);
      for (var j = 0; j < n; j++) {
        self.matingPool.push(p);
      }
    });
    return this;
  };

  Population.prototype.reproduction = function () {
    var matingPool = this.matingPool;
    var self = this;

    this.population.forEach(function (p, index) {
      var m = Math.floor(Math.random(matingPool.length));
      var d = Math.floor(Math.random(matingPool.length));

      var mom = matingPool[m];
      var dad = matingPool[d];
      var momgenes = mom.getDNA();
      var dadgenes = dad.getDNA();

      var child = momgenes.crossover(dadgenes);
      child.mutate(self.mutationRate);

      var location = new PVector(self.width / 2, self.height + 20);
      self.population[index].destroy();
      self.population[index] = new Rocket(location, self.target,
        child, self.paper);
    });
    this.generations++;
  };

  Population.prototype.getGenerations = function () {
    return this.generations;
  };

  Population.prototype.getMaxFitness = function () {
    var record = 0;
    this.population.forEach(function (p) {
      if (p.getFitness() > record) {
        record = p.getFitness();
      }
    });
    return record;
  };

  exports.Population = Population;
}(this));
