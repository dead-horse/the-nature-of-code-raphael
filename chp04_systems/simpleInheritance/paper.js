/* global utils,Circle,Square */
(function () {
  var paper = utils.setup();

  var s = new Square(200, 200, 10, paper);
  var c = new Circle(300, 200, 20, '#777', paper);
  utils.draw(60, function () {
    s.jiggle();
    c.jiggle();
    s.display();
    c.display();
  });
})();
