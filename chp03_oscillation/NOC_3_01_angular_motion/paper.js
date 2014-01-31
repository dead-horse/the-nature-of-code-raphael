/*global utils*/
(function () {
  var paper = utils.setup();

  var st = paper.set();
  st.push(paper.path('M-60 0 L60 0'),
    paper.ellipse(-60, 0, 8, 8),
    paper.ellipse(60, 0, 8, 8));
  st.attr({
    fill: '#888',
    stroke: '#222'
  });

  st.transform('t320,180');

  var angle = 0;
  var aVelocity = 0;
  var aAcceleration = utils.degree(0.0001);

  utils.draw(function () {
    aVelocity += aAcceleration;
    angle += aVelocity;
    st.transform('t320,180r' + angle + ',0,0');
  });
})();
