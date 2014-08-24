/* global Raphael,Distribution,utils */

var Distribution = require('./distribution');
var utils = require('../../utils');

var paper = utils.setup();
var dist = new Distribution(20, paper);
utils.draw(function () {
  dist.render();
});
