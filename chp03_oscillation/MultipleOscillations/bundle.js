(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector */
(function () {
  var paper = utils.setup(640, 360);
  var angle1 = 0;
  var aVelocity1 = 0.01;
  var amplitude1 = 300;

  var angle2 = 0;
  var aVelocity2 = 0.3;
  var amplitude2 = 10;

  var line = paper.path('M320 160L320160');
  var ball = paper.ellipse(320, 160, 8, 8);

  ball.attr({fill: '#888'});
  line.attr({stroke: '#000'});


  utils.draw(60, function () {
    var x = 0;
    x +=  Math.cos(angle1) * amplitude1;
    angle1 += aVelocity1;

    x +=  Math.sin(angle2) * amplitude2;
    angle2 += aVelocity2;

    ball.animate({
      cx: 320 + x
    });
    line.animate({
      path: 'M320 160L ' + (320 + x) + ' 160'
    });
  });

})();

},{}]},{},[1])