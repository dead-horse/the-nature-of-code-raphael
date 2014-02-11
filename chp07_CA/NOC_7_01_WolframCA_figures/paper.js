/* global utils,CA */
(function () {
  var paper = utils.setup();

  var rules = [0, 1, 1, 1, 1, 0, 1, 1];
  var ca = new CA(rules, paper);
  var timer = utils.draw(10, loop);

  function loop() {
    ca.render()
      .generate();
    ca.finished() && utils.stopDraw(timer);
  }

  paper.canvas.onmousedown = function () {
    ca.restart().randomize();
    timer = utils.draw(10, loop);
  };

})();
