/* global utils,PVector,Mover,Attractor */
(function () {
  var paper = utils.setup(640, 360);

  var movers = [];
  for (var i = 0; i < 20; i++) {
    movers.push(new Mover(utils.random(0.1, 2),
      new PVector(utils.random(paper.width), utils.random(paper.height)),
      new PVector(1, 0), paper));
  }

  var attractor = new Attractor(paper.width / 2, paper.height / 2, paper);
  utils.draw(60, function () {
    movers.forEach(function (mover) {
      var attractForce = attractor.attract(mover);
      mover.applyForce(attractForce)
        .update()
        .move();
    });
  });

})();
