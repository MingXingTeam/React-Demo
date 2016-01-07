import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import eslint from 'gulp-eslint';
import minifycss from 'gulp-minify-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import babel  from 'gulp-babel';
import browserSync from 'browser-sync';

const paths = {
  src:'./src',
  html:['./public/**/*.html'],
  js: ['./src/**/*.js'],
  css: ['./src/**/*.css'],
  destination: './app',
  appjs: ['./app/**/*.js'],
  appcss: ['./app/**/*.css'],
}

gulp.task('default', cb => {
  run('copyStaticPage','browsersync','watch', cb);
});

gulp.task('build', cb => {
  run('clean','lint','babel', 'copyStaticPage', cb);
});

gulp.task('copyStaticPage',() => {
    gulp.src(paths.html)
    .pipe(gulp.dest(paths.destination))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('clean', cb => {
  rimraf(paths.destination, cb);
});

gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(paths.js)
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
          config:".elintrc"
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format());
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        // .pipe(eslint.failAfterError());
});

gulp.task('babel', shell.task([
  'babel src --out-dir app'
]));
// gulp.task('babel',function(){
//   return gulp.src(paths.src)
//          .pipe(babel())
//      .pipe(gulp.dest(paths.destination))
// });

gulp.task('minifycss', () => {
    return gulp.src(paths.appcss)
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.destination));
});

gulp.task('minifyjs', () => {
    return gulp.src(paths.appjs)
        .pipe(gulp.dest(paths.destination))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.destination));
});

// BrowserSync
gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: paths.destination
    },
    open: false,
    online: true,
    notify: true,
  });
});

let express;

gulp.task('server', () => {
  express = server.new(paths.destination);
});

gulp.task('restart', () => {
  express.start.bind(express)();
});
gulp.task('watch',function(){
    gulp.watch('public/**/*.html',['copyStaticPage']);
    // gulp.watch('src/**/*.js',['build']);
});

// gulp.task('watch', () => {
//   watch(paths.js, () => {
//     gulp.start('build');
//   });

//   watch(paths.html, () => {
//     gulp.start('build');
//   });
// });
