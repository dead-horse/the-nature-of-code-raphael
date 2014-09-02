(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Mover,Attractor */
(function () {
  var paper = utils.setup(640, 360);

  var mover = new Mover(new PVector(320, 180), new PVector(0, 0), paper);
  var mouse = new PVector(320, 180);
  utils.draw(40, function () {
    mover.update(mouse)
      .move()
      .checkEdges();
  });

  paper.canvas.onmousemove = function (e) {
    mouse.x = e.layerX;
    mouse.y = e.layerY;
  };
})();

},{}]},{},[1])