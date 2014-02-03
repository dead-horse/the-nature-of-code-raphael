/*global utils,Shape*/
(function (exports) {
  var Square = function (x, y ,r, paper) {
    Shape.call(this, x, y, r, paper);
    this._initBody();
  };

  utils.inherits(Square, Shape);
  Square.prototype._initBody = function () {
    this.body = this.paper.rect(this.x, this.y, this.r, this.r);
    this.body.attr({
      fill: '#eee',
      stroke: '#222'
    });
  };

  Square.prototype.display = function () {
    this.body.animate({
      x: this.x,
      y: this.y,
      width: this.r,
      height: this.r
    });
  };

  exports.Square = Square;
})(this);
