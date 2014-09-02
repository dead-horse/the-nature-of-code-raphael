/* global utils,CannonBall,PVector */
(function () {
  var paper = utils.setup();

  var r = 0;
  var theta = 0;

  utils.draw(60, 1000, function () {
    var x = r * Math.cos(theta);
    var y = r * Math.sin(theta);

    paper.ellipse(x + paper.width / 2, y + paper.height / 2, 8, 8).attr({
      fill: '#222',
      'stroke-width': 0
    });
    r += 0.05;
    theta += 0.01;
  });
})();
