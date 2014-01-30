/* global Mover,PVector,utils */
(function () {
  var paper = utils.setup();
  var movers = [];
  for (var i = 0; i < 20; i++) {
    movers.push(new Mover(utils.random(640), utils.random(320), paper));
  }

  var mouse = new PVector(paper.width / 2, paper.height / 2);
  paper.canvas.onmousemove = function (e) {
    e = e || window.event;

    mouse.x = e.layerX;
    mouse.y = e.layerY;
  };

  utils.draw(function () {
    movers.forEach(function (mover) {
      mover.update(mouse);
      mover.move();
    });
  });
})();
