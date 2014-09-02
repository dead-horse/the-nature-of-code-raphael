(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,Spaceship,PVector */
(function () {
  var paper = utils.setup();
  paper.text(120, paper.height - 20, 'use `space`, `left` and `right` to control');

  var startLocation = new PVector(paper.width / 2, paper.height / 2);
  var spaceship = new Spaceship(startLocation, paper);
  utils.draw(60, function () {
    spaceship.update().move().wrapEdges();
  });

  window.onkeydown = function (e) {
    switch (e.keyCode) {
    case 32: // space
      spaceship.thrust();
      break;
    case 37: // left
      spaceship.turn(-0.03);
      break;
    case 39: // right
      spaceship.turn(0.03);
      break;
    }
    e.preventDefault();
    e.stopPropagation();
  };
})();

},{}]},{},[1])