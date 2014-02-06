/* global PVector,utils,Perlin */
(function (exports) {
  var FlowField = function (r, paper) {
    this.resolution = r;
    this.cols = Math.floor(paper.width / r);
    this.rows = Math.floor(paper.height / r);
    this.fields = [];
    this.arrows = [];

    this.paper = paper;
    this.width = paper.width;
    this.height = paper.height;
    this.perlin = new Perlin();
    this._init();
    this.genFlow();

    this._visiable = true;
    this.switchVisiable();
  };

  FlowField.prototype.genFlow = function () {
    this.perlin.setSeed(Math.floor(utils.random(10000)));
    var xoff = 0;
    for (var i = 0; i < this.cols; i++) {
      var yoff = 0;
      for (var j = 0; j < this.rows; j++) {
        var theta = utils.map(this.perlin.noise(xoff, yoff), 0, 1, 0, Math.PI * 2);
        var x = i * this.resolution;
        var y = j * this.resolution;
        this.fields[i * this.cols + j] = new PVector(Math.cos(theta), Math.sin(theta));
        yoff += 0.1;
      }
      xoff += 0.1;
    }
    return this;
  };

  FlowField.prototype._init = function () {
    var len = this.resolution - 2;
    var arrowsize = 4;
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        var x = i * this.resolution;
        var y = j * this.resolution;
        this.paper.setStart();
        this.paper.path('M0 0L' + len + ' 0');
        this.paper.path('M' + len + ' 0L' + (len - arrowsize) +
          ' ' + (arrowsize / 2));
        this.paper.path('M' + len + ' 0L' + (len - arrowsize) +
          ' ' + (-arrowsize / 2));
        var arrow = this.paper.setFinish();
        arrow.attr({stroke: '#222'});
        this.arrows[i * this.cols + j] = arrow;
      }
    }
  };

  FlowField.prototype.display = function () {
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        var v = this.fields[i * this.cols + j];
        var x = i * this.resolution;
        var y = j * this.resolution;
        var ts = 't' + x + ',' + (y + this.resolution / 2) + 'r' + utils.degree(v.heading()) + ',0,0';
        this.arrows[i * this.cols + j].transform(ts);
      }
    }
    return this;
  };

  FlowField.prototype.lookup = function (lookup) {
    var column = utils.constrain(Math.floor(lookup.x / this.resolution), 0, this.cols - 1);
    var row = utils.constrain(Math.floor(lookup.y / this.resolution), 0, this.rows - 1);
    return this.fields[column * this.cols + row].clone();
  };

  FlowField.prototype.switchVisiable = function () {
    var self = this;
    this._visiable = !this._visiable;
    this.arrows.forEach(function (a) {
      self._visiable ? a.show() : a.hide();
    });
  };

  exports.FlowField = FlowField;
})(this);
