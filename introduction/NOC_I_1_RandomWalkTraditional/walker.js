(function (exports) {
  var Walker = function (x, y, paper) {
    this.x = x;
    this.y = y;
    this.paper = paper;
    this.body = paper.ellipse(this.x, this.y, 5, 5);
    this.body.attr({
      fill: '#000'
    });
  };

  Walker.prototype.walk = function () {
    var choice = Math.floor(Math.random() * 4);
    switch (choice) {
    case 0:
      this.x++;
      return;
    case 1:
      this.x--;
      return;
    case 2:
      this.y++;
      return;
    case 3:
      this.y--;
      return;
    }
  };

  Walker.prototype.render = function () {
    this.body.animate({
      cx: this.x,
      cy: this.y
    }, 1);
  };

  exports.Walker = Walker;
})(this);
