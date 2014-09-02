/* global utils,PVector,Path,Vehicle */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var vehicles = [];

  for (var i = 0; i < 200; i++) {
    vehicles.push(new Vehicle(utils.random(width), utils.random(height), 3, 0.2, paper));
  }
  utils.draw(60, function () {
    vehicles.forEach(function (v) {
      v.separate(vehicles).run();
    });
  });

})();
