/* global utils,FlowField,Vehicle,document */
(function () {
  var paper = utils.setup();

  var f = new FlowField(20, paper);
  f.display();

  var vehicles = [];
  for (var i = 0; i < 120; i++) {
    vehicles.push(new Vehicle(utils.random(paper.width), utils.random(paper.height),
      utils.random(2, 5), utils.random(0.1, 0.5), paper));
  }

  utils.draw(60, function () {
    vehicles.forEach(function (v) {
      v.follow(f).run();
    });
  });
  utils.draw(1, function () {
    f.update().display();
  });
  paper.canvas.onmousedown = function () {
    f.genFlow().display();
  };

  document.onkeydown = function (e) {
    if (e.keyCode === 32) {
      f.switchVisiable();
    }
    e.preventDefault();
    e.stopPropagation();
  };
  paper.text(120, paper.height - 30,
    'Hit space bar to toggle debugging lines.\nClick the mouse to generate a new flow field.');
})();
