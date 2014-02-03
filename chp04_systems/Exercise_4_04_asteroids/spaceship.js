/* global PVector,utils,ParticleSystem */
(function (exports) {
  var Spaceship = function (location, paper) {
    this.paper = paper;
    this.width = paper.width;
    this.height = paper.height;

    this.location = location;
    this.acceleration = new PVector();
    this.velocity = new PVector();
    this.damping = 0.995;
    this.topspeed = 6;
    this.heading = 0;

    this.r = 18;
    this.mass = 1; //ignore mass

    paper.setStart();
    this.body = paper.path(this._getBodyPath());
    this.lleft = paper.rect(-this.r * 2 / 3, this.r, this.r / 3, this.r / 2);
    this.lright = paper.rect(this.r / 3, this.r, this.r / 3, this.r / 2);
    this.ship = paper.setFinish();

    this.ship.attr({
      fill: '#aaa',
      stroke: '#222'
    });
    this._transform();

    this.timer = null;

    this.ps = new ParticleSystem(this.location, paper);
  };

  Spaceship.prototype._getBodyPath = function () {
    var r = this.r;
    var path = 'M' + (-r) + ' ' + r +
      'L0 ' + (-r) + 'L' + r + ' ' + r + 'Z';
    return path;
  };

  Spaceship.prototype._transform = function () {
    this.ship.transform('t' + this.location.x + ',' + this.location.y + 'r' +
      utils.degree(this.heading) + ',0,0');
  };

  Spaceship.prototype.applyForce = function (force) {
    var f = force.clone();
    f.div(this.mass);
    this.acceleration.add(f);
    return this;
  };

  Spaceship.prototype.update = function () {
    this.velocity.add(this.acceleration)
    .mult(this.damping)
    .limit(this.topspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    return this;
  };

  Spaceship.prototype.move = function () {
    this._transform();
    this.ps.run();
    return this;
  };

  Spaceship.prototype.turn = function (a) {
    this.heading += a;
  };

  function stopThrust() {
    this.lleft.animate({
      fill: '#aaa'
    });
    this.lright.animate({
      fill: '#aaa'
    });
  }

  Spaceship.prototype.thrust = function () {
    var f = PVector.fromAngle(this.heading - Math.PI / 2);
    f.mult(0.1);
    this.applyForce(f);

    // for light color
    this.timer && clearTimeout(this.timer);
    this.lleft.animate({
      fill: '#f00'
    });
    this.lright.animate({
      fill: '#f00'
    });
    this.timer = setTimeout(stopThrust.bind(this), 300);

    this.ps.setOrigin(this.location.x - this.r * Math.sin(this.heading),
      this.location.y + this.r * Math.cos(this.heading))
      .add();
    return this;
  };

  Spaceship.prototype.wrapEdges = function () {
    var buffer = this.r * 2;
    var location = this.location;
    var width = this.width;
    var height = this.height;
    if (location.x > width + buffer) {
      location.x = -buffer;
    } else if (location.x < -buffer) {
      location.x = width+buffer;
    }
    if (location.y > height + buffer) {
      location.y = -buffer;
    } else if (location.y < -buffer) {
      location.y = height+buffer;
    }
    return this;
  };

  exports.Spaceship = Spaceship;
})(this);
