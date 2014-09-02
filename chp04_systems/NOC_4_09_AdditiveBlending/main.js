/* global utils,PVector,ParticleSystem */
(function () {
  var paper = utils.setup(640, 360, '#000');
  var img = 'data/texture.png';
  var startLocation = new PVector(320,  100);

  var ps = new ParticleSystem(0, startLocation, img, paper);


  utils.draw(30, function () {
    for (var i = 0; i < 10; i++) {
      ps.add();
    }
    ps.run();
  });
})();
