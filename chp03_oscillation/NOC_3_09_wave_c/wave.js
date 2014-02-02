(function (exports) {
  var Wave = function (paper) {
    this.height = paper.height;
    this.paper = paper;

    this.angle = 0;
    this.angleVel = 0.4;
    this.xspacing = 24;
    this.total = Math.ceil(this.paper.width / this.xspacing);
    this.balls = [];
    this.yValues = [];
    this._init();
  };

  Wave.prototype._init = function() {
    this._calYValue();
    this.paper.setStart();
    for (var i = 0; i < this.total; i++) {
      this.balls.push(this.paper.ellipse(i * this.xspacing, this.yValues[i],
        this.xspacing, this.xspacing));
    }
    var st = this.paper.setFinish();
    st.attr({
      fill: '#777',
      opacity: 0.5
    });
  };

  Wave.prototype._calYValue = function () {
    var startAngle = this.angle;
    for (var i = 0; i < this.total; i++) {
      this.yValues[i] = this.height / 2 + Math.sin(startAngle) * this.height / 2;
      startAngle += this.angleVel;
    }
  };

  Wave.prototype.update = function () {
    this.angle += 0.015;
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
