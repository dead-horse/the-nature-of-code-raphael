(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,ParticleSystem */
(function () {
  var paper = utils.setup();
  paper.text(65, paper.height - 30, 'click mouse to start');
  var startLocation = new PVector(utils.random(100, 400), 50);

  var ps = new ParticleSystem(startLocation, 6, paper);

  var start = false;
  paper.canvas.onmousedown = function (e) {
    if (!start) {
      utils.draw(function () {
        ps.run();
        if (ps.isDead()) {
          startLocation = new PVector(utils.random(100, 400), 50);
          ps = new ParticleSystem(startLocation, 6, paper);
          start = false;
        }
      });
    }
    start = true;
  };
})();

},{}]},{},[1])