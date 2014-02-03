/* global utils,CannonBall,PVector */
(function () {
  var paper = utils.setup();
  paper.text(120, paper.height - 20, 'use `space`, `left` and `right` to control');
  var startLocation = new PVector(50, 300);
  var cannonBall = new CannonBall(startLocation, paper);

  var gravity = new PVector(0, 0.2);

  utils.draw(60, function () {
    if (cannonBall.shotting) {
      cannonBall.applyForce(gravity);
    }
    cannonBall.update().move();
  });

  window.onkeydown = function (e) {
    switch (e.keyCode) {
    case 32: // space
      cannonBall.shot();
      break;
    case 37: // left
      cannonBall.turn(-0.03);
      break;
    case 39: // right
      cannonBall.turn(0.03);
      break;
    }
    e.preventDefault();
    e.stopPropagation();
  };
})();
