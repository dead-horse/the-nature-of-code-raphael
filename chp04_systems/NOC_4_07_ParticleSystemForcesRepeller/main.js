/* global utils,PVector,ParticleSystem,Repeller */
(function () {
  var paper = utils.setup();
  var startLocation = new PVector(320, 50);
  var repeller = new Repeller(new PVector(300, 180), paper);
  var ps = new ParticleSystem(startLocation, paper);
  var g = new PVector(0, 0.1);
  utils.draw(60, function () {
    ps.applyForce(g)
      .applyRepeller(repeller)
      .add()
      .run();
  });
})();
