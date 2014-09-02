(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Mover */
(function () {
  var paper = utils.setup(383, 200);
  var wind = new PVector(0.01, 0);
  var gravity = new PVector(0, 0.1);

  var movers = [];
  for (var i = 0; i < 5; i++) {
    movers.push(new Mover(utils.random(1, 4), utils.random(paper.width), 0, paper));
  }

  utils.draw(function () {
    movers.forEach(function (mover) {
      var friction = mover.velocity.clone();
      friction.normalize().mult(-0.05);

      mover.applyForce(wind)
        .applyForce(PVector.mult(gravity, mover.mass))
        .applyForce(friction)
        .update()
        .checkEdges()
        .move();
    });
  });
})();

},{}]},{},[1])