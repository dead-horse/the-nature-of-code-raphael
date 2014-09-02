(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,Population */
(function () {
  var paper = utils.setup();

  var target = "To be or not to be.";
  var popmax = 150;
  var mutationRate = 0.01;

  var population = new Population(target, mutationRate, popmax);

  utils.draw(60, function () {
    population.naturalSelection()
      .generate()
      .calcFitness();
    displayInfo();
    if (population.finished) {
      utils.stopDraw();
    }
  });

  function displayInfo() {
    paper.clear();
    var answer = population.getBest();
    paper.text(100, 30, 'Best phrase:' + answer);
    paper.text(100, 60, 'target phrase:' + target);
    paper.text(100, 90, 'total generations:' + population.getGenerations());
    paper.text(100, 120, 'average fitness:' + population.getAverageFitness());
    paper.text(100, 150, 'total population:' + population.total);
    paper.text(100, 180, 'mutation rate:' + Math.floor(population.mutationRate * 100) + '%');
    paper.text(400, 30, 'All phrase:\n' + population.allPhrases());
  }
})();

},{}]},{},[1])