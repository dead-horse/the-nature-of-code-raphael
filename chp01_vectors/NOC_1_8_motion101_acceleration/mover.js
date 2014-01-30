/*global PVector,utils*/

(function (exports) {

  var Mover = function (width, height, paper) {
    this.width = width;
    this.height = height;

    this.position = new PVector(width / 2, height / 2);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0.01, 0.01);
    this.topSpeed = 10;

    this.body = paper.ellipse(this.position.x, this.position.y, 24, 24);
    this.body.attr({
      fill: '#555',
      stroke: '#000'
    });
  };

  Mover.prototype.update = function() {
    this.velocity.add(this.acceleration).limit(this.topSpeed);
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
