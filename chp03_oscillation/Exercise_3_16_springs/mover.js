/* global PVector */
(function (exports) {
  var Bob = function (location, paper) {
    this.paper = paper;

    this.location = location;
    this.velocity = new PVector();
    this.acceleration = new PVector();
    this.damping = 0.95;
    this.mass = 24;

    this.body;
    this._init();

  };

  Bob.prototype._bind = function () {
    this.body.drag(onDrag.bind(this), onDragStart.bind(this), onDragEnd.bind(this));
  };

  function onDrag(dx, dy, x, y) {
    this.location.set(x, y);
  }

  function onDragStart(e) {
    this.dragging = true;
    this.body.attr({fill: '#444'});
  }

  function onDragEnd(e) {
    this.dragging = false;
    this.body.attr({fill: '#888'});
  }

  Bob.prototype._init = function () {
    this.body = this.paper.ellipse(this.location.x, this.location.y,
      this.mass, this.mass);
    this.body.attr({
      fill: '#888'
    });
    this._bind();
  };

  Bob.prototype.applyForce = function(f) {
    f = f.clone();
    f.div(this.mass);
    this.acceleration.add(f);
    return this;
  };

  Bob.prototype.update = function () {
    if (this.dragging) {
      this.velocity.mult(0);
      this.acceleration.mult(0);
      return this;
    }
    this.velocity.add(this.acceleration).mult(this.damping);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    return this;
  };

  Bob.prototype.move = function() {
    this.body.animate({
      cx: this.location.x,
      cy: this.location.y
    });
  };

  exports.Bob = Bob;
})(this);
