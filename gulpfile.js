var gulp = require('gulp');
var fs = require("fs");
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var Server = require('karma').Server;

gulp.task('build', function () {
   var b =  browserify('./src/main.js', watchify.args)
			.plugin(watchify)
			.transform(babelify, {presets: ["react"]});

	b.on('update', bundle);
	bundle();

	function bundle() {
		b.bundle().pipe(fs.createWriteStream('bundle.js'));
		console.log('Generated new bundle.js file');
	}
});

gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', ['build']);