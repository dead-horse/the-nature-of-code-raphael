/*global PVector,utils*/

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
(function (exports) {

  var Mover = function (width, height, paper) {
    this.width = width;
    this.height = height;
    this.position = new PVector(utils.random(width), utils.random(height));
    this.velocity = new PVector(utils.random(-2, 2), utils.random(-2, 2));

    this.body = paper.ellipse(this.position.x, this.position.y, 24, 24);
    this.body.attr({
      fill: '#555',
      stroke: '#000'
    });
  };

  Mover.prototype.update = function() {
    this.position.add(this.velocity);
  };

  Mover.prototype.move = function() {
    this.body.animate({
      cx: this.position.x,
      cy: this.position.y
    });
  };

  Mover.prototype.checkEdges = function() {

    if (this.position.x > this.width) {
      this.position.x = 0;
    }
    else if (this.position.x < 0) {
      this.position.x = this.width;
    }

    if (this.position.y > this.height) {
      this.position.y = 0;
    }
    else if (this.position.y < 0) {
      this.position.y = this.height;
    }
  };

  exports.Mover = Mover;
})(this);
