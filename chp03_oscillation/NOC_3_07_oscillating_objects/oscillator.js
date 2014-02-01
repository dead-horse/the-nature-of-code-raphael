/*global PVector,utils*/
(function (exports) {
  var Oscillator = function (paper) {
    var width = this.width = paper.width;
    var height = this.height = paper.height;
    this.paper = paper;

    this.angle = new PVector();
    this.velocity = new PVector(utils.random(-0.05, 0.05), utils.random(-0.05, 0.05));
    this.amplitude = new PVector(utils.random(20,width / 2), utils.random(20,height / 2));

    this._initBody();
  };

  Oscillator.prototype._initBody = function () {
    var x = Math.sin(this.angle.x) * this.amplitude.x;
    var y = Math.sin(this.angle.y) * this.amplitude.y;

    this.paper.setStart();
    this.line = this.paper.path('M0 0L' + x + ' ' + y);
    this.line.attr({stroke: '#222'});
    this.ball = this.paper.ellipse(x, y, 20, 20);
    this.ball.attr({fill: '#888'});
    this.st = this.paper.setFinish();
    this.st.transform('t' + this.width / 2 + ',' + this.height / 2);
  };

  Oscillator.prototype.update = function () {
    this.angle.add(this.velocity);
    return this;
  };

  Oscillator.prototype.move =function () {
    var x = Math.sin(this.angle.x) * this.amplitude.x;
    var y = Math.sin(this.angle.y) * this.amplitude.y;

    this.line.animate({
      path: 'M0 0L' + x + ' ' + y
    });
    this.ball.animate({
      cx: x,
      cy: y
    });
    this.st.transform('t' + this.width / 2 + ',' + this.height / 2);
    return this;
  };

  exports.Oscillator = Oscillator;
})(this);
