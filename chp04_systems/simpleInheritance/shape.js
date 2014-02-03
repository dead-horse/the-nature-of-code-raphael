/*global utils*/
(function (exports) {
  var Shape = function (x, y ,r, paper) {
    this. x = x;
    this.y = y;
    this.r = r;
    this.paper = paper;
  };

  Shape.prototype._initBody = function () {
    // need to be rewrite by child class
  };

  Shape.prototype.jiggle = function () {
    this.x += utils.random(-1, 1);
    this.y += utils.random(-1, 1);
  };

  Shape.prototype.display = function () {
    // need to be rewrite by child class
  };

  exports.Shape = Shape;
})(this);
