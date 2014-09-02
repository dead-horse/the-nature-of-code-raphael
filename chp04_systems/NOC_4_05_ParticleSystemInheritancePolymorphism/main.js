/* global utils,PVector,ParticleSystem */
(function () {
  var paper = utils.setup();
  var startLocation = new PVector(320, 50);

  var ps = new ParticleSystem(startLocation, paper);

  utils.draw(30, function () {
    ps.add()
      .run();
  });
})();
