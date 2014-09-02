/* global utils,PVector,Mover */
(function () {
  var paper = utils.setup(800, 200);
  var wind = new PVector(0.01, 0);
  var gravity = new PVector(0, 0.1);

  var movers = [];
  for (var i = 0; i < 20; i++) {
    movers.push(new Mover(utils.random(0.1, 4), paper));
  }

  utils.draw(function () {
    movers.forEach(function (mover) {
      mover.applyForce(wind)
        .applyForce(PVector.mult(gravity, mover.mass))
        .update()
        .checkEdges()
        .move();
    });
  });
})();
