/* global utils,PVector,Mover */
(function () {
  var paper = utils.setup();
  var wind = new PVector(0.01, 0);
  var gravity = new PVector(0, 0.1);

  var mover = new Mover(paper);
  utils.draw(function () {
    mover.applyForce(wind)
      .applyForce(gravity)
      .update()
      .checkEdges()
      .move();
  });
})();
