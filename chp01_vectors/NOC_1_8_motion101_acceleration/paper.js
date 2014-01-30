/* global Mover,utils */
(function () {
  var paper = utils.setup();
  var mover = new Mover(640, 320, paper);

  utils.draw(function () {
    mover.update();
    mover.checkEdges();
    mover.move();
  });
})();
