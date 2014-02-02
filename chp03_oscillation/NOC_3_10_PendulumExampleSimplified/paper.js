/* global utils,Pendulum,PVector */
(function () {
  var paper = utils.setup(800, 200);
  var pendulum = new Pendulum(new PVector(400, 0), 175, paper);

  utils.draw(60, function () {
    pendulum.update().move();
  });
})();
