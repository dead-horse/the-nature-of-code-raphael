/*global utils*/
(function (exports) {
  var Wave = function (paper) {
    this.height = paper.height;
    this.width = paper.width;
    this.paper = paper;

    this.maxwaves = 5;
    this.xspacing = 8;
    this.total = Math.floor(this.width / this.xspacing);
    this.dx = [];
    this.amplitude = [];
    this.balls = [];

    this.theta = 0;
    this.yValues = [];

    this._init();
  };

  Wave.prototype._init = function () {
    // init wave amplitude and period
    for (var i = 0; i < this.maxwaves; i++) {
      this.amplitude.push(utils.random(10, 30));
      var period = utils.random(100, 300);
      this.dx[i] = Math.PI * 2 / period * this.xspacing;
    }

    this._calYValues();

    // init balls
    this.paper.setStart();
    for (var i = 0; i < this.total; i++) {
      this.balls.push(this.paper.ellipse(i * this.xspacing, this.yValues[i],
        this.xspacing, this.xspacing));
    }

    var set = this.paper.setFinish();
    set.attr({
      fill: '#eee',
      opacity: 0.5
    });
    console.log(this);
  };

  Wave.prototype._calYValues = function () {
    for (var i = 0; i < this.total; i++) {
      this.yValues[i] = this.height / 2;
    }

    for (var i = 0; i < this.maxwaves; i++) {
      var x = this.theta;
      for (var j = 0; j < this.total; j++) {
        if (i % 2 === 0) {
          this.yValues[j] += Math.sin(x) * this.amplitude[i];
        } else {
          this.yValues[j] += Math.cos(x) * this.amplitude[i];
        }
        x += this.dx[i];
      }
    }
  };

  Wave.prototype.update = function () {
    this.theta += 0.02;
    this._calYValues();
    return this;
  };

  Wave.prototype.move = function () {
    var self = this;
    this.balls.forEach(function (ball, index) {
      ball.animate({
        cy: self.yValues[index]
      });
    });
    return this;
  };

  exports.Wave = Wave;
})(this);
