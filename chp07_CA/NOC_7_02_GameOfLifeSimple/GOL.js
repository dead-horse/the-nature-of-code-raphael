/* global utils */
(function (exports) {
  var GOL = function (paper) {
    this.width = paper.width;
    this.height = paper.height;
    this.paper = paper;

    this.scl  = 8;
    this.board = [];
    this.columns = Math.ceil(this.width / this.scl);
    this.rows = Math.ceil(this.height / this.scl);

    for (var i = 0; i < this.columns * this.rows; i++) {
      this.board[i] = 0;
    }
    this.init();
  }

  GOL.prototype.init = function () {
    for (var i = 1; i < this.rows - 1; i++) {
      for (var j = 1; j < this.columns - 1; j++) {
        this.board[i * this.columns + j] = Math.floor(utils.random(2));
      }
    }
    return this;
  };

  GOL.prototype._countNeighbors = function (x, y) {
    var count = 0;
    for (var i = x - 1; i <= x + 1; i++) {
      for (var j = y - 1; j <= y + 1; j++) {
        count += this.board[i * this.columns + j];
      }
    }
    count -= this.board[x * this.columns + y];
    return count;
  };

  GOL.prototype.generate = function () {
    var next = [];
    for (var i = 0; i < this.rows * this.columns; i++) {
      next[i] = 0;
    }

    for (var i = 1; i < this.rows - 1; i++) {
      for (var j = 1; j < this.columns - 1; j++) {
        var count = this._countNeighbors(i, j);
        // console.log(count);
        var index = i * this.columns + j;
        var state = this.board[index];

        if (state && count < 2) {
          next[index] = 0;
        } else if (state && count > 3) {
          next[index] = 0;
        } else if (!state && count === 3) {
          next[index] = 1;
        } else {
          next[index] = state;
        }
      }
    }
    this.board = next;
    return this;
  };

  GOL.prototype.display = function () {
    this.paper.clear();
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        if (this.board[i * this.columns + j]) {
          var cell = this.paper.rect(j * this.scl, i * this.scl, this.scl, this.scl);
          cell.attr({
            fill: '#222'
          });
        }
      }
    }
    return this;
  };

  exports.GOL = GOL;
})(this);
