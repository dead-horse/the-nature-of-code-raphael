/* global Walker,utils */
(function () {
  var paper = utils.setup();
  var walker = new Walker(640, 320, paper);

  utils.draw(function () {
    walker.move();
  });
})();
