module.exports = Walker;

function Walker(x, y, paper) {
  this.x = x;
  this.y = y;
  this.paper = paper;
  this.body = paper.ellipse(this.x, this.y, 5, 5);
  this.body.attr({
    fill: '#000'
  });
}

Walker.prototype.walk = function () {
  var num = Math.random();
  if (num < 0.4) {
    return this.x++;
  }
  if (num < 0.6) {
    return this.x--;
  }
  if (num < 0.8) {
    return this.y++;
  }
  return this.y--;
};

Walker.prototype.render = function () {
  this.body.animate({
    cx: this.x,
    cy: this.y
  }, 1);
};
