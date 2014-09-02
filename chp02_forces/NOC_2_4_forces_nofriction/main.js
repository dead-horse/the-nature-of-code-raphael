/* global utils,PVector,Mover */
(function () {
  var paper = utils.setup(383, 200);
  var wind = new PVector(0.01, 0);
  var gravity = new PVector(0, 0.1);

  var movers = [];
  for (var i = 0; i < 5; i++) {
    movers.push(new Mover(utils.random(1, 4), utils.random(paper.width), 0, paper));
  }

  utils.draw(60, function () {
    movers.forEach(function (mover) {

      mover.applyForce(wind)
        .applyForce(PVector.mult(gravity, mover.mass))
        .update()
        .checkEdges()
        .move();
    });
  });
})();
