/* global Raphael,Distribution,utils */
(function() {
  var paper = utils.setup();
  var dist = new Distribution(20, paper);
  utils.draw(function () {
    dist.render();
  });
})();
