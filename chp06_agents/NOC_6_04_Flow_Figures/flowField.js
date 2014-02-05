/* global PVector,utils */
(function (exports) {
  var FlowField = function (r, paper) {
    this.resolution = r;
    this.cols = Math.floor(paper.width / r);
    this.rows = Math.floor(paper.height / r);
    this.fields = [];
    this.arrows = [];

    this.img = './data/arrow60.png';
    this.paper = paper;
    this.width = paper.width;
    this.height = paper.height;
    this._init();
  };

  FlowField.prototype._init = function () {
    this.paper.setStart();
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        var x = i * this.resolution;
        var y = j * this.resolution;
        this.fields[i * this.cols + j] = new PVector(this.width / 2 - x, -y);
        this.fields[i * this.cols + j].normalize();
        this.arrows[i * this.cols + j] = this.paper.image(this.img, x, y + 19,
          59, 22);
      }
    }
    this.arrowset = this.paper.setFinish();
    this.arrowset.hide();
  };

  FlowField.prototype.display = function () {
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.v = this.fields[i * this.cols + j];
        var ts = 'r' + utils.degree(this.v.heading());
        this.arrows[i * this.cols + j].transform(ts);
      }
    }
    this.arrowset.show();
    return this;
  };

  exports.FlowField = FlowField;
})(this);
