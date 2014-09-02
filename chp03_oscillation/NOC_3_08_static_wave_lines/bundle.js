(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils */
(function () {
  var paper = utils.setup(800, 200);

  var angle = 0;
  var pathString = 'M0 100';
  for (var i = 1; i < paper.width; i++) {
    angle += 0.02;
    pathString += 'L' + i + ' ' + (Math.sin(angle) * 100 + 100);
    console.log((Math.sin(angle) * 200 - 100));
  }
  paper.path(pathString).attr({'stroke-width': 2});
})();

},{}]},{},[1])