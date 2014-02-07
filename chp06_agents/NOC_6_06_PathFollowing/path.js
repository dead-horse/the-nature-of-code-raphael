/* global PVector */
(function (exports) {
  var Path = function (points, radius, paper) {
    if (typeof points === 'number') {
      paper = radius;
      radius = points;
      points = [];
    }
    this.points = points;
    this.radius = radius;
    this.paper = paper;

  };

  Path.prototype.addPoint = function (x, y) {
    this.points.push(new PVector(x, y));
    return this;
  };

  Path.prototype.getStart = function () {
    return this.points[0];
  };

  Path.prototype.getEnd =function () {
    return this.points[this.points.length - 1];
  };

  Path.prototype.display = function () {
    var radius = this.radius;
    this.paper.setStart();
    for (var i = 0; i < this.points.length - 1; i++) {
      var start = this.points[i];
      var end = this.points[i + 1];

      //draw the corner
      var corner = this.paper.circle(start.x, start.y, 20);
      corner.attr({fill: '#aaa', 'stroke-width': 0}).toBack();

      var road = this.paper.path('M' + start.x + ' ' + start.y +
        'L' + end.x + ' ' + end.y).toBack();
      road.attr({
        stroke: '#aaa',
        'stroke-width': radius * 2
      });

      var line = this.paper.path('M' + start.x + ' ' + start.y +
        'L' + end.x + ' ' + end.y);
      line.attr({
        stroke: '#222',
        'stroke-width': 1
      }).toFront();
    }
    this.pathSets = this.paper.setFinish();
  };

  Path.prototype.destroy = function () {
    this.pathSets.remove();
  };

  exports.Path = Path;
})(this);
