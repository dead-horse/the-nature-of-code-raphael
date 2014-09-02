/* global utils,Wave,PVector */
(function () {
  var paper = utils.setup(800, 200);

  var wave0 = new Wave(new PVector(50, 75), 100, 20, 500, paper);
  var wave1 = new Wave(new PVector(300, 100), 300, 40, 220, paper);

  utils.draw(60, function () {
    wave0.update().move();
    wave1.update().move();
  });
})();
