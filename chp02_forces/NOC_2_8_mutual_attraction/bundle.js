(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Mover,Attractor */
(function () {
  var paper = utils.setup(640, 360);

  var movers = [];
  for (var i = 0; i < 20; i++) {
    movers.push(new Mover(utils.random(0.2, 2),
      new PVector(utils.random(paper.width), utils.random(paper.height)),
      new PVector(0, 0), paper));
  }

  utils.draw(60, function () {
    for (var i = 0; i < movers.length; i++) {
      var mover = movers[i];
      for (var j = 0; j < movers.length; j++) {
        var attractor = movers[j];
        var f = attractor.attract(mover);
        mover.applyForce(f);
      }
      mover.update().move();
    }
  });
})();

},{}]},{},[1])