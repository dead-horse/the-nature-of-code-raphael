/*global PVector*/
(function (exports) {
  var Attractor = function (x, y, paper) {
    this.mass = 20;
    this.G = 1;
    this.location = new PVector(x, y);
    this.body = paper.ellipse(this.location.x, this.location.y, this.mass, this.mass);
    this.body.attr({
      fill: '#aaa',
      stroke: '#222'
    });
    this._bind();
  };

  Attractor.prototype.attract = function (mover) {
    var f = PVector.sub(this.location, mover.location);
    var d = f.mag();
    d = utils.constrain(5, 25);

    var factor = this.G * this.mass * mover.mass / (d * d);
    var force = f.normalize().mult(factor);
    return force;
  };

  Attractor.prototype._bind = function () {
    this.body.drag(onDrag.bind(this));
    this.body.mousedown(onMouseDown.bind(this));
    this.body.mouseup(onMouseUp.bind(this));
    this.body.mouseover(onMouseOver.bind(this));
    this.body.mouseout(onMouseOut.bind(this));
  };

  function onDrag(dx, dy, x, y) {
    this.body.animate({cx: x, cy: y});
    this.location.x = x;
    this.location.y = y;
    this.body.attr({fill: '#555'});
  }

  function onMouseDown(e) {
    this.body.attr({fill: '#555'});
  }

  function onMouseUp(e) {
    this.body.attr({fill: '#888'});
  }

  function onMouseOver() {
    this.body.attr({fill: '#888'});
  }

  function onMouseOut() {
    this.body.attr({fill: '#aaa'});
  }

  exports.Attractor = Attractor;
})(this);
