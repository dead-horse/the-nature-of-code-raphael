/* global utils,FlowField */
(function () {
  var paper = utils.setup(780, 360, '#fff');

  var f = new FlowField(60, paper);
  f.display();
})();
