/* global utils,PVector,Path,Flock,Boid */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var flock = new Flock();

  for (var i = 0; i < 30; i++) {
    flock.add(new Boid(width / 2, height / 2, 3, 0.2, paper));
  }

  utils.draw(60, function () {
    flock.run();
  });
})();
