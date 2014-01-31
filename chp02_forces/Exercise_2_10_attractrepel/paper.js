/* global utils,PVector,Mover,Attractor */
(function () {
  var paper = utils.setup(800, 200);

  var movers = [];
  for (var i = 0; i < 20; i++) {
    movers.push(new Mover(utils.random(4, 12),
      new PVector(utils.random(paper.width), utils.random(paper.height)),
      new PVector(0, 0), paper));
  }
  var attractor = new Attractor(paper.width / 2, paper.height / 2, paper);

  utils.draw(function () {
    for (var i = 0; i < movers.length; i++) {
      var mover = movers[i];
      for (var j = 0; j < movers.length; j++) {
        var otherMover = movers[j];
        var f = otherMover.repel(mover);
        mover.applyForce(f);
      }
      var af = attractor.attract(mover);
      mover.applyForce(af)
        .update()
        .move()
        .checkEdges();
    }
  });
})();
