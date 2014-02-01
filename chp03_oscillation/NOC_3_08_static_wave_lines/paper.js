/* global utils */
(function () {
  var paper = utils.setup(800, 200);

  var angle = 0;
  var pathString = 'M0 100';
  for (var i = 1; i < paper.width; i++) {
    angle += 0.02;
    pathString += 'L' + i + ' ' + (Math.sin(angle) * 100 + 100);
    console.log((Math.sin(angle) * 200 - 100));
  }
  paper.path(pathString).attr({'stroke-width': 2});
})();
