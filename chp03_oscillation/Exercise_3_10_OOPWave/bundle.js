(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,Wave,PVector */
(function () {
  var paper = utils.setup(800, 200);

  var wave0 = new Wave(new PVector(50, 75), 100, 20, 500, paper);
  var wave1 = new Wave(new PVector(300, 100), 300, 40, 220, paper);

  utils.draw(60, function () {
    wave0.update().move();
    wave1.update().move();
  });
})();

},{}]},{},[1])