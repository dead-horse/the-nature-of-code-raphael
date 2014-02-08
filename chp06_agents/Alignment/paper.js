/* global utils,PVector,Path,Vehicle */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var vehicles = [];

  for (var i = 0; i < 100; i++) {
    vehicles.push(new Vehicle(utils.random(width), utils.random(height), 3, 0.2, paper));
  }

  utils.draw(60, function () {
    vehicles.forEach(function (v) {
      v.align(vehicles)
        .run();
    });
  });

  var click = false;
  paper.canvas.onmousedown = function () {
    click = true;
  };

  paper.canvas.onmouseup = function () {
    click = false;
  };

  paper.canvas.onmousemove = function (e) {
    click && vehicles.push(new Vehicle(e.layerX, e.layerY, 3, 0.2, paper));
  };

  paper.text(120, height - 16, 'Drag the mouse to generate new boids.');
})();
