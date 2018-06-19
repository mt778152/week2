//引入模块
var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mock = require('./mock/data');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');
var sass = require('gulp-sass');

// 压缩js
gulp.task('minjs', function() {
    gulp.src('src/js/index/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('bulid/js'))
});
//压缩css
gulp.task('mincss', function() {
    gulp.src('src/css/*.css')
        .pipe(clean())
        .pipe(gulp.dest('bulid/css'))
});
// 起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server, {
            port: 6060,
            host: 'localhost',
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === "/favicon.ico") {
                    return
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === "/" ? "/index.html" : pathname;
                if (pathname = "/api/list") {
                    res.end(JSON.stringify(mock(pathname)));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }

        })
})