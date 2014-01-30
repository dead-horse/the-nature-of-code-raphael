/*global PVector,utils*/

(function (exports) {

  var Mover = function (width, height, paper) {
    this.width = width;
    this.height = height;

    this.position = new PVector(width / 2, height / 2);
    this.velocity = new PVector(0, 0);
    this.topSpeed = 5;

    this.body = paper.ellipse(this.position.x, this.position.y, 24, 24);
    this.body.attr({
      fill: '#555',
      stroke: '#000'
    });
  };

  Mover.prototype.update = function(center) {
    if (!center) {
      return;
    }
    var acceleration = PVector.sub(center, this.position).setMag(0.2);
    this.velocity.add(acceleration).limit(this.topSpeed);
    this.position.add(this.velocity);
  };

  Mover.prototype.move = function() {
    this.body.animate({
      cx: this.position.x,
      cy: this.position.y
    });
  };

  exports.Mover = Mover;
})(this);
