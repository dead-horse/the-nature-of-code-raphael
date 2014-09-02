/* global utils,PVector,ParticleSystem */
(function () {
  var paper = utils.setup(640, 360, '#000');
  var startLocation = new PVector(320, 50);
  var imgs = ['data/corona.png', 'data/emitter.png', 'data/particle.png',
  'data/texture.png'];
  var ps = new ParticleSystem(startLocation, imgs, paper);

  utils.draw(function () {
    ps.add()
      .add()
      .run();
  });

  paper.canvas.onmousemove = function (e) {
    ps.setOrigin(e.layerX, e.layerY);
  };
})();
