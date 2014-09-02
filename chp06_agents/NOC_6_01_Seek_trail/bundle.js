(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,Vehicle,PVector */
(function () {
  var paper = utils.setup();

  var v = new Vehicle(paper.width / 3, paper.height / 3, paper);

  var mouse = new PVector(paper.width / 2, paper.height / 2);
  var target = paper.circle(mouse.x, mouse.y, 20);
  target.attr({fill: '#aaa', stroke: '#222'}).toBack();
  utils.draw(60, function () {
    v.seek(mouse)
      .update()
      .display();
  });

  paper.canvas.onmousemove = function (e) {
    mouse.set(e.layerX, e.layerY);
    target.animate({cx: e.layerX, cy: e.layerY});
  };

})();

},{}]},{},[1])