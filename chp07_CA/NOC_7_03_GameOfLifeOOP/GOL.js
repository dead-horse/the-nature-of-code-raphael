/* global utils,Cell */
(function (exports) {
  var GOL = function (paper) {
    this.width = paper.width;
    this.height = paper.height;
    this.paper = paper;

    this.scl  = 8;
    this.board = [];
    this.columns = Math.ceil(this.width / this.scl);
    this.rows = Math.ceil(this.height / this.scl);
    this.total = this.columns * this.rows;

    this.init();
  };

  GOL.prototype.init = function () {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.board[i * this.columns + j] = new Cell(j * this.scl, i * this.scl,
          this.scl, this.paper);
      }
    }
    return this;
  };

  GOL.prototype._countNeighbors = function (x, y) {
    var count = 0;

    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        var r = ((i + x + this.rows) % this.rows);
        var c = ((j + y + this.columns) % this.columns);
        count += this.board[r * this.columns + c].previous;
      }
    }
    count -= this.board[x * this.columns + y].previous;
    return count;
  };

  GOL.prototype.generate = function () {
    for (var i = 0; i < this.total; i++) {
      this.board[i].savePrevious();
    }

    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        var count = this._countNeighbors(i, j);
        // console.log(count);
        var index = i * this.columns + j;
        var state = this.board[index].previous;

        if (state && count < 2) {
          this.board[index].newState(0);
        } else if (state && count > 3) {
          this.board[index].newState(0);
        } else if (!state && count === 3) {
          this.board[index].newState(1);
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
