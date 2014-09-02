/* global utils,PVector,ParticleSystem */
(function () {
  var paper = utils.setup();
  var startLocation = new PVector(320, 50);

  var ps = new ParticleSystem(startLocation, paper);

  utils.draw(function () {
    ps.add(utils.random(paper.width), utils.random(paper.height))
      .intersects()
      .run();
  });

  paper.canvas.onmousemove = function (e) {
    ps.setOrigin(e.layerX, e.layerY);
  };
})();
