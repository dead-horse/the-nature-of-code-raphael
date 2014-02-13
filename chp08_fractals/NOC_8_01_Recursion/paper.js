/* global utils */
(function () {
  var paper = utils.setup();

  var x = paper.width / 2;
  var y = paper.height / 2;
  var r = paper.width / 2;

  while (r > 2) {
    paper.circle(x, y, r);
    r *= 0.75;
  }
})();
