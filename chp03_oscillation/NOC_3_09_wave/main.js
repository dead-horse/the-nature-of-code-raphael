/* global utils,Wave */
(function () {
  var paper = utils.setup(800, 200);

  var wave = new Wave(paper);

  utils.draw(60, function () {
    wave.update().move();
  });
})();
