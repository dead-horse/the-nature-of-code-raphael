(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])