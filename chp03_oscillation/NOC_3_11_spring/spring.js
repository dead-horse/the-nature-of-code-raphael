/* global utils,PVector */
(function (exports) {
  var Spring = function (anchor, len, minlen, maxlen, paper) {
    this.anchor = anchor;
    this.paper = paper;
    this.len = len;
    this.minlen = minlen;
    this.maxlen = maxlen;

    this.line = paper.path();
    this.line.attr({
      stroke: '#222'
    });
    this.head = paper.rect(anchor.x - 10, anchor.y - 10, 20, 20);
    this.head.attr({
      fill: '#222'
    });

    this.k = 0.2;
  };

  Spring.prototype.getForce = function (end) {
    var f = PVector.sub(end, this.anchor);
    var dis = f.mag();
    f.normalize()
      .mult(-1 * (dis - this.len) * this.k);
    return f;
  };

  Spring.prototype.lineTo = function (end) {
    this.line.animate({
      path: 'M' + this.anchor.x + ' ' + this.anchor.y +
        'L' + end. x + ' ' + end.y
    });
  };

  exports.Spring = Spring;
})(this);
