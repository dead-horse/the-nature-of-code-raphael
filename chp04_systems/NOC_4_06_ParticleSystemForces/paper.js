/* global utils,PVector,ParticleSystem */
(function () {
  var paper = utils.setup();
  var startLocation = new PVector(320, 50);

  var ps = new ParticleSystem(startLocation, paper);
  var g = new PVector(0, 0.1);
  utils.draw(60, function () {
    ps.applyForce(g)
      .add()
      .run();
  });
})();
