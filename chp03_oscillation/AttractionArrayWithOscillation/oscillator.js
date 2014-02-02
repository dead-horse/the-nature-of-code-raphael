/* global utils,PVector */
(function (exports) {
  var Oscillator = function (location, r, paper) {
    this.theta = 0;
    this.amplitude = r;
    this.location = location;
    this.velocity = new PVector();

    paper.setStart();
    this.line = paper.path();
    this.head = paper.ellipse(-100, -100, 4, 4);
    this.set = paper.setFinish();

    this.set.attr({
      fill: '#222',
      stroke: '#222'
    });
  };

  Oscillator.prototype.update = function (loc, velocity) {
    this.velocity = velocity;
    this.location = loc;
    this.theta += this.velocity.mag() / 10;
  };

  Oscillator.prototype.display = function () {
    var x = utils.map(Math.cos(this.theta), -1, 1, 0, this.amplitude);
    this.line.animate({
      path: 'M0 0L' + x + ' 0'
    });
    this.head.animate({
      cx: x,
      cy: 0
    });
    this.set.transform('t' + this.location.x + ',' + this.location.y +
      'r' + utils.degree(this.velocity.heading()) + ',0,0');
  };

  exports.Oscillator = Oscillator;
})(this);
