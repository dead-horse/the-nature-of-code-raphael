(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global PVector,utils*/

(function () {
  var paper = utils.setup();

  var path = paper.path();
  path.attr({
    fill: '#333',
    stroke: '#333'
  });

  var center = new PVector(paper.width / 2, paper.height / 2);
  paper.canvas.onmousemove = function (e) {
    var mouse = new PVector(e.layerX, e.layerY);
    mouse.sub(center).normalize().mult(150);
    var pathString = 'M0 0 L' + mouse.x + ' ' + mouse.y;
    var transformString = 't' + paper.width / 2 + ',' + paper.height / 2;
    path.animate({
      path: pathString
    }, 0);
    path.transform(transformString);
  };
})(this);


},{}]},{},[1])