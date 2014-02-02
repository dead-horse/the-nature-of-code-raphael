/* global utils,Bob,Spring,PVector */
(function () {
  var paper = utils.setup(640, 360);

  var b1 = new Bob(new PVector(paper.width / 2, 100), paper);
  var b2 = new Bob(new PVector(paper.width / 2, 200), paper);
  var b3 = new Bob(new PVector(paper.width / 2, 300), paper);

  var s1 = new Spring(b1, b2, 100, paper);
  var s2 = new Spring(b2, b3, 100, paper);
  var s3 = new Spring(b1, b3, 100, paper);

  utils.draw(60, function () {

    s1.update()
      .display();
    s2.update()
      .display();
    s3.update()
      .display();

    b1.update()
      .move();
    b2.update()
      .move();
    b3.update()
      .move();
  });

})();
