/* global utils,Vehicle,PVector */
(function () {
  var paper = utils.setup();

  var v = new Vehicle(paper.width / 3, paper.height / 3, paper);

  var mouse = new PVector(paper.width / 2, paper.height / 2);
  var target = paper.circle(mouse.x, mouse.y, 20);
  target.attr({fill: '#aaa', stroke: '#222'}).toBack();
  utils.draw(60, function () {
    v.arrive(mouse)
      .update()
      .display();
  });

  paper.canvas.onmousemove = function (e) {
    mouse.set(e.layerX, e.layerY);
    target.animate({cx: e.layerX, cy: e.layerY});
  };

})();
