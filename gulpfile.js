var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');

// Typescript options
//
var dev = ts.createProject({
    target: 'ES5',
    module: 'system',
    moduleResolution: 'node',
    noImplicitAny: true,
    outFile: 'index.js',
    emitDecoratorMetadata: true,
    experimentalDecorators: true
});


// Community TS dev
//
gulp.task('ts:build', function () {
    gulp.src(['index.ts'])
        .pipe(dev())
        .pipe(gulp.dest('./dist/'))
        .on('end', function () {
            process.stdout.write('Done ts:community\n');
        });
});

// Community SCSS dev
//
gulp.task('sass:build', function () {
    gulp.src(['style.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/'))
        .on('end', function () {
            process.stdout.write('Done sass:community\n');
        });
});

// Build All
//
gulp.task('all', function () {
    gulp.start('ts:build', 'sass:build');
});

// Watcher
//
gulp.task('watch', function () {
    gulp.watch([
        'index.ts',
    ], ['ts:build']);
    gulp.watch([
        'style.scss',
    ], ['sass:build']);
});
