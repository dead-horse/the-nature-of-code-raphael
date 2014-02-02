/*global Raphael*/
(function (exports) {
  var utils = {};

  /**
   * setup the raphael with $('#paper')
   * @param {[type]} width [description]
   * @param {[type]} height [description]
   * @param {[type]} background [description]
   * @return {[type]} [description]
   */
  utils.setup = function (width, height, background) {
    width = width || 640;
    height = height || 360;
    background = background || '#eee';
    var container = $('#paper');
    container.width(width)
      .height(height)
      .css('background-color', background);
    var paper = new Raphael('paper', width, height);
    return paper;
  };

  /**
   * draw the page `frame` times per second. limit only draw `times` time
   * @param {Number} frame
   * @param {Number} times
   * @param {Function} callback
   * @return {Timer}
   */
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

  /**
   * map val from start1 ~ stop1 to start2 ~ stop2
   * @param Number val
   * @param Number start1
   * @param Number stop1
   * @param Number start2
   * @param Number stop2
   * @return Number
   */
  utils.map = function (val, start1, stop1, start2, stop2) {
    var rate = (val - start1) / (stop1 - start1);
    return start2 + (stop2 - start2) * rate;
  };

  /**
   * constrain start <= val <= end
   * @param {Number} val
   * @param {Number} start
   * @param {Number} end
   * @return {Number}
   */
  utils.constrain = function (val, start, end) {
    if (val < start) {
      return start;
    }
    if (val > end) {
      return end;
    }
    return val;
  };

  /**
   * get a random number from start to stop
   * @param Number start
   * @param Number stop
   * @return Number
   */
  utils.random = function (start, stop) {
    if (typeof start !== 'number') {
      return Math.random();
    }

    if (typeof stop !== 'number') {
      return Math.random() * start;
    }

    return Math.random() * (stop - start) + start;
  };

  /**
   * translate 255, 255, 255 to #ffffff
   * @param Number r
   * @param Number g
   * @param Number b
   * @return String
   */
  utils.getColorString = function (r, g, b) {
    if (typeof g !== 'number' || typeof b !== 'number') {
      g = r;
      b = r;
    }
    function toString16(r) {
      var pad = '';
      if (r < 16) {
        pad = '0';
      }
      return pad + r.toString(16);
    }
    return '#' + toString16(r) + toString16(g) + toString16(b);
  };

  /**
   * degree to radian
   * @param {Number} degree
   * @return {Number}
   */
  utils.radian = function (degree) {
    return degree / 180 * Math.PI;
  };

  utils.degree = function (radian) {
    return radian * 180 / Math.PI;
  };

  utils.inherits = function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };

  exports.utils = utils;
})(this);
