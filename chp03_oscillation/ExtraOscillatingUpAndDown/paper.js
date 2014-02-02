/* global utils,PVector */
(function () {
  var paper = utils.setup(640, 360);
  var angle = 0;

  var line = paper.path('M320 160L320160');
  var ball = paper.ellipse(320, 160, 8, 8);

  ball.attr({fill: '#888'});
  line.attr({stroke: '#000'});

  utils.draw(60, function () {
    var y = 100 * Math.sin(angle);
    angle += 0.02;
    ball.animate({
      cy: 160 + y
    });
    line.animate({
      path: 'M320 160L320 ' + (160 + y)
    });
  });

})();
