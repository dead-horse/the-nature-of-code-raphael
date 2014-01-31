/*global PVector,utils*/
(function (exports) {
  var Mover = function (mass, location, velocity, paper) {
    this.width = paper.width;
    this.height = paper.height;

    this.location = location.clone();
    this.velocity = velocity.clone();
    this.acceleration = new PVector(0,0);
    this.angle = 0;
    this.aVelocity = 0;
    this.mass = mass;

    this.body = paper.rect(this.location.x, this.location.y,
      12 * mass, 12 * mass);
    this.body.attr({
      fill: '#888',
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
    var aAcceleration = utils.degree(this.acceleration.x / 10);

    this.aVelocity += aAcceleration;
    this.aVelocity = utils.constrain(this.aVelocity, utils.degree(-0.1), utils.degree(0.1));

    this.angle += this.aVelocity;
    this.acceleration.mult(0);
    return this;
  };

  Mover.prototype.move = function () {
    this.body.animate({
      x: this.location.x,
      y: this.location.y
    });

    this.body.transform('r' + this.angle);
    return this;
  };

  Mover.prototype.destory = function () {
    this.body.remove();
  };

  exports.Mover = Mover;

})(this);
