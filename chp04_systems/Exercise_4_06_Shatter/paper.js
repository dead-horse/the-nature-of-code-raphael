/* global utils,PVector,ParticleSystem */
(function () {
  var paper = utils.setup();
  var startLocation = new PVector(utils.random(100, 400), 50);

  var ps = new ParticleSystem(startLocation, 6, paper);

  var start = false;
  paper.canvas.onmousedown = function (e) {
    if (!start) {
      utils.draw(function () {
        ps.run();
        if (ps.isDead()) {
          startLocation = new PVector(utils.random(100, 400), 50);
          ps = new ParticleSystem(startLocation, 6, paper);
          start = false;
        }
      });
    }
    start = true;
  };
})();
