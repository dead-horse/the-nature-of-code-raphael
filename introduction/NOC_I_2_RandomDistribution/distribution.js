module.exports = Distribution;

function Distribution(width, paper) {
  this.distRects = [];
  this.distNums = [];
  this.width = width;
  this.maxWidth = paper.width;
  this.maxHeight = paper.height;
  this.count = Math.floor(this.maxWidth / this.width);
  this.paper = paper;
  this._setup();
};

Distribution.prototype._setup = function () {
  for (var i = 0; i < this.count; i++) {
    this.distRects[i] = this.paper.rect(this.width * i, this.maxHeight,
     this.width, this.maxHeight);

    this.distRects[i].attr({
      fill: '#999',
      stroke: '#222'
    });
  }
};

Distribution.prototype.render = function () {
  var index = Math.floor(Math.random() * this.count);
  var rect = this.distRects[index];
  var newY = rect.attrs.y - 5;
  if (newY < 0) {
    return;
  }
  rect.animate({
    y: newY
  }, 50);
};
