/* global utils,PVector,ParticleSystem */
(function () {
  var paper = utils.setup(640, 360, '#000');
  var img = 'data/texture.png';
  var startLocation = new PVector(320, paper.height - 100);

  var wind = new PVector();
  var ps = new ParticleSystem(startLocation, img, paper);
  // var g = new PVector(0, 0.01);
  var arrow = paper.path('M320 50L320 50');
  arrow.attr({
    stroke: '#fff'
  });

  utils.draw(30, function () {
    arrow.animate({
      path: 'M320 50L' + (320 + wind.x * 200) + ' 50'
    });
    ps.applyForce(wind)
      .add()
      .add()
      .add()
      .run();
  });

  paper.canvas.onmousemove = function (e) {
    var x = utils.map(e.layerX, 0, paper.width, -0.2, 0.2);
    wind.x = x;
  };
})();
