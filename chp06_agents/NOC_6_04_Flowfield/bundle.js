(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,FlowField,Vehicle,document */
(function () {
  var paper = utils.setup();

  var f = new FlowField(20, paper);
  f.display();

  var vehicles = [];
  for (var i = 0; i < 120; i++) {
    vehicles.push(new Vehicle(utils.random(paper.width), utils.random(paper.height),
      utils.random(2, 5), utils.random(0.1, 0.5), paper));
  }

  utils.draw(60, function () {
    vehicles.forEach(function (v) {
      v.follow(f).run();
    });
  });

  paper.canvas.onmousedown = function () {
    f.genFlow().display();
  };

  document.onkeydown = function (e) {
    if (e.keyCode === 32) {
      f.switchVisiable();
    }
    e.preventDefault();
    e.stopPropagation();
  };
  paper.text(120, paper.height - 30,
    'Hit space bar to toggle debugging lines.\nClick the mouse to generate a new flow field.');
})();

},{}]},{},[1])