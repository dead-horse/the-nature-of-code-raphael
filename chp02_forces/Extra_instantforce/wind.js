/*global Perlin,PVector,utils*/
(function (exports) {
  var Wind = function (paper) {
    this.width = paper.width;
    this.height = paper.height;
    this.t = Math.random();
    this.perlin = new Perlin();

    this.body = paper.path();
    this.body.attr({
      fill: '#222',
      stroke: '#222'
    });
    this.power = 0;
    this.force = new PVector(0, 0);
  };

  Wind.prototype.change = function () {
    this.power = utils.map(this.perlin.noise(this.t),
      0, 1, -1, 1);
    this.t += 0.01;
    this.force.x = this.power;
    var pathString = 'M0 0 L' + this.power * 100 + ' 0';
    var transformString = 't' + this.width / 2 + ',' + this.height / 2;
    this.body.animate({
      path: pathString
    }, 0);
    this.body.transform(transformString);
  };

  exports.Wind = Wind;
})(this);

