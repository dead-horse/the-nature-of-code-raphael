(function (exports) {
  var Path = function (start, end, radius, paper) {
    this.start = start;
    this.end = end;
    this.radius = radius;
    this.paper = paper;

    this.display();
  };

  Path.prototype.display = function () {
    var road = this.paper.path('M' + this.start.x + ' ' + this.start.y +
      'L' + this.end.x + ' ' + this.end.y);
    road.attr({
      stroke: '#aaa',
      'stroke-width': this.radius * 2
    });

    var line = this.paper.path('M' + this.start.x + ' ' + this.start.y +
      'L' + this.end.x + ' ' + this.end.y);
    line.attr({
      stroke: '#222',
      'stroke-width': 1
    });
  };

  exports.Path = Path;
})(this);
