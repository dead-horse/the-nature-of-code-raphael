/* global utils,PVector,ParticleSystem */
(function () {
  var paper = utils.setup();

  paper.text(100, paper.height - 30, "click mouse to add particle systems");
  var pss = [];
  utils.draw(function () {
    pss.forEach(function (ps) {
      ps.add()
        .run();
    });
  });

  paper.canvas.onmousedown = function (e) {
    pss.push(new ParticleSystem(new PVector(e.layerX, e.layerY), paper));
  };
})();
