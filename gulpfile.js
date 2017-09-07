var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject');
var minifyHTML = require('gulp-minify-html');
var del = require('del');


// Basic Gulp task syntax
gulp.task('hello', function() {
    console.log('Hello Zell!');
});

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('minify', function() {
    var opts = {
        conditionals: true,
        spare: true
    };
    return gulp.src('app/template/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest("/build/template"));
});


//this copies the html files from app folder to build folder 

gulp.task('html', function() {
    return gulp.src('app/template/*.html')
        .pipe(gulp.dest('build/template'));
});


//this copies the css files from app folder to build folder 

gulp.task('css', function() {
    return gulp.src('app/css/*.css')
        .pipe(gulp.dest('build/css'));
});

//this copies the js files from app folder to build folder 

gulp.task('js', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('build/js'));
});


//this copies the fonts from app folder to build folder
gulp.task('fonts', function() {
    return gulp.src('app/fonts/*.ttf')
        .pipe(gulp.dest('build/fonts'));
});


//this copies the images from app folder to build folder
gulp.task('img', function() {
    return gulp.src('app/img/*.jpg')
        .pipe(gulp.dest('build/img'));
});

gulp.task('index', function() {
    gulp.src('./app/index.html')
        .pipe(inject(gulp.src('./app/js/**/*.js', { read: false }), { ignorePath: 'app', addRootSlash: false }))
        .pipe(gulp.dest('./build'));
});


//it cleans files which are generated automatically
gulp.task('clean', function() {
    return del.sync('build');
});


gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
        .pipe(gulp.dest('app/css')) // Outputs it in the css folder
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

// Watchers
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/css/*.css', browserSync.reload);
    gulp.watch('app/template/*.html', browserSync.reload);
});

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {

    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('build/images'));
});

// Copying fonts 
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('build/fonts'));
});


// Build Sequences
// ---------------

gulp.task('default', function(callback) {
    runSequence(['clean', 'sass', 'index', 'html', 'css', 'js', 'img', 'fonts', 'browserSync'], 'watch',
        callback
    );
});

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist',
        'sass', ['useref', 'images', 'fonts'],
        callback
    );
});