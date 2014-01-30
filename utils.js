/*global Raphael*/
(function (exports) {
  var utils = {};
  utils.setup = function (width, height, background) {
    width = width || 640;
    height = height || 320;
    background = background || '#777';
    var container = $('#paper');
    container.width(width)
      .height(height)
      .css('background-color', background);
    var paper = new Raphael('paper', width, height);
    return paper;
  };

  utils.draw = function(frame, times, callback) {
    if (typeof frame === 'function') {
      callback = frame;
      times = null;
      frame = 30;
    } else if (typeof times === 'function') {
      callback = times;
      times = null;
    }
    if (!times) {
      return setInterval(callback, 1000 / frame);
    }
    var counter = 0;
    var timer = setInterval(function () {
      if (++counter === times) {
        clearInterval(timer);
      }
      callback();
    }, 1000 / frame);
  };

  utils.map = function (val, start1, stop1, start2, stop2) {
    var rate = (val - start1) / (stop1 - start1);
    return start2 + (stop2 - start2) * rate;
  };

  utils.random = function (start, stop) {
    if (typeof start !== 'number') {
      return Math.random();
    }

    if (typeof stop !== 'number') {
      return Math.random() * start;
    }

    return Math.random() * (stop - start) + start;
  };

  exports.utils = utils;
})(this);
