/* global utils */
(function (exports) {
  var CA = function (r, paper) {
    if (!paper) {
      paper = r;
      r = null;
    }
    this.paper = paper;
    this.width = paper.width;
    this.height = paper.height;

    this.cells = [];
    this.scl = 5;
    this.columns = Math.ceil(paper.width / this.scl);
    this.maxgeneration = Math.ceil(paper.height / this.scl);
    this.generation;

    if (r) {
      this.ruleset = r;
    } else {
      this.randomize();
    }
    this.restart();
  };

  CA.prototype.restart = function () {
    for (var i = 0; i < this.columns; i++) {
      this.cells[i] = 0;
    }
    this.cells[Math.ceil(this.cells.length / 2)] = 1;
    this.cellsBody = [];
    this.generation = 0;
    this.paper.clear();
    return this;
  };

  CA.prototype.randomize = function () {
    this.ruleset = [];
    for (var i = 0; i < 8; i++) {
      this.ruleset.push(Math.floor(utils.random(2)));
    }
    return this;
  };

  CA.prototype.setRules = function (r) {
    this.ruleset = r;
    return this;
  };

  CA.prototype.generate = function () {
    var nextgen = [];
    for (var i = 0; i < this.columns; i++) {
      nextgen.push(0);
    }
    for (var i = 1; i < this.cells.length - 1; i++) {
      var left = this.cells[i - 1];
      var me = this.cells[i];
      var right = this.cells[i + 1];
      nextgen[i] = this.rules(left, me, right);
    }
    this.cells = nextgen;
    this.generation++;
    return this;
  };

  CA.prototype.rules = function (a, b, c) {
    var index = parseInt('' + a + b + c, 2);
    return this.ruleset[index];
  };

  CA.prototype.getTop = function () {
    return this.generation > this.maxgeneration;
  };

  CA.prototype.render = function () {
    if (this.getTop()) {
      var removes = this.cellsBody.splice(0, this.columns);
      removes.forEach(function (c) {
        c.remove();
      });
    }

    var count = 0;
    for (var i = this.cellsBody.length; i--;) {
      count++;
      var ty = -1 * Math.ceil(count / this.columns) * this.scl;
      this.cellsBody[i].transform('t0 ' + ty);
    }

    for (var i = 0; i < this.columns; i++) {
      var cell = this.paper.rect(0 + i * this.scl, this.height - this.scl, this.scl, this.scl);
      var fill = this.cells[i] ? '#222' : '#eee';
      cell.attr({
        fill: fill,
        'stroke-width': 0
      });
      this.cellsBody.push(cell);
    }
    return this;
  };

  exports.CA = CA;
})(this);
