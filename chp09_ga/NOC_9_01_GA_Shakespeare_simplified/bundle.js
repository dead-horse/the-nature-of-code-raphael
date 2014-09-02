(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,DNA */
(function () {
  var paper = utils.setup();

  var mutationRate = 0.01;
  var totalPopulation = 20;
  var population = [];
  var matingPool = [];
  var target = 'to be or not to be';

  for (var i = 0; i < totalPopulation; i++) {
    population[i] = new DNA(target.length);
  }

  utils.draw(60, function () {
    paper.clear();
    matingPool = [];
    for (var i = 0; i < population.length; i++) {
      population[i].calcFitness(target);
    }

    for (var i = 0; i < population.length; i++) {
      var nnnn = population[i].fitness * 100;
      for (var j = 0; j < nnnn; j++) {
        matingPool.push(population[i]);
      }
    }

    for (var i = 0; i < population.length; i++) {
      var a = Math.floor(utils.random(matingPool.length));
      var b = Math.floor(utils.random(matingPool.length));

      var partnerA = matingPool[a];
      var partnerB = matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(mutationRate);
      population[i] = child;
    }

    var everything = '';
    population.forEach(function (p, i) {
      everything += p.getPhrase() + '\n';
    });

    paper.text(paper.width / 2, paper.height / 2, everything);
  });
})();

},{}]},{},[1])