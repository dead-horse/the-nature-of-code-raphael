/* global utils,PVector,Mover,Attractor */
(function () {
  var paper = utils.setup(800, 200);

  var angle = 0;
  var aVelocity = 0.03;
  var amplitude = 300;

  var x = amplitude * Math.cos(angle);

  paper.setStart();
  var line = paper.path('M0 0L' + x + ' 0');
  line.attr({stroke: '#222'});
  var ball = paper.ellipse(x, 0, 20, 20);
  ball.attr({fill: '#888'});
  var st = paper.setFinish();

  st.transform('t400,100');
  utils.draw(60, function () {
    st.transform('t400,100');
    angle += aVelocity;
    var x = amplitude * Math.cos(angle);
    line.animate({path: 'M0 0L' + x + ' 0'});
    ball.animate({cx: x});
  });

})();
