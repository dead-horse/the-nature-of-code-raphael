/* global utils,GOL */
(function () {
  var paper = utils.setup();
  var gol = new GOL(paper);

  var timer = utils.draw(30, loop);

  function loop() {
    gol.generate().display();
  }

  paper.canvas.onmousedown = function () {
    gol.init();
  };

})();
