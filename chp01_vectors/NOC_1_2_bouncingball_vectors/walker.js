var PVector = require('pvector');

var Walker = module.exports = function (width, height, paper) {
  this.width = width;
  this.height = height;
  this.position = new PVector(width / 2, height / 2);
  this.velocity = new PVector(2.5, 2);
  this.paper = paper;
  this.body = paper.ellipse(this.position.x, this.position.y, 10, 10);
  this.body.attr({
    fill: '#222',
    stroke: '#000'
  });
};

Walker.prototype.move = function() {
  this.position.add(this.velocity);

  if (this.position.x > this.width || this.position.x < 0) {
    this.velocity.x *= -1;
  }
  if (this.position.y > this.height || this.position.y < 0) {
    this.velocity.y *= -1;
  }

  this.body.animate({
    cx: this.position.x,
    cy: this.position.y
  }, 1);
};
