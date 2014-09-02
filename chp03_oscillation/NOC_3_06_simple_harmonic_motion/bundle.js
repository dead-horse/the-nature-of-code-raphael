(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Mover,Attractor */
(function () {
  var paper = utils.setup(800, 200);

  var angle = 0;
  var aVelocity = 0.03;
  var amplitude = 300;

  var x = amplitude * Math.cos(angle);

  paper.setStart();
  var line = paper.path('M0 0L' + x + ' 0');
  line.attr({stroke: '#222'});
  var ball = paper.ellipse(x, 0, 20, 20);
  ball.attr({fill: '#888'});
  var st = paper.setFinish();

  st.transform('t400,100');
  utils.draw(60, function () {
    st.transform('t400,100');
    angle += aVelocity;
    var x = amplitude * Math.cos(angle);
    line.animate({path: 'M0 0L' + x + ' 0'});
    ball.animate({cx: x});
  });

})();

},{}]},{},[1])