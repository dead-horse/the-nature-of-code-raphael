(function (exports) {
  var PVector = function (x, y) {
    if (!(this instanceof PVector)) {
      return new PVector(x, y);
    }

    this.x = x;
    this.y = y;
    return this;
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

  PVector.prototype.mag = function () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
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
      return;
    }
    this.normalize();
    this.x *= limit;
    this.y *= limit;
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

  exports.PVector = PVector;
})(this);
