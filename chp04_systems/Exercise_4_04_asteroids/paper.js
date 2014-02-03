/* global utils,Spaceship,PVector */
(function () {
  var paper = utils.setup();
  paper.text(120, paper.height - 20, 'use `space`, `left` and `right` to control');

  var startLocation = new PVector(paper.width / 2, paper.height / 2);
  var spaceship = new Spaceship(startLocation, paper);
  utils.draw(60, function () {
    spaceship.update().move().wrapEdges();
  });

  window.onkeydown = function (e) {
    switch (e.keyCode) {
    case 32: // space
      spaceship.thrust();
      break;
    case 37: // left
      spaceship.turn(-0.03);
      break;
    case 39: // right
      spaceship.turn(0.03);
      break;
    }
    e.preventDefault();
    e.stopPropagation();
  };
})();
