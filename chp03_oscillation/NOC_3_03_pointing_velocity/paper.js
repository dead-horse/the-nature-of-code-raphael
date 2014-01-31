/* global utils,PVector,Mover,Attractor */
(function () {
  var paper = utils.setup(640, 360);

  var mover = new Mover(new PVector(320, 180), new PVector(0, 0), paper);
  var mouse = new PVector(320, 180);
  utils.draw(40, function () {
    mover.update(mouse)
      .move()
      .checkEdges();
  });

  paper.canvas.onmousemove = function (e) {
    mouse.x = e.layerX;
    mouse.y = e.layerY;
  };
})();
