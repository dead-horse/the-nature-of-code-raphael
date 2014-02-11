/* global utils */
(function (exports) {
  var CA = function (r, paper) {
    if (!paper) {
      paper = r;
      r = null;
    }
    this.paper = paper;
    this.cells = [];
    this.scl = 10;
    this.total = Math.ceil(paper.width / this.scl);
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
    for (var i = 0; i < this.total; i++) {
      this.cells[i] = 0;
    }
    this.cells[Math.ceil(this.cells.length / 2)] = 1;
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
    for (var i = 0; i < this.total; i++) {
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

  CA.prototype.finished = function () {
    return this.generation > this.maxgeneration;
  };

  CA.prototype.render = function () {
    for (var i = 0; i < this.total; i++) {
      var cell = this.paper.rect(0 + i * this.scl, this.generation * this.scl, this.scl, this.scl);
      var fill = this.cells[i] ? '#222' : '#fff';
      cell.attr({
        fill: fill,
        stroke: '#222'
      });
    }
    return this;
  };

  exports.CA = CA;
})(this);
