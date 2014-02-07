/* global utils,PVector,Path,Vehicle */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  // init the path
  var pathStart = new PVector(0, height / 3);
  var pathEnd = new PVector(width, height * 2 / 3);
  var path = new Path(pathStart, pathEnd, 20, paper);

  var car1 = new Vehicle(0, height / 2, 2, 0.02, paper);
  var car2 = new Vehicle(0, height / 2, 3, 0.05, paper);

  utils.draw(60, function () {
    car1.follow(path).run().borders(path);
    car2.follow(path).run().borders(path);
  });
})();
