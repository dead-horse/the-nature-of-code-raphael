
var utils = require('../../utils');
var perlin = require('perlin');
var Perlin = require('../../noise');
module.exports = Walker;

function Walker(width, height, paper) {
  this.width = width;
  this.height = height;
  this.x = width / 2;
  this.y = height / 2;
  this.noffX = Math.random() * 1000;
  this.noffY = Math.random() * 1000;
  this.body = paper.ellipse(this.x, this.y, 24, 24);
  this.body.attr({
    fill: '#222',
    'stroke-width': 0
  });
  this.perlin = new Perlin();
}
console.log(perlin)
Walker.prototype.walk = function() {
  perlin.noise.seed(10004);
  var x = perlin.noise.perlin2(this.noffX, 0);
  var y = perlin.noise.perlin2(this.noffY, 0);
  this.x = utils.map(x, -0.5, 0.5, 0, this.width);
  this.y = utils.map(y, -0.5, 0.5, 0, this.height);
  this.noffX += 0.01;
  this.noffY += 0.01;
  this.body.animate({
    cx: this.x,
    cy: this.y
  }, 1);
};
