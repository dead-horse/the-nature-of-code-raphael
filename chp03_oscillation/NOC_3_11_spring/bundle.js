(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Bob,Spring */
(function () {
  var paper = utils.setup();

  var spring = new Spring(new PVector(paper.width / 2, 10),
    100, 30, 200, paper);
  var bob = new Bob(new PVector(paper.width / 2, 100), paper);
  paper.text(70, paper.height - 20, 'click on bob to drag');

  bob.connect(spring);
  spring.lineTo(bob.location);
  var g = new PVector(0, 0.1);
  utils.draw(60, function () {
    bob
      .applyForce(PVector.mult(g, bob.mass))
      .pull()
      .update()
      .constrainLength();
    spring.lineTo(bob.location);
    bob.move();
  });
})();

},{}]},{},[1])