var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var gulp = require('gulp');
var glob = require('glob');
var path = require('path');
var fs = require('fs');

// get all browserify entpoint file
var mains = glob.sync('./+(int*|chp*)/*/main.js').map(function (main) {
  return main.slice(2);
});

// define all build tasks and watch tasks
mains.forEach(function (main) {
  var destDir = path.dirname(main);
  gulp.task(main, function () {
    gulp.src(main)
    .pipe(browserify({
      debug: false
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(destDir));
  });

  gulp.task('watch:' + main, function () {
    gulp.watch([destDir + '/*.js'], [main]);
  });
});

// default task, run `gulp`
gulp.task('default', mains, function() {
  // nothing need to do here
});

// all watch task names
var watchTasks = mains.map(function (main) {
  return 'watch:' + main;
});

// in dev mode, run `gulp watch`
// watch all the js files and rebuild when them changed
gulp.task('watch', watchTasks, function () {
  // watch js files in the root
  // once these files changed, need rebuild all
  gulp.watch(['./utils.js'], [mains]);
});

// clean all bundles
gulp.task('clean', function () {
  mains.forEach(function (main) {
    rimraf.sync(path.join(path.dirname(main), 'bundle.js'));
  });
});

gulp.task('init', function () {
  var dirs = glob.sync('./+(int*|chp*)/*/');
  dirs.forEach(function (dir) {
    var main = path.join(dir, 'main.js');
    if (!fs.existsSync(main)) {
      fs.writeFileSync(main, '');
    }
  });
});
