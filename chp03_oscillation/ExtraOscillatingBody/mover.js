/* global utils,PVector */
(function (exports) {
  var Mover = function (location, velocity, paper) {
    this.paper = paper;

    this.location = location;
    this.velocity = velocity;
    this.acceleration = new PVector();
    this.mass = 1;

    paper.setStart();
    this.head = paper.ellipse(location.x, location.y, 8, 8);
    this.body = paper.rect(location.x + 15, location.y - 5, 10, 10);
    this.set = paper.setFinish();
    this._transform();

    this.set.attr({
      fill: '#888',
      stroke: '#222'
    });
  };

  Mover.prototype._transform = function () {
    this.set.transform('r' + utils.degree(this.velocity.heading()) + ',' +
      this.location.x + ',' + this.location.y);
  };

  Mover.prototype.applyForce = function (force) {
    force = force.clone().div(this.mass);
    this.acceleration.add(force);
    return this;
  };

  Mover.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    return this;
  };

  Mover.prototype.move = function () {
    this.head.animate({
      cx: this.location.x,
      cy: this.location.y
    });

    this.body.animate({
      x: this.location.x + 15,
      y: this.location.y - 5
    });

    this._transform();
    return this;
  };

  Mover.prototype.checkEdges = function () {
    var location = this.location;
    var velocity = this.velocity;
    var width = this.paper.width;
    var height = this.paper.height;

    if (location.x > width) {
      location.x = 0;
    } else if (location.x < 0) {
      location.x = width;
    }

    if (location.y > height) {
      velocity.y *= -1;
      location.y = height;
    }
  };

  exports.Mover = Mover;
})(this);
