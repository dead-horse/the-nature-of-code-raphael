/* global utils,PVector,Path,Flock,Boid */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var flock = new Flock();

  for (var i = 0; i < 200; i++) {
    flock.add(new Boid(width / 2, height / 2, 3, 0.2, paper));
  }

  utils.draw(60, function () {
    flock.run();
  });

  var click = false;
  paper.canvas.onmousedown = function () {
    click = true;
  };

  paper.canvas.onmouseup = function () {
    click = false;
  };

  paper.canvas.onmousemove = function (e) {
    click && flock.add(new Boid(e.layerX, e.layerY, 3, 0.2, paper));
  };

  paper.text(120, height - 16, 'Drag the mouse to generate new boids.');
})();
