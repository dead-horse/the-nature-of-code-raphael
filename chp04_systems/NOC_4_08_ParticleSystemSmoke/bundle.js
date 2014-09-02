(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,ParticleSystem */
(function () {
  var paper = utils.setup(640, 360, '#000');
  var img = 'data/texture.png';
  var startLocation = new PVector(320, paper.height - 100);

  var wind = new PVector();
  var ps = new ParticleSystem(startLocation, img, paper);
  // var g = new PVector(0, 0.01);
  var arrow = paper.path('M320 50L320 50');
  arrow.attr({
    stroke: '#fff'
  });

  utils.draw(30, function () {
    arrow.animate({
      path: 'M320 50L' + (320 + wind.x * 200) + ' 50'
    });
    ps.applyForce(wind)
      .add()
      .add()
      .add()
      .run();
  });

  paper.canvas.onmousemove = function (e) {
    var x = utils.map(e.layerX, 0, paper.width, -0.2, 0.2);
    wind.x = x;
  };
})();

},{}]},{},[1])