/* global Raphael,Walker,utils */
(function() {
  var paper = utils.setup();
  var walker = new Walker(320, 160, paper);
  utils.draw(function () {
    walker.walk();
    walker.render();
  });
})();
