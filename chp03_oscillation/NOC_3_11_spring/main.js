/* global utils,PVector,Bob,Spring */
(function () {
  var paper = utils.setup();

  var spring = new Spring(new PVector(paper.width / 2, 10),
    100, 30, 200, paper);
  var bob = new Bob(new PVector(paper.width / 2, 100), paper);
  paper.text(70, paper.height - 20, 'click on bob to drag');

  bob.connect(spring);
  spring.lineTo(bob.location);
  var g = new PVector(0, 0.1);
  utils.draw(60, function () {
    bob
      .applyForce(PVector.mult(g, bob.mass))
      .pull()
      .update()
      .constrainLength();
    spring.lineTo(bob.location);
    bob.move();
  });
})();
