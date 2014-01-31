/*global PVector,utils*/
(function (exports) {
  var Mover = function (location, velocity, paper) {
    this.width = paper.width;
    this.height = paper.height;

    this.location = location.clone();
    this.velocity = velocity.clone();
    this.topspeed = 4;
    this.theta = 0;
    this.body = paper.rect(this.location.x, this.location.y,
      30, 10);
    this.body.attr({
      fill: '#333',
      stroke: '#222',
      opacity: 0.7
    });
  };

  Mover.prototype.update = function (target) {
    var acceleration = PVector.sub(target, this.location);
    acceleration = acceleration.normalize().mult(0.5);
    this.velocity.add(acceleration).limit(this.topspeed);
    this.location.add(this.velocity);

    this.theta = this.velocity.heading();
    return this;
  };

  Mover.prototype.move = function () {
    this.body.animate({
      x: this.location.x,
      y: this.location.y
    });

    this.body.transform('r' + utils.degree(this.theta));
    return this;
  };


  Mover.prototype.checkEdges = function () {

    if (this.location.x > this.width) {
      this.location.x = 0;
    }
    else if (this.location.x < 0) {
      this.location.x = this.width;
    }

    if (this.location.y > this.height) {
      this.location.y = 0;
    }
    else if (this.location.y < 0) {
      this.location.y = this.height;
    }
  };

  Mover.prototype.destory = function () {
    this.body.remove();
  };

  exports.Mover = Mover;

})(this);
