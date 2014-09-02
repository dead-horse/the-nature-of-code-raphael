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
  var aVelocity = utils.degree(0.05);

  utils.draw(60, function () {
    angle += aVelocity;
    st.transform('t320,180r' + angle + ',0,0');
  });
})();
