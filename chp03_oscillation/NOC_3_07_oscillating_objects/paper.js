/* global utils,PVector,Oscillator */
(function () {
  var paper = utils.setup(800, 200);

  var oscillators = [];

  for (var i = 0; i < 10; i++) {
    oscillators.push(new Oscillator(paper));
  }
  utils.draw(60, function () {
    oscillators.forEach(function (osc) {
      osc.update().move();
    });
  });

})();
