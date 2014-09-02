(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,Vehicle,PVector */
(function () {
  var paper = utils.setup();

  var v = new Vehicle(paper.width / 3, paper.height / 3, paper);

  var d = 25;
  var wall = paper.rect(d, d, paper.width - 2 * d, paper.height - 2 * d);
  wall.attr({stroke: '#222'}).toBack();
  var displayWall = true;

  utils.draw(60, function () {
    v.boundaries(wall.attrs)
      .update()
      .display();
  });

  paper.canvas.onmousedown = function () {
    if (displayWall) {
      wall.hide();
      displayWall = false;
    } else {
      wall.show();
      displayWall = true;
    }

  };

})();

},{}]},{},[1])