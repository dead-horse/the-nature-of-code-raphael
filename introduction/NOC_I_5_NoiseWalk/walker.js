(function (exports) {

  var Walker = function(width, height, paper) {
    this.width = width;
    this.height = height;
    this.x = width / 2;
    this.y = height / 2;
    this.noffX = Math.random() * 1000;
    this.noffY = Math.random() * 1000;
    this.body = paper.ellipse(this.x, this.y, 24, 24);
    this.body.attr({
      fill: '#222',
      'stroke-width': 0
    });
    this.perlin = new Perlin();
  };

  Walker.prototype.walk = function() {
    this.x = utils.map(this.perlin.noise(this.noffX),
      0, 1, 0, this.width);
    this.y = utils.map(this.perlin.noise(this.noffY),
      0, 1, 0, this.height);
    this.noffX += 0.01;
    this.noffY += 0.01;
    this.body.animate({
      cx: this.x,
      cy: this.y
    }, 1);
  };

  exports.Walker = Walker;
})(this);
