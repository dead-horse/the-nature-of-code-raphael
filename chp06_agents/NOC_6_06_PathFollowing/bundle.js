(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Path,Vehicle */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var car1 = new Vehicle(0, height / 2, 2, 0.02, paper);
  var car2 = new Vehicle(0, height / 2, 3, 0.05, paper);

  var path = null;
  function newPath() {
    path = new Path(20, paper);
    path.addPoint(-20, height/2)
      .addPoint(utils.random(0, width/2), utils.random(0, height))
      .addPoint(utils.random(width/2, width), utils.random(0, height))
      .addPoint(width+20, height/2)
      .display();
  }

  newPath();

  utils.draw(60, function () {
    car1.follow(path).run().borders(path);
    car2.follow(path).run().borders(path);
  });

  window.onkeydown = function (e) {
    switch (e.keyCode) {
    case 32: // space
      car1.switchDebug();
      car2.switchDebug();
      break;
    }
    e.preventDefault();
    e.stopPropagation();
  };

  paper.canvas.onmousedown = function () {
    path && path.destroy();
    newPath();
  };

  paper.text(120, paper.height - 30,
    'Hit space bar to toggle debugging lines.\nClick the mouse to generate a new path.');
})();

},{}]},{},[1])