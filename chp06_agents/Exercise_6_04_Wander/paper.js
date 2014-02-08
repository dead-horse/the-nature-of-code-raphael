/* global utils,PVector,Path,Vehicle */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var vehicle = new Vehicle(width / 2, height / 2, 2, 0.05, paper);

  utils.draw(60, function () {
    vehicle.wander().run();
  });
})();
