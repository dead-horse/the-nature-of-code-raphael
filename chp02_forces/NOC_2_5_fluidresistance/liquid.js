(function (exports) {
  var Liquid = function (rect, c, paper) {
    this.rect = rect;
    this.c = c;
    this.body = paper.rect(rect.x, rect.y, rect.width, rect.height);
    this.body.attr({
      fill: '#555',
      'stroke-width': 0,
      opacity: 0.5
    });
  };

  Liquid.prototype.contain = function (mover) {
    var l = mover.location;
    var rect = this.rect;

    return l.x > rect.x && l.x < rect.width + rect.x &&
      l.y > rect.y && l.y < rect.height + rect.y;
  };

  Liquid.prototype.drag = function (mover) {
    var speed = mover.velocity.mag();
    var rate = this.c * speed * speed * -1;
    var dragForce = mover.velocity.clone().normalize().mult(rate);

    return dragForce;
  };

  exports.Liquid = Liquid;
})(this);
