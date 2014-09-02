(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Mover,Wind */
(function () {
  var paper = utils.setup(640, 360);

  var mover = new Mover(1, new PVector(paper.width / 2, paper.height / 2),
   new PVector(0, 0), paper);

  var wind = new Wind(paper);
  utils.draw(30, function () {
    wind.change();
    mover.applyForce(wind.force)
      .update()
      .move()
      .checkEdges();
  });

})();

},{}]},{},[1])