/*global utils,Shape*/
(function (exports) {
  var Circle = function (x, y ,r, c, paper) {
    Shape.call(this, x, y, r, paper);
    this.c = c;
    this._initBody();
  };

  utils.inherits(Circle, Shape);

  Circle.prototype._initBody = function () {
    this.body = this.paper.circle(this.x, this.y, this.r * 2);
    this.body.attr({
      fill: this.c,
      opacity: 0.3
    });
  };

  Circle.prototype.jiggle = function () {
    this.__proto__.__proto__.jiggle.call(this);
    this.r += utils.random(-1, 1);
    this.r = utils.constrain(this.r, 0, 50);
    return this;
  };

  Circle.prototype.changeColor = function () {
    this.c = utils.getColorString(utils.random(255));
    return this;
  };

  Circle.prototype.display = function () {
    this.body.animate({
      cx: this.x,
      cy: this.y,
      r: this.r
    });
  };

  exports.Circle = Circle;
})(this);
