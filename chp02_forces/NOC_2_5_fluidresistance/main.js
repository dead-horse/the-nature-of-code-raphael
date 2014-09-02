/* global utils,PVector,Mover,Liquid */
(function () {
  var paper = utils.setup(640, 360);
  var gravity = new PVector(0, 0.1);

  var movers = [];
  for (var i = 0; i < 10; i++) {
    movers.push(new Mover(utils.random(1, 4), utils.random(paper.width), 0, paper));
  }

  var liquid = new Liquid({
    x: 0,
    y: paper.height / 2,
    width: paper.width,
    height: paper.height / 2
  }, 0.05, paper);

  var t = paper.text(40, 20, "click to reset");

  utils.draw(60, function () {
    movers.forEach(function (mover) {
      if (liquid.contain(mover)) {
        var dragForce = liquid.drag(mover);
        mover.applyForce(dragForce);
      }
      mover.applyForce(PVector.mult(gravity, mover.mass))
        .update()
        .checkEdges()
        .move();
    });
  });

  paper.canvas.onmousedown = function () {
    movers.forEach(function (mover) {
      mover.destory();
    });

    movers = [];
    for (var i = 0; i < 10; i++) {
      movers.push(new Mover(utils.random(1, 4), utils.random(paper.width), 0, paper));
    }
  };
})();
