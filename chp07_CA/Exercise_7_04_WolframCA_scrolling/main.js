/* global utils,CA */
(function () {
  var paper = utils.setup(640, 200);

  var rules = [];
  rules.push([0, 1, 0, 1, 1, 0, 1, 0]);
  rules.push([0, 1, 1, 1, 1, 0, 1, 1]);
  rules.push([0, 1, 1, 1, 1, 1, 0, 1]);
  rules.push([0, 1, 1, 1, 1, 0, 0, 0]);
  rules.push([0, 1, 1, 1, 0, 1, 1, 0]);
  var ca = new CA(rules[0], paper);

  var timer = utils.draw(10, loop);

  function loop() {
    ca.render()
      .generate();
  }
  var i = 0;
  paper.canvas.onmousedown = function () {
    i = (i + 1) % rules.length;
    ca.restart().setRules(rules[i]);
    paper.text(60, 10, 'click to change rules').toFront();
    // timer = utils.draw(10, loop);
  };

  paper.text(60, 10, 'click to change rules').toFront();
})();
