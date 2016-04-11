/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files. Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see (the original):
 * 		https://github.com/Zolmeister/grunt-sails-inject
 *
 */
module.exports = function(gulp, plugins, growl) {

    // Insert JS, CSS and template dev links into HTML files in the tmp assets folder
    gulp.task('sails-inject-gulp:devAssets', function() {
        // Read templates
        return gulp.src('.tmp/public/**/*.html')
            // Link the javaScript
            .pipe(
              plugins.inject(
                gulp.src(require('../pipeline').jsFilesToInject, {read: false}),
                {
                  starttag: '<!--SCRIPTS-->',
                  endtag: '<!--SCRIPTS END-->',
                  relative: true
                }
              )
            )
            // Link the styles
            .pipe(
              plugins.inject(
                gulp.src(require('../pipeline').cssFilesToInject, {read: false}),
                {
                  starttag: '<!--STYLES-->',
                  endtag: '<!--STYLES END-->',
                  relative: true
                }
              )
            )
            // Link the JST Templates
            .pipe(
              plugins.inject(
                gulp.src( ['.tmp/public/jst.js'], {read: false}),
                {
                  starttag: '<!--TEMPLATES-->',
                  endtag: '<!--TEMPLATES END-->',
                  relative: true
                }
              )
            )
            // Write modified files...
            .pipe(gulp.dest('.tmp/public/'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'sails-inject-gulp:devAssets task complete' })));
    });

    // Insert JS, CSS and template dev links into HTML and EJS files in the views folder
    gulp.task('sails-inject-gulp:devViews', function() {
        // Read templates
        return gulp.src(['views/**/*.html', 'views/**/*.ejs'])
            // Link the javaScript
            .pipe(
              plugins.inject(
                gulp.src(require('../pipeline').jsFilesToInject, {read: false}),
                {
                  starttag: '<!--SCRIPTS-->',
                  endtag: '<!--SCRIPTS END-->',
                  relative: true
                }
              )
            )
            // Link the styles
            .pipe(
              plugins.inject(
                gulp.src(require('../pipeline').cssFilesToInject, {read: false}),
                {
                  starttag: '<!--STYLES-->',
                  endtag: '<!--STYLES END-->',
                  relative: true
                }
              )
            )
            // Link the JST Templates
            .pipe(
              plugins.inject(
                gulp.src( ['.tmp/public/jst.js'], {read: false}),
                {
                  starttag: '<!--TEMPLATES-->',
                  endtag: '<!--TEMPLATES END-->',
                  relative: true
                }
              )
            )
            // Write modified files...
            .pipe(gulp.dest('views/'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'sails-inject-gulp:devViews task complete' })));
    });

    // Insert relative JS, CSS and template dev links into HTML files in the tmp assets folder
    gulp.task('sails-inject-gulp:devAssetsRelative', function() {
        // Read templates
        return gulp.src('.tmp/public/**/*.html')
            // Link the JavaScript
            .pipe(
              plugins.inject(
                gulp.src(require('../pipeline').jsFilesToInject, {read: false}),
                {
                  starttag: '<!--SCRIPTS-->',
                  endtag: '<!--SCRIPTS END-->',
                  relative: true
                }
              )
            )
            // Link the styles
            .pipe(
              plugins.inject(
                gulp.src(require('../pipeline').cssFilesToInject, {read: false}),
                {
                  starttag: '<!--STYLES-->',
                  endtag: '<!--STYLES END-->',
                  relative: true
                }
              )
            )
            // Link the JST Templates
            .pipe(
              plugins.inject(
                gulp.src( ['.tmp/public/jst.js'], {read: false}),
                {
                  starttag: '<!--TEMPLATES-->',
                  endtag: '<!--TEMPLATES END-->',
                  relative: true
                }
              )
            )
            // Write modified files...
            .pipe(gulp.dest('.tmp/public/'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'sails-inject-gulp:devAssetsRelative task complete' })));
    });

    // Insert relative JS, CSS and template dev links into HTML and EJS files in the views folder
    gulp.task('sails-inject-gulp:devViewsRelative', function() {
        // Read templates
        return gulp.src(['views/**/*.html', 'views/**/*.ejs'])
            // Link the javaScript
            .pipe(
              plugins.inject(
                gulp.src(require('../pipeline').jsFilesToInject, {read: false}),
                {
                  starttag: '<!--SCRIPTS-->',
                  endtag: '<!--SCRIPTS END-->',
                  relative: true
                }
              )
            )
            // Link the styles
            .pipe(
              plugins.inject(
                gulp.src(require('../pipeline').cssFilesToInject, {read: false}),
                {
                  starttag: '<!--STYLES-->',
                  endtag: '<!--STYLES END-->',
                  relative: true
                }
              )
            )
            // Link the JST Templates
            .pipe(
              plugins.inject(
                gulp.src( ['.tmp/public/jst.js'], {read: false}),
                {
                  starttag: '<!--TEMPLATES-->',
                  endtag: '<!--TEMPLATES END-->',
                  relative: true
                }
              )
            )
            // Write modified files...
            .pipe(gulp.dest('views/'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'sails-inject-gulp:devViewsRelative task complete' })));
    });

    // Insert JS, CSS and template production links into HTML files in the tmp assets folder
    gulp.task('sails-inject-gulp:prodAssets', function() {
        // Read templates
        return gulp.src('.tmp/public/**/*.html')
            // Link the JavaScript
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/concat/production.min.js'], {read: false}),
                {
                  starttag: '<!--SCRIPTS-->',
                  endtag: '<!--SCRIPTS END-->',
                  relative: true
                }
              )
            )
            // Link the styles
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/concat/production.min.css'], {read: false}),
                {
                  starttag: '<!--STYLES-->',
                  endtag: '<!--STYLES END-->',
                  relative: true
                }
              )
            )
            // Link the JST Templates
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/jst.js'], {read: false}),
                {
                  starttag: '<!--TEMPLATES-->',
                  endtag: '<!--TEMPLATES END-->',
                  relative: true
                }
              )
            )
            // Write modified files...
            .pipe(gulp.dest('.tmp/public/'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'sails-inject-gulp:prodAssets task complete' })));
    });

    // Insert JS, CSS and template production links into HTML and EJS files in the views folder
    gulp.task('sails-inject-gulp:prodViews', function() {
        // Read templates
        return gulp.src(['views/**/*.html', 'views/**/*.ejs'])
            // Link the JavaScript
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/concat/production.min.js'], {read: false}),
                {
                  starttag: '<!--SCRIPTS-->',
                  endtag: '<!--SCRIPTS END-->',
                  relative: true
                }
              )
            )
            // Link the styles
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/concat/production.min.css'], {read: false}),
                {
                  starttag: '<!--STYLES-->',
                  endtag: '<!--STYLES END-->',
                  relative: true
                }
              )
            )
            // Link the JST Templates
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/jst.js'], {read: false}),
                {
                  starttag: '<!--TEMPLATES-->',
                  endtag: '<!--TEMPLATES END-->',
                  relative: true
                }
              )
            )
            // Write modified files...
            .pipe(gulp.dest('views/'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'sails-inject-gulp:prodViews task complete' })));
    });

    // Insert relative JS, CSS and template production links into HTML files in the tmp assets folder
    gulp.task('sails-inject-gulp:prodAssetsRelative', function() {
        // Read templates
        return gulp.src('.tmp/public/**/*.html')
            // Link the JavaScript
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/concat/production.min.js'], {read: false}),
                {
                  starttag: '<!--SCRIPTS-->',
                  endtag: '<!--SCRIPTS END-->',
                  relative: true
                }
              )
            )
            // Link the styles
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/concat/production.min.css'], {read: false}),
                {
                  starttag: '<!--STYLES-->',
                  endtag: '<!--STYLES END-->',
                  relative: true
                }
              )
            )
            // Link the JST Templates
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/jst.js'], {read: false}),
                {
                  starttag: '<!--TEMPLATES-->',
                  endtag: '<!--TEMPLATES END-->',
                  relative: true
                }
              )
            )
            // Write modified files...
            .pipe(gulp.dest('.tmp/public/'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'sails-inject-gulp:prodAssetsRelative task complete' })));
    });

    // Insert relative JS, CSS and template production links into HTML and EJS files in the views folder
    gulp.task('sails-inject-gulp:prodViewsRelative', function() {
        // Read templates
        return gulp.src(['views/**/*.html', 'views/**/*.ejs'])
            // Link the JavaScript
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/concat/production.min.js'], {read: false}),
                {
                  starttag: '<!--SCRIPTS-->',
                  endtag: '<!--SCRIPTS END-->',
                  relative: true
                }
              )
            )
            // Link the styles
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/concat/production.min.css'], {read: false}),
                {
                  starttag: '<!--STYLES-->',
                  endtag: '<!--STYLES END-->',
                  relative: true
                }
              )
            )
            // Link the JST Templates
            .pipe(
              plugins.inject(
                gulp.src(['.tmp/public/jst.js'], {read: false}),
                {
                  starttag: '<!--TEMPLATES-->',
                  endtag: '<!--TEMPLATES END-->',
                  relative: true
                }
              )
            )
            // Write modified files...
            .pipe(gulp.dest('views/'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'sails-inject-gulp:prodViewsRelative task complete' })));
    });

};
