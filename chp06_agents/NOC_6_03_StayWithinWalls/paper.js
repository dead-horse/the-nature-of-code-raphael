/* global utils,Vehicle,PVector */
(function () {
  var paper = utils.setup();

  var v = new Vehicle(paper.width / 3, paper.height / 3, paper);

  var d = 25;
  var wall = paper.rect(d, d, paper.width - 2 * d, paper.height - 2 * d);
  wall.attr({stroke: '#222'}).toBack();
  var displayWall = true;

  utils.draw(60, function () {
    v.boundaries(wall.attrs)
      .update()
      .display();
  });

  paper.canvas.onmousedown = function () {
    if (displayWall) {
      wall.hide();
      displayWall = false;
    } else {
      wall.show();
      displayWall = true;
    }

  };

})();
