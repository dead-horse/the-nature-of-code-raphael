/* global utils,Population,PVector */
(function () {
  var paper = utils.setup();

  var target = new PVector(paper.width / 2, 24);
  var mutationRate = 0.01;
  var lifetime = 360;
  var lifeCounter = 0;
  var popmax = 50;

  var population = new Population(target, mutationRate, popmax, paper);

  var targetBody = paper.circle(target.x, target.y, 12)
  .attr({fill: '#222', 'stroke-width': 0});
  utils.draw(30, function () {
    if (lifeCounter < lifetime) {
      population.live();
      lifeCounter++;
    } else {
      lifeCounter = 0;
      population.fitness()
        .selection()
        .reproduction();
    }
  });

  paper.canvas.onmousemove = function (e) {
    target.set(e.layerX, e.layerY);
    targetBody.animate({
      cx: target.x,
      cy: target.y
    });
  };

})();
