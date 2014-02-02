/* global utils,PVector,Particle */
(function () {
  var paper = utils.setup();
  var startLocation = new PVector(320, 50);

  var p = new Particle(startLocation, paper);

  utils.draw(60, function () {
    p.run();
    if (p.isDead()) {
      p.destroy();
      p = new Particle(startLocation, paper);
    }
  });
})();
