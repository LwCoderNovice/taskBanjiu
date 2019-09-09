
var gulp =  require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var del = require('del');
var lesshint = require('gulp-lesshint');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var strip = require('gulp-strip-comments');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

// function list

// Clean the _ui folder.
gulp.task('clean', function() {
    return del([
        '../_ui/**'
    ], {force: true}).then(function() {
        console.log('Clean the _ui folder...');
    })
});
// Copy the fonts to the ui folder.
gulp.task('copy', function() {
    return gulp.src('../src/**/fonts/**')
    .pipe(rename(function(path) {
        path.dirname  = path.dirname.replace(/themes\\(.*)/,"themes-$1");
    }))
    .pipe(gulp.dest('../_ui/'))
})
// Compiling less 
gulp.task('less:dev', function() {
    return gulp.src('../src/**/**/style.less')
            .pipe(lesshint({
                configPath: '.lesshintrc'
                // Options TODO
            }))
            .pipe(less({
                plugins : [autoprefix]
            }))
            .pipe(rename(function(path) {
                path.dirname  = path.dirname.replace(/themes\\(.*)\\less/,"themes-$1\\css");
            }))
            .pipe(gulp.dest('../_ui/'));
});
// Compiling and minify less
gulp.task('less:pro', function() {
    return gulp.src('../src/**/**/style.less')
            .pipe(lesshint({
                configPath: '.lesshintrc'
                // Options
            }))
            .pipe(less({
                plugins : [autoprefix]
            }))
            .pipe(rename(function(path) {
                path.dirname  = path.dirname.replace(/themes\\(.*)\\less/,"themes-$1\\css");
                path.basename += '.min';
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('../_ui/'))
});
// Compression customer js and create map
gulp.task('js:dev', function() {
    return gulp.src('../src/js/**.js')
            .pipe(jshint())
            .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(rename(function(path) {
                path.dirname  = path.dirname.replace(/themes\\(.*)/,"themes-$1");
            }))
            .pipe(gulp.dest('../_ui/js'))
            .pipe(uglify())
            .pipe(rename('main.min.js'))
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest('../_ui/js'));
});
// Compression customer js only
gulp.task('js:pro', function() {
    return gulp.src('../src/js/**.js')
            .pipe(jshint())
            .pipe(concat('main.js'))
            .pipe(strip())
            .pipe(rename(function(path) {
                path.dirname  = path.dirname.replace(/themes\\(.*)/,"themes-$1");
            }))
            .pipe(uglify({
                mangle: true
            }))
            .pipe(rename('main.min.js'))
            .pipe(gulp.dest('../_ui/js'));
});
// Compression plugins js only
gulp.task('js:plugins', function() {
    return gulp.src('../src/**/**.js')
            .pipe(jshint())
            .pipe(concat('plugins.js'))
            .pipe(rename(function(path) {
                path.dirname  = path.dirname.replace(/themes\\(.*)/,"themes-$1");
                path.basename += '.min';
            }))
            .pipe(uglify())
            .pipe(rename('main.min.js'))
            .pipe(gulp.dest('../_ui/js'));
});
// Watch TODO
gulp.task('watch', function() {
    gulp.watch('../src/themes/**/less/*.less',  gulp.series('less:dev'));
    gulp.watch('../src/**/*.js',  gulp.series('js:dev'));
});
// this the produce envirenments not maps and minify files
gulp.task('default', 
    gulp.series('clean', 
        gulp.parallel('copy', 'less:pro', 'js:pro')
    )
);
// this the develop envirenments has maps
gulp.task('dev', 
    gulp.series('clean', 
        gulp.parallel('copy', 'less:dev', 'js:dev')
    )
);