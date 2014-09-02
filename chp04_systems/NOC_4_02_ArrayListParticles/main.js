/* global utils,PVector,Particle */
(function () {
  var paper = utils.setup();
  var startLocation = new PVector(320, 50);

  var particles = [];

  utils.draw(60, function () {
    particles.push(new Particle(startLocation, paper));
    particles.forEach(function (p, index) {
      p.run();
      if (p.isDead()) {
        p.destroy();
        particles.splice(index, 1);
      }
    });
  });
})();
