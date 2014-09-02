(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,CA */
(function () {
  var paper = utils.setup(640, 200);

  var rules = [];
  rules.push([0, 1, 0, 1, 1, 0, 1, 0]);
  rules.push([0, 1, 1, 1, 1, 0, 1, 1]);
  rules.push([0, 1, 1, 1, 1, 1, 0, 1]);
  rules.push([0, 1, 1, 1, 1, 0, 0, 0]);
  rules.push([0, 1, 1, 1, 0, 1, 1, 0]);
  var ca = new CA(rules[0], paper);

  var timer = utils.draw(10, loop);

  function loop() {
    ca.render()
      .generate();
  }
  var i = 0;
  paper.canvas.onmousedown = function () {
    i = (i + 1) % rules.length;
    ca.restart().setRules(rules[i]);
    paper.text(60, 10, 'click to change rules').toFront();
    // timer = utils.draw(10, loop);
  };

  paper.text(60, 10, 'click to change rules').toFront();
})();

},{}]},{},[1])