(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Path,Vehicle */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var vehicles = [];
  for (var i = 0; i < 80; i++) {
    vehicles.push(new Vehicle(utils.random(width), utils.random(height),
      utils.random(2, 4), 0.3, paper));
  }
  var path = null;
  function newPath() {
    path = new Path(20, paper);
    var offset = 30;
    path.addPoint(offset,offset)
      .addPoint(width - offset, offset)
      .addPoint(width - offset, height - offset)
      .addPoint(width / 2, height - offset * 3)
      .addPoint(offset, height - offset)
      .display();
  }

  newPath();

  utils.draw(60, function () {
    vehicles.forEach(function (v) {
      v.applyBehaviors(path, vehicles).run();
    });
  });

  paper.text(120, paper.height - 30, 'Hit space bar to toggle debugging lines.');
})();

},{}]},{},[1])