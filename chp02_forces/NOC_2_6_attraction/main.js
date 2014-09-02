/* global utils,PVector,Mover,Attractor */
(function () {
  var paper = utils.setup(640, 360);

  var mover = new Mover(1, new PVector(400, 100), new PVector(1, 0), paper);
  var attractor = new Attractor(paper.width / 2, paper.height / 2, paper);
  utils.draw(60, function () {
    var attractForce = attractor.attract(mover);
    mover.applyForce(attractForce)
      .update()
      .move();
  });

})();
