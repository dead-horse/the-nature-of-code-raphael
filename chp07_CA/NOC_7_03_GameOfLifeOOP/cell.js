/* global utils */
(function (exports) {
  var Cell = function (x, y, scl, paper) {
    this.paper = paper;
    this. x = x;
    this.y = y;
    this.scl = scl;

    this.state = Math.floor(utils.random(2));
    this.previous = this.state;
  }

  Cell.prototype.savePrevious = function () {
    this.previous = this.state;
  };

  Cell.prototype.newState = function (s) {
    this.state = s;
  };

  Cell.prototype.display = function () {
    var fill = null;
    if (this.previous === 0 && this.state === 1) {
      fill = '#00f';
    } else if (this.previous === 1 && this.state === 0) {
      fill = '#f00';
    } else if (this.state === 1) {
      fill = '#222';
    }
    if (fill) {
      var rect = this.paper.rect(this.x, this.y, this.scl, this.scl);
      rect.attr({
        fill: fill
      });
    }
  };

  exports.Cell = Cell;
})(this);
