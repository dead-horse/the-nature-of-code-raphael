(function (exports) {
  var Wave = function (origin, width, amplitude, period, paper) {
    this.paper = paper;

    this.origin = origin.clone();
    this.theta = 0;
    this.period = period;
    this.amplitude = amplitude;

    this.xspacing = 8;
    this.dx = 2 * Math.PI / period * this.xspacing;

    this.width = width;
    this.total = Math.ceil(width / this.xspacing);
    this.balls = [];
    this.yValues = [];
    this._init();
  };

  Wave.prototype._init = function() {
    this._calYValue();
    this.paper.setStart();
    for (var i = 0; i < this.total; i++) {
      this.balls.push(this.paper.ellipse(this.origin.x + i * this.xspacing,
        this.yValues[i], this.xspacing * 2, this.xspacing * 2));
    }
    var st = this.paper.setFinish();
    st.attr({
      fill: '#777',
      opacity: 0.5
    });
  };

  Wave.prototype._calYValue = function () {
    var x = this.theta;
    for (var i = 0; i < this.total; i++) {
      this.yValues[i] = Math.sin(x) * this.amplitude + this.origin.y;
      x += this.dx;
    }
  };

  Wave.prototype.update = function () {
    this.theta += 0.02;
    this._calYValue();
    return this;
  };

  Wave.prototype.move = function () {
    var self = this;
    self.balls.forEach(function (ball, index) {
      ball.animate({
        cy: self.yValues[index]
      });
    });
  };

  exports.Wave = Wave;
})(this);
