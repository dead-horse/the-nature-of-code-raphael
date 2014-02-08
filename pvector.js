(function (exports) {
  var PVector = function (x, y) {
    if (!(this instanceof PVector)) {
      return new PVector(x, y);
    }

    this.x = x || 0;
    this.y = y || 0;
    return this;
  };

  PVector.fromAngle = function (angle) {
    return new PVector(Math.cos(angle), Math.sin(angle));
  };

  PVector.prototype.set = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };

  PVector.prototype.add = function (other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  };

  PVector.add = function (one, other) {
    return new PVector(one.x + other.x, one.y + other.y);
  };

  PVector.prototype.sub = function (other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  };

  PVector.sub = function (one, other) {
    return new PVector(one.x - other.x, one.y - other.y);
  };

  PVector.prototype.div = function (n) {
    this.x /= n;
    this.y /= n;
    return this;
  };

  PVector.div = function (vector, n, target) {
    if (target instanceof PVector) {
      target.x = vector.x / n;
      target.y = vector.y / n;
      return target;
    }
    return new PVector(vector.x / n, vector.y / n);
  };

  PVector.prototype.mult = function (rate) {
    this.x *= rate;
    this.y *= rate;
    return this;
  };

  PVector.mult = function (vector, n, target) {
    if (target instanceof PVector) {
      target.x = vector.x * n;
      target.y = vector.y * n;
      return target;
    }
    return new PVector(vector.x * n, vector.y * n);
  };

  PVector.prototype.dot = function (p) {
    return this.x * p.x + this.y * p.y;
  };

  PVector.dot = function (a, b) {
    return a.x * b.x + a.y * b.y;
  };

  PVector.prototype.mag = function () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  };

  PVector.dist = function (loc1, loc2) {
    return Math.sqrt(Math.pow(loc1.x - loc2.x, 2) + Math.pow(loc1.y - loc2.y, 2));
  };

  PVector.prototype.normalize = function () {
    var mag = this.mag();
    if (mag === 0) {
      this.x = 0;
      this.y = 0;
    } else {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  };

  PVector.prototype.limit = function (limit) {
    if (this.mag() <= limit) {
      return this;
    }
    this.normalize();
    this.x *= limit;
    this.y *= limit;
    return this;
  };

  PVector.prototype.setMag = function (mag) {
    this.normalize();
    this.x *= mag;
    this.y *= mag;
    return this;
  };

  PVector.prototype.clone = function () {
    return new PVector(this.x, this.y);
  };

  PVector.random2D = function (vector) {
    var num = utils.random(2 * Math.PI);
    var x = Math.sin(num);
    var y = Math.cos(num);
    if (!vector) {
      return new PVector(x, y);
    }
    vector.x = x;
    vector.y = y;
    return vector;
  };

  PVector.prototype.heading = function () {
    if (this.x === 0) {
      return this.y > 0 ? Math.PI / 2 : Math.PI / -2;
    }
    var theta = Math.atan(this.y / this.x);
    if (this.x > 0) {
      return theta;
    } else {
      return Math.PI + theta;
    }
    return Math.atan(this.y / this.x);
  };

  PVector.angleBetween = function (a, b) {
    // A dot B = (magnitude of A)*(magnitude of B)*cos(theta)
    var dot = a.dot(b);
    return Math.acos(dot / (a.mag() * b.mag()));
  };

  PVector.prototype.angleBetween = function (other) {
    var dot = this.dot(other);
    return Math.acos(dot / (this.mag() * other.mag()));
  };

  exports.PVector = PVector;
})(this);
