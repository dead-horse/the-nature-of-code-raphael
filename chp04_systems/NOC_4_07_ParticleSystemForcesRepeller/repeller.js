/* global PVector,utils */
(function (exports) {

  var Repeller = function (location, paper) {
    this.paper = paper;
    this.location = location;
    this.mass = 100;
    this.g = 1;
    this.body = paper.ellipse(this.location.x, this.location.y,
      24, 24);
    this.body.attr({
      fill: '#aaa',
      stroke: '#444'
    });
  };

  Repeller.prototype.repel = function (p) {
    var dir = PVector.sub(this.location, p.location);
    var dis = dir.mag();
    dis = utils.constrain(dis, 5, 100);
    var force = -1 * this.g * this.mass / (dis * dis);
    dir.normalize().mult(force);
    return dir;
  };

  exports.Repeller = Repeller;

})(this);
