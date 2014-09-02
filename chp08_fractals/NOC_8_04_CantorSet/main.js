/* global utils */
(function () {
  var paper = utils.setup(800, 200);

  var x = paper.width / 2;
  var y = paper.height / 2;
  var r = paper.width / 2;

  cantor(35, 0, 730);
  function cantor(x, y, len) {
    var h = 30;
    if (len > 1) {
      paper.rect(x, y, len, h / 3);
      y += h;
      cantor(x, y, len / 3);
      cantor(x + len * 2 / 3, y, len / 3);
    }
  }
})();
