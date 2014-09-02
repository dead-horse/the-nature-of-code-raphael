/* global utils,PVector,Mover,Wind */
(function () {
  var paper = utils.setup(640, 360);

  var mover = new Mover(1, new PVector(paper.width / 2, paper.height / 2),
   new PVector(0, 0), paper);

  var wind = new Wind(paper);
  utils.draw(30, function () {
    wind.change();
    mover.applyForce(wind.force)
      .update()
      .move()
      .checkEdges();
  });

})();
