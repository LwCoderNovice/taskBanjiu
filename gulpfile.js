
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

// variable
var JAVASCRIPT_PLUGINS = ['./src/source/plugins/jquery-3.4.1.min.js', 
                          './src/source/plugins/jquery.validate/jquery.validate.min.js', 
                          './src/source/plugins/jquery.validate/additional-methods.min.js',
                          './src/source/plugins/jquery.validate/localization/messages_zh.js',
                          './src/source/plugins/bootstrap-3.3.7/dist/js/bootstrap.min.js',
                          './src/source/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                          './src/source/plugins/bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN.js',
                          './src/source/plugins/jquery-ui-1.12.1.autocomplete/jquery-ui.min.js',
                          './src/source/plugins/select2/dist/js/select2.min.js',
                          './src/source/plugins/colorbox/colorbox-master/jquery.colorbox-min.js',
                          './src/source/plugins/art-template/template-web.js',
                          './src/source/plugins/bj-selector.js',
                          './src/source/plugins/dropzone.js'];
var JAVASCRIPT_DEFINE = [
    './src/source/js/define/validate.js',
    './src/source/js/define/upload.js',
    './src/source/js/define/calendar.js',
    './src/source/js/define/otherEvent.js',
    './src/source/js/define/autocomplete.js'
]
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
    return gulp.src(['./src/source/fonts/**', './src/source/plugins/bootstrap-3.3.7/fonts/**'])
    .pipe(gulp.dest('./_ui/fonts/'))
})
gulp.task('copyImages', function() {
    return gulp.src('./src/source/images/**')
    .pipe(gulp.dest('./_ui/images/'))
})
gulp.task('copyDefine', function() {
    return gulp.src(JAVASCRIPT_DEFINE)
    .pipe(gulp.dest('./_ui/js/'))
})
gulp.task('copyData', function() {
    return gulp.src('./src/source/mockdata/**')
    .pipe(gulp.dest('./_ui/data/'))
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
    return gulp.src(JAVASCRIPT_PLUGINS)
            .pipe(concat('plugins.js'))
            .pipe(uglify())
            .pipe(rename('plugins.min.js'))
            .pipe(gulp.dest('./_ui/js'));
});
// Watch TODO
gulp.task('watch', function() {
    gulp.watch(['./src/source/less/*.less', './src/source/less/**/*.less'],  gulp.series('less:dev'));
    gulp.watch('./src/source/js/**.js',  gulp.series('js:dev'));
    gulp.watch(['./src/*.html', './src/pages/*.html', './src/_include/*.html'], gulp.series('fileinclude'));
    gulp.watch(['./src/source/js/define/*.js'], gulp.series('copyDefine'));
});
// this the produce envirenments not maps and minify files
gulp.task('default', 
    gulp.series('clean', 
        gulp.parallel('fileinclude', 'copyFonts', 'copyDefine', 'copyData', 'copyImages', 'less:pro', 'js:plugins', 'js:pro')
    )
);
// this the develop envirenments has maps
gulp.task('dev', 
    gulp.series('clean', 
        gulp.parallel('fileinclude', 'copyFonts', 'copyDefine', 'copyData', 'copyImages', 'less:dev', 'js:plugins', 'js:dev')
    )
);