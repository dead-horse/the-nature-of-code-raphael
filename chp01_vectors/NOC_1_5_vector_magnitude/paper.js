/*global PVector,utils*/

(function () {
  var paper = utils.setup();

  var path = paper.path();
  path.attr({
    fill: '#fff',
    stroke: '#fff'
  });

  var rect = paper.rect(0, 0, 0, 10);
  rect.attr({
    fill: '#fff',
    'stroke-width': 0
  });

  var center = new PVector(paper.width / 2, paper.height / 2);

  paper.canvas.onmousemove = function (e) {
    var mouse = new PVector(e.layerX, e.layerY);
    mouse.sub(center);

    var mag = mouse.mag();
    rect.animate({
      width: mag
    });

    var pathString = 'M0 0 L' + mouse.x + ' ' + mouse.y;
    var transformString = 't' + paper.width / 2 + ',' + paper.height / 2;
    path.animate({
      path: pathString
    }, 0);
    path.transform(transformString);
  };
})(this);
