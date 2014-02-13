/* global utils */
(function () {
  var paper = utils.setup();

  var x = paper.width / 2;
  var y = paper.height / 2;
  var r = 200;

  drawCircle(x, y, r);

  function drawCircle(x, y, r) {
    paper.circle(x, y, r);
    if (r > 2) {
      drawCircle(x - r, y, r / 2);
      drawCircle(x + r, y, r / 2);
    }
  }
})();
