(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,Bob,Spring,PVector */
(function () {
  var paper = utils.setup(640, 360);

  var bobs = [];
  var springs = [];
  for (var i = 0; i < 5; i++) {
    bobs.push(new Bob(new PVector(paper.width / 2, i * 40 + 100), paper));
  }

  for (var i = 0; i < 4; i++) {
    springs.push(new Spring(bobs[i], bobs[i+1], 40, paper));
  }

  utils.draw(60, function () {
    springs.forEach(function (spring) {
      spring.update().display();
    });

    bobs.forEach(function (bob) {
      bob.update().move();
    });
  });

})();

},{}]},{},[1])