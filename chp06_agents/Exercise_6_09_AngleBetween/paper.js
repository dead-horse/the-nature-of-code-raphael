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
