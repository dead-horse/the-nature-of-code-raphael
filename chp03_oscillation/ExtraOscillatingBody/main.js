/* global utils,PVector,Mover,Attractor */
(function () {
  var paper = utils.setup(640, 360);

  var mover = new Mover(new PVector(400, 50), new PVector(1, 0), paper);
  var attractor = new Attractor(paper.width / 2, paper.height / 2, paper);
  utils.draw(60, function () {
    var attractForce = attractor.attract(mover);
    mover.applyForce(attractForce)
      .update()
      .move();
  });

})();
