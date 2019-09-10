
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
var fileinclude = require('gulp-file-include');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

// function list

// Clean the _ui folder.
gulp.task('clean', function() {
    return del([
        './_ui/**'
    ], {force: true}).then(function() {
        console.log('Clean the _ui folder...');
    })
});

// Compiling html
gulp.task('fileinclude', function() {
   return gulp.src(['./src/*.html', './src/pages/*.html'])//主文件
        .pipe(fileinclude({
            prefix: '@@',//变量前缀 @@include
            basepath: './src/_include',//引用文件路径
            indent:true//保留文件的缩进
        }))
        .pipe(gulp.dest('./_ui'));//输出文件路径
});
// Copy the fonts to the ui folder.
gulp.task('copyFonts', function() {
    return gulp.src(['./src/source/fonts/**', './src/source/plugins/dist/fonts/**'])
    .pipe(gulp.dest('./_ui/fonts/'))
})
gulp.task('copyImages', function() {
    return gulp.src('./src/source/images/**')
    .pipe(gulp.dest('./_ui/images/'))
})
// Compiling less 
gulp.task('less:dev', function() {
    return gulp.src('./src/source/less/style.less')
            .pipe(lesshint({
                configPath: '.lesshintrc'
                // Options TODO
            }))
            .pipe(less({
                plugins : [autoprefix]
            }))
            .pipe(gulp.dest('./_ui/css/'));
});
// Compiling and minify less
gulp.task('less:pro', function() {
    return gulp.src('./src/source/less/style.less')
            .pipe(less({
                plugins : [autoprefix]
            }))
            .pipe(rename(function(path) {
                path.basename += '.min';
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./_ui/css/'))
});
// Compression customer js and create map
gulp.task('js:dev', function() {
    return gulp.src('./src/source/js/**.js')
            .pipe(jshint())
            .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(gulp.dest('./_ui/js'))
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest('./_ui/js'));
});
// Compression customer js only
gulp.task('js:pro', function() {
    return gulp.src('./src/source/js/**.js')
            .pipe(jshint())
            .pipe(concat('main.js'))
            .pipe(strip())
            .pipe(uglify({
                mangle: true
            }))
            .pipe(rename('main.min.js'))
            .pipe(gulp.dest('./_ui/js'));
});
// Compression plugins js only
gulp.task('js:plugins', function() {
    return gulp.src(['./src/source/plugins/**.js','../src/source/plugins/bootstrap-3.3.7/dist/js/bootstrao.min.js' ])
            .pipe(concat('plugins.js'))
            .pipe(uglify())
            .pipe(rename('main.min.js'))
            .pipe(gulp.dest('./_ui/js'));
});
// Watch TODO
gulp.task('watch', function() {
    gulp.watch('./src/source/less/*.less',  gulp.series('less:dev'));
    gulp.watch('./src/source/js/**.js',  gulp.series('js:dev'));
    gulp.watch(['./src/*.html', './src/pages/*.html'], gulp.series('fileinclude'));
});
// this the produce envirenments not maps and minify files
gulp.task('default', 
    gulp.series('clean', 
        gulp.parallel('fileinclude', 'copyFonts', 'copyImages', 'less:pro', 'js:pro')
    )
);
// this the develop envirenments has maps
gulp.task('dev', 
    gulp.series('clean', 
        gulp.parallel('fileinclude', 'copyFonts', 'copyImages', 'less:dev', 'js:dev')
    )
);