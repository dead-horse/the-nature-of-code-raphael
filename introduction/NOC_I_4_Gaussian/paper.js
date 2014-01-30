/* global Raphael,Walker,utils */

// will cause performance problem in raphael
// generate too many objects
(function() {
  var width = 640;
  var height = 320;
  var paper = utils.setup();
  utils.draw(10, 1000, function () {
    // Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
    var xloc = randomGaussian();

    var sd = 60;                // Define a standard deviation
    var mean = width/2;         // Define a mean value (middle of the screen along the x-axis)
    xloc = ( xloc * sd ) + mean;  // Scale the gaussian random number by standard deviation and mean


    var e = paper.ellipse(xloc, height/2, 8, 8);
    e.attr({
      'stroke-width': 0,
      fill: '#000',
      opacity: 0.1
    });
    });
})();

// Implements Polar Form of Box Muller transformation
function randomGaussian()  {
  var w;
  var x1;
  var x2;
  do {
    x1 = Math.random(2) - 1;
    x2 = Math.random(2) - 1;
    w = x1 * x1 + x2 * x2;
  } while (w >= 1);
  w = Math.sqrt((-2 * Math.log(w))/w);
  return x1 * w;
}
