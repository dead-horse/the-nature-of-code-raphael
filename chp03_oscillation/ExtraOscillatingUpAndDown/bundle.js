(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector */
(function () {
  var paper = utils.setup(640, 360);
  var angle = 0;

  var line = paper.path('M320 160L320160');
  var ball = paper.ellipse(320, 160, 8, 8);

  ball.attr({fill: '#888'});
  line.attr({stroke: '#000'});

  utils.draw(60, function () {
    var y = 100 * Math.sin(angle);
    angle += 0.02;
    ball.animate({
      cy: 160 + y
    });
    line.animate({
      path: 'M320 160L320 ' + (160 + y)
    });
  });

})();

},{}]},{},[1])