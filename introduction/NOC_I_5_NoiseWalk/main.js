var utils = require('../../utils');
var Walker = require('./walker');

var paper = utils.setup();
var walker = new Walker(320, 160, paper);
utils.draw(function () {
  walker.walk();
});
