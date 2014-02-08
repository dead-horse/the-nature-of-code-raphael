/* global utils,PVector,Path,Vehicle */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var vehicles = [];

  var mouse = new PVector();
  for (var i = 0; i < 200; i++) {
    vehicles.push(new Vehicle(utils.random(width), utils.random(height), 3, 0.2, paper));
  }
  utils.draw(60, function () {
    vehicles.forEach(function (v) {
      v.seek(mouse).separate(vehicles).run();
    });
  });

  paper.canvas.onmousemove = function (e) {
    mouse.set(e.layerX, e.layerY);
  };
})();
