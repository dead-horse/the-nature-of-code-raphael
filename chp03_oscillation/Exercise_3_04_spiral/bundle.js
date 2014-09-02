(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,CannonBall,PVector */
(function () {
  var paper = utils.setup();

  var r = 0;
  var theta = 0;

  utils.draw(60, 1000, function () {
    var x = r * Math.cos(theta);
    var y = r * Math.sin(theta);

    paper.ellipse(x + paper.width / 2, y + paper.height / 2, 8, 8).attr({
      fill: '#222',
      'stroke-width': 0
    });
    r += 0.05;
    theta += 0.01;
  });
})();

},{}]},{},[1])