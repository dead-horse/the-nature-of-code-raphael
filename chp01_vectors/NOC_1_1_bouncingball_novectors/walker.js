(function (exports) {
  var Walker = function (width, height, paper) {
    this.x = width / 2;
    this.y = height / 2;
    this.width = width;
    this.height = height;
    this.paper = paper;
    this.body = paper.ellipse(this.x, this.y, 10, 10);
    this.body.attr({
      fill: '#222',
      stroke: '#000'
    });
    this.yspeed = 2.5;
    this.xspeed = 2;
  };

  Walker.prototype.move = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (this.x > this.width || this.x < 0) {
      this.xspeed *= -1;
    }
    if (this.y > this.height || this.y < 0) {
      this.yspeed *= -1;
    }

    this.body.animate({
      cx: this.x,
      cy: this.y
    }, 1);
  };

  exports.Walker = Walker;
})(this);
