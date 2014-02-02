/* global utils,Bob,Spring,PVector */
(function () {
  var paper = utils.setup(640, 360);

  var bobs = [];
  var springs = [];
  for (var i = 0; i < 5; i++) {
    bobs.push(new Bob(new PVector(paper.width / 2, i * 40 + 100), paper));
  }

  for (var i = 0; i < 4; i++) {
    springs.push(new Spring(bobs[i], bobs[i+1], 40, paper));
  }

  utils.draw(60, function () {
    springs.forEach(function (spring) {
      spring.update().display();
    });

    bobs.forEach(function (bob) {
      bob.update().move();
    });
  });

})();
