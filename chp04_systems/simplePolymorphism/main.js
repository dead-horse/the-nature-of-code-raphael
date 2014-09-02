/* global utils,Circle,Square */
(function () {
  var paper = utils.setup(200, 200);

  var sharps = [];
  var length = 30;

  for (var i = 0; i < length; i++) {
    if (Math.random() < 0.5) {
      sharps.push(new Circle(100, 100, 10,
        utils.getColorString(utils.random(255)), paper));
    } else {
      sharps.push(new Square(100, 100, 10, paper));
    }
  }
  utils.draw(60, function () {
    sharps.forEach(function (s) {
      s.jiggle();
      s.changeColor && s.changeColor();
      s.display();
    });
  });
})();
