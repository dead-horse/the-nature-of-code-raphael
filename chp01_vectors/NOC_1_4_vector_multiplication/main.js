/*global PVector,utils*/
var utils = require('../../utils');
var PVector = require('pvector');

var paper = utils.setup();

var path = paper.path();
path.attr({
  fill: '#333',
  stroke: '#333'
});

var center = new PVector(paper.width / 2, paper.height / 2);
paper.canvas.onmousemove = function (e) {
  var mouse = new PVector(e.layerX, e.layerY);
  mouse.sub(center).mult(0.5);
  var pathString = 'M0 0 L' + mouse.x + ' ' + mouse.y;
  var transformString = 't' + paper.width / 2 + ',' + paper.height / 2;
  path.animate({
    path: pathString
  }, 0);
  path.transform(transformString);
};
