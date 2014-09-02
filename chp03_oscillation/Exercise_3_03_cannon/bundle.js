(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,CannonBall,PVector */
(function () {
  var paper = utils.setup();
  paper.text(120, paper.height - 20, 'use `space`, `left` and `right` to control');
  var startLocation = new PVector(50, 300);
  var cannonBall = new CannonBall(startLocation, paper);

  var gravity = new PVector(0, 0.2);

  utils.draw(60, function () {
    if (cannonBall.shotting) {
      cannonBall.applyForce(gravity);
    }
    cannonBall.update().move();
  });

  window.onkeydown = function (e) {
    switch (e.keyCode) {
    case 32: // space
      cannonBall.shot();
      break;
    case 37: // left
      cannonBall.turn(-0.03);
      break;
    case 39: // right
      cannonBall.turn(0.03);
      break;
    }
    e.preventDefault();
    e.stopPropagation();
  };
})();

},{}]},{},[1])