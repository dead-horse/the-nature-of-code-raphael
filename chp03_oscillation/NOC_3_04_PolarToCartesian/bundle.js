(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global utils,PVector,Mover,Attractor */
(function () {
  var paper = utils.setup(800, 200);

  var r = paper.height * 0.45;

  var theta = 0;
  var x = Math.cos(theta) * r;
  var y = Math.sin(theta) * r;

  var line = paper.path('M0 0L' + x + ' ' + y);
  var el = paper.ellipse(x, y, 20, 20);

  var st = paper.set(line, el);
  st.attr({
    fill: '#888',
    stroke: '#222'
  });
  st.transform('t400,100');

  utils.draw(60, function () {
    st.transform('t400,100');
    x = Math.cos(theta) * r;
    y = Math.sin(theta) * r;
    theta += 0.02;
    el.animate({
      cx: x,
      cy: y
    });

    line.animate({
      path: 'M0 0L' + x + ' ' + y
    });
  });

})();

},{}]},{},[1])