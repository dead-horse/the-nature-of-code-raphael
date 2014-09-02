(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,Circle,Square */
(function () {
  var paper = utils.setup(200, 200);

  var sharps = [];
  var length = 30;

  for (var i = 0; i < length; i++) {
    if (Math.random() < 0.5) {
      sharps.push(new Circle(100, 100, 10,
        utils.getColorString(utils.random(255)), paper));
    } else {
      sharps.push(new Square(100, 100, 10, paper));
    }
  }
  utils.draw(60, function () {
    sharps.forEach(function (s) {
      s.jiggle();
      s.changeColor && s.changeColor();
      s.display();
    });
  });
})();

},{}]},{},[1])