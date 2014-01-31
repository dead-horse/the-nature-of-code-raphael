/*global PVector,utils*/
(function (exports) {
  var Mover = function (mass, location, velocity, paper) {
    this.width = paper.width;
    this.height = paper.height;

    this.location = location.clone();
    this.velocity = velocity.clone();
    this.acceleration = new PVector(0,0);
    this.mass = mass;
    this.G = 1;

    this.body = paper.ellipse(this.location.x, this.location.y,
      mass, mass);
    this.body.attr({
      fill: '#333',
      stroke: '#222',
      opacity: 0.7
    });
  };

  Mover.prototype.applyForce = function (force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
    return this;
  };

  Mover.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    return this;
  };

  Mover.prototype.move = function () {
    this.body.animate({
      cx: this.location.x,
      cy: this.location.y
    });
    return this;
  };

  Mover.prototype.repel = function (mover) {
    var f = PVector.sub(this.location, mover.location);
    if (f.x === 0 && f.y === 0) {
      return f;
    }
    var d = utils.constrain(f.mag(), 1, 1000);
    var factor = -1 * this.G * this.mass * mover.mass / (d * d);
    var force = f.normalize().mult(factor);
    return force;
  };

  Mover.prototype.checkEdges = function () {
    var d = 50;
    var boundary = new PVector(0, 0);
    if (this.location.x > this.width - d) {
      boundary.x = -2;
      this.applyForce(boundary);
    } else if (this.location.x < d) {
      boundary.x = 2;
      this.applyForce(boundary);
    }

    if (this.location.y > this.height - d) {
      boundary.y = -2;
      this.applyForce(boundary);
    } else if (this.location.y < d) {
      boundary.y = 2;
      this.applyForce(boundary);
    }
  };

  Mover.prototype.destory = function () {
    this.body.remove();
  };

  exports.Mover = Mover;

})(this);
