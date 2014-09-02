(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,Population,PVector */
(function () {
  var paper = utils.setup();

  var target = new PVector(paper.width / 2, 24);
  var mutationRate = 0.01;
  var lifetime = 360;
  var lifeCounter = 0;
  var popmax = 50;

  var population = new Population(target, mutationRate, popmax, paper);

  var targetBody = paper.circle(target.x, target.y, 12)
  .attr({fill: '#222', 'stroke-width': 0});
  utils.draw(30, function () {
    if (lifeCounter < lifetime) {
      population.live();
      lifeCounter++;
    } else {
      lifeCounter = 0;
      population.fitness()
        .selection()
        .reproduction();
    }
  });

  paper.canvas.onmousemove = function (e) {
    target.set(e.layerX, e.layerY);
    targetBody.animate({
      cx: target.x,
      cy: target.y
    });
  };

})();

},{}]},{},[1])