/* global utils,PVector,Path,Vehicle */
(function () {
  var paper = utils.setup();
  var width = paper.width;
  var height = paper.height;

  var vehicles = [];
  for (var i = 0; i < 80; i++) {
    vehicles.push(new Vehicle(utils.random(width), utils.random(height),
      utils.random(2, 4), 0.3, paper));
  }
  var path = null;
  function newPath() {
    path = new Path(20, paper);
    var offset = 30;
    path.addPoint(offset,offset)
      .addPoint(width - offset, offset)
      .addPoint(width - offset, height - offset)
      .addPoint(width / 2, height - offset * 3)
      .addPoint(offset, height - offset)
      .display();
  }

  newPath();

  utils.draw(60, function () {
    vehicles.forEach(function (v) {
      v.applyBehaviors(path, vehicles).run();
    });
  });

  paper.text(120, paper.height - 30, 'Hit space bar to toggle debugging lines.');
})();
