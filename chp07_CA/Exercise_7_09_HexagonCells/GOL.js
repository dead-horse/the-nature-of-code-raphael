/* global utils,Cell */
(function (exports) {
  var GOL = function (paper) {
    this.width = paper.width;
    this.height = paper.height;
    this.paper = paper;

    this.w  = 20;
    this.h = Math.sin(utils.radian(60)) * this.w;
    this.board = [];
    this.columns = Math.ceil(this.width / this.w * 3);
    this.rows = Math.ceil(this.height / this.h);
    this.total = this.columns * this.rows;

    this.init();
  };

  GOL.prototype.init = function () {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        if (i % 2 === 0) {
          this.board[i * this.columns + j] = new Cell(j * this.w * 3, i * this.h, this.w, this.paper);
        } else {
          this.board[i * this.columns + j] = new Cell(j * this.w * 3 + this.w + this.h / 2, i * this.h, this.w, this.paper);
        }
      }
    }
    return this;
  };

  GOL.prototype.display = function () {
    this.paper.clear();
    this.board.forEach(function (b) {
      b.display();
    });
    return this;
  };

  exports.GOL = GOL;
})(this);
