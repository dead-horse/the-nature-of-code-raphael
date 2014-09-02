(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Path,Vehicle */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var mouse = new PVector(width / 2 + 75, height / 2);
  var center = new PVector(width / 2, height / 2);

  var v = PVector.sub(mouse, center);
  var xaxis = new PVector(75, 0);

  var len = 75;
  var arrowsize = 5;
  var hline = drawArrow(len, arrowsize);
  var mline = drawArrow(len, arrowsize);
  hline.transform('t' + width / 2 + ' ' + height / 2);
  mline.transform('t' + width / 2 + ' ' + height / 2 +
    'r' + utils.degree(v.heading()) + ',0,0');

  var theta = 0;

  var text = paper.text(50, height / 2,
    'degrees: ' + utils.degree(theta).toFixed(2) + '\nradians: ' + theta.toFixed(2));

  paper.canvas.onmousemove = function (e) {
    mouse.set(e.layerX, e.layerY);
    v = PVector.sub(mouse, center);
    theta = PVector.angleBetween(v, xaxis);
    render();
  };

  function drawArrow(len, arrowsize) {
    paper.setStart();
    paper.path('M0 0L' + len + ' 0');
    paper.path('M' + len + ' 0L' + (len - arrowsize) +
      ' ' + (arrowsize / 2));
    paper.path('M' + len + ' 0L' + (len - arrowsize) +
      ' ' + (-arrowsize / 2));
    var arrow = paper.setFinish();
    arrow.attr({stroke: '#222'});
    return arrow;
  }

  function render() {
    mline.transform('t' + width / 2 + ' ' + height / 2 +
      'r' + utils.degree(v.heading()) + ',0,0');
    text.attr({
      text: 'degrees: ' + utils.degree(theta).toFixed(2) + '\nradians: ' + theta.toFixed(2)
    });
  }
})();

},{}]},{},[1])