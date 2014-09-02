/* global utils,Population,PVector,Obstacle */
(function () {
  var paper = utils.setup();

  var target = new PVector(paper.width / 2, 24);
  var mutationRate = 0.01;
  var lifetime = 300;
  var lifeCounter = 0;
  var popmax = 50;

  var population = new Population(target, mutationRate, popmax, paper);
  var obstacles = [];
  obstacles.push(new Obstacle(paper.width / 2 -100, paper.height / 2, 200, 10, paper));


  var targetBody = paper.circle(target.x, target.y, 12)
  .attr({fill: '#222', 'stroke-width': 0});
  utils.draw(60, function () {
    if (lifeCounter < lifetime) {
      population.live(obstacles);
      lifeCounter++;
    } else {
      lifeCounter = 0;
      population.fitness()
        .selection()
        .reproduction();
    }
  });

  // paper.canvas.onmousemove = function (e) {
  //   target.set(e.layerX, e.layerY);
  //   targetBody.animate({
  //     cx: target.x,
  //     cy: target.y
  //   });
  // };

})();
