/* global utils */
(function (exports) {
  var Cell = function (x, y, scl, paper) {
    this.paper = paper;
    this. x = x;
    this.y = y;
    this.scl = scl;
    this.xoff = scl / 2;
    this.yoff = Math.sin(utils.radian(60)) * scl;
    this.state = Math.floor(utils.random(2));
    this.previous = this.state;
  };

  Cell.prototype.savePrevious = function () {
    this.previous = this.state;
  };

  Cell.prototype.newState = function (s) {
    this.state = s;
  };

  Cell.prototype.display = function () {
    var fill = this.state ? '#222' : '#eee';
    var xoff = this.xoff;
    var yoff = this.yoff;
    var w = this.scl;
    var points = [
      {x: 0, y: yoff},
      {x: xoff, y: 0},
      {x: xoff + w, y: 0},
      {x: 2 * w, y: yoff},
      {x: xoff + w, y: 2 * yoff},
      {x: xoff, y: 2 * yoff}
    ];
    var hexagons = utils.drawShape(this.paper, points);
    hexagons.attr({
      fill: fill,
      stroke: '#222'
    });
    hexagons.transform('t' + this.x + ' ' + this.y);
  };

  exports.Cell = Cell;
})(this);
