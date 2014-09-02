(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Path,Vehicle */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var vehicles = [];

  var mouse = new PVector();
  for (var i = 0; i < 200; i++) {
    vehicles.push(new Vehicle(utils.random(width), utils.random(height), 3, 0.2, paper));
  }
  utils.draw(60, function () {
    vehicles.forEach(function (v) {
      v.seek(mouse).separate(vehicles).run();
    });
  });

  paper.canvas.onmousemove = function (e) {
    mouse.set(e.layerX, e.layerY);
  };
})();

},{}]},{},[1])