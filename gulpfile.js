var gulp = require('gulp');
var concatWithSourcemap = require('gulp-concat-sourcemap');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var git = require('gulp-git');
var maps = require('gulp-sourcemaps');
var replace = require('gulp-replace');
var imagemin = require('gulp-imagemin');
var stripDebug = require('gulp-strip-debug');
var critical = require('critical');
var csso = require('gulp-csso');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

var autoRestart = require('gulp-auto-restart');
autoRestart({'task': 'watch'});

/*=================================
=            JS Concat            =
=================================*/

var thirdPartyScripts = [
  // "./src/simply-framework/js/plugins-and-libraries/uuid.js",
  // "./src/simply-framework/js/plugins-and-libraries/jquery.transit.min.js",
  // "./src/simply-framework/js/plugins-and-libraries/tooltipster/tooltipster.bundle.min.js",
  // "./src/simply-framework/js/plugins-and-libraries/jquery-deparam.js",
  // "./src/simply-framework/js/plugins-and-libraries/jquery.scrollTo.min.js",
  // "./src/simply-framework/js/plugins-and-libraries/jquery.alterclass.js",
  // "./src/simply-framework/js/plugins-and-libraries/jquery.event.move.js",
  // "./node_modules/validator/validator.js",
];

var generalFrameworkScripts = [
  // "./src/simply-framework/js/general-framework/basic-jquery-wrappers.js",
  // "./src/simply-framework/js/general-framework/fallback-localstorage-clear.js",
  // "./src/simply-framework/js/utilities/transitions-functions-wrapper.js",
  // "./src/simply-framework/js/general-framework/initial-preloading.js",
  // "./src/simply-framework/js/utilities/semantic-shortcuts.js",
  // "./src/simply-framework/js/general-framework/state-manager.js",
  // "./src/simply-framework/js/general-framework/state-manager-array-operations.js",
  // //"./src/simply-framework/js/general-framework/state-manager.tests.js",
  // "./src/simply-framework/js/general-framework/data-binding-and-data-lists.js",
  // "./src/simply-framework/js/general-framework/showing-or-hiding-based-on-state.js",
  // "./src/simply-framework/js/utilities/eventBindingUtilities.js",
  // "./src/simply-framework/js/utilities/utility-functions.js",
  // "./src/simply-framework/js/general-framework/reactiveLocalStorageValidation.js",
  // "./src/simply-framework/js/utilities/collapsible-sections.js",
];

var generalFrameworkComponentsScripts = [
  // "./src/simply-framework/js/components/tooltipster-for-webflow.js",
  // "./src/simply-framework/js/components/select-dropdowns.js",
  // "./src/simply-framework/js/components/hamburger-menu.js",
  // "./src/simply-framework/js/components/modals.js",
  // "./src/simply-framework/js/components/flashing-notifications.js",
  // "./src/simply-framework/js/components/tabs.js",
  // "./src/simply-framework/js/components/forms.js",
  // "./src/simply-framework/js/components/radio-buttons.js",
  // "./src/simply-framework/js/components/text-input-fields.js",
  // "./src/simply-framework/js/components/checkboxes.js",
  // "./src/simply-framework/js/components/slider.js",
  // "./src/simply-framework/js/components/stars.js",
  // "./src/simply-framework/js/components/buttons-with-spinner.js",
];

var appScripts = [
  "./src/simply-app/js/general/global-variables.js",
  "./src/simply-app/js/general/routes-and-redirects.js",
  "./src/simply-app/js/general/utility-functions.js",
  "./src/simply-app/js/features/main-navigation.js",
  "./src/simply-app/js/features/analytics-tracking.js",
  "./src/simply-app/js/features/demo-page.js",
];

var allScripts = thirdPartyScripts
  .concat(generalFrameworkScripts)
  .concat(generalFrameworkComponentsScripts)
  .concat(appScripts);

/*=====  End of JS Concat  ======*/

/*==================================
=            CSS Concat            =
==================================*/

/* Order of files is important!
Normalizer goes first, then components, then page specific styles */
var thirdPartyCssFiles = [
  //"./src/simply-framework/css/normalize.css",
  //"./src/simply-framework/css/webflow.css",
  "./src/simply-framework/js/plugins-and-libraries/tooltipster/tooltipster.bundle.min.css",
];

var generalFrameworkCssFiles = [
  "./src/simply-framework/css/css-general.css",
  "./src/simply-framework/css/css-utilities.css",
  "./src/simply-framework/css/tooltipster-additional-themes.css",
];

var appCssFiles = [
  "./src/simply-app/css/styles.css",
];

var allCssFiles = thirdPartyCssFiles
  .concat(generalFrameworkCssFiles)
  .concat(appCssFiles);

/*=====  End of CSS Concat  ======*/

var imageMinSettings = [
	imagemin.jpegtran({progressive: true}),
	imagemin.optipng({optimizationLevel: 7}),
];

/*============================================
=            Build for production            =
============================================*/

gulp.task('buildProductionCssFile', function() {
    return gulp.src(allCssFiles)
        .pipe(concat('styles-bundle.css'))
        .pipe(csso())
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('buildProductionScript', function() {
    return gulp.src(allScripts)
        .pipe(concat('scripts-bundle.js'))
        .pipe(uglify({
        	compress: false
        }))
        .pipe(gulp.dest('./build/js/'));
});

var timestampCurrent = Date.now();
gulp.task('buildHtmlForProduction', function(){
  gulp.src('./src/simply-app/html/**/*.html', { "base" : "./src/simply-app/html" })
    .pipe(replace('scripts-bundle.js', 'scripts-bundle.js'+'?v='+timestampCurrent+''))
    .pipe(replace('styles-bundle.css', 'styles-bundle.css'+'?v='+timestampCurrent+''))
    .pipe(gulp.dest('./build'));
});

gulp.task('copyAndCompressImages', function(){
  gulp.src('./src/simply-app/images/**/*', { "base" : "../src/simply-app/images" })
   	.pipe(imagemin(imageMinSettings, {verbose: true}))
    .pipe(gulp.dest('./build/images'));
});

gulp.task('copyFonts', function(){
  gulp.src('./src/simply-app/fonts/**/*', { "base" : "./src/simply-app/fonts" })
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('build-prod', [
		'buildProductionCssFile',
		'buildProductionScript',
		'buildHtmlForProduction',
		'copyFonts',
		'copyAndCompressImages',
	], function() {
    	//
	}
);

gulp.task('clean-build-directory', function () {
    return gulp.src('./build', {read: false})
        .pipe(clean());
});

gulp.task('build-prod-clean', [
		'clean-build-directory',
	], function() {
    	gulp.start('build-prod');
	}
);

/*=====  End of Build for production  ======*/


/*============================================
=            Build for development            =
============================================*/


gulp.task('buildDevelopmentCssFile', function() {
    return gulp.src(allCssFiles)
        .pipe(concatWithSourcemap('styles-bundle.css', {sourcesContent: true}))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('buildDevelopmentScript', function() {
    return gulp.src(allScripts)
        .pipe(concatWithSourcemap('scripts-bundle.js', {sourcesContent: true}))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('buildHtml', function(){
  gulp.src('./src/simply-app/html/**/*.html', { "base" : "./src/simply-app/html" })
    .pipe(gulp.dest('./build'));
});

gulp.task('copyImages', function(){
  gulp.src('./src/simply-app/images/**/*', { "base" : "./src/simply-app/images" })
    .pipe(gulp.dest('./build/images'));
});

gulp.task('build-dev', [
		'buildDevelopmentCssFile',
		'buildDevelopmentScript',
		'buildHtml',
		'copyFonts',
		'copyImages',
	]
);

gulp.task('build-dev-clean', [
		'clean-build-directory',
	], function() {
    	gulp.start('build-dev');
	}
);

/*=====  End of Build for development  ======*/

/*=============================
=            Watch            =
=============================*/
var filesToWatch = [
  "./src/**/*.js",
  "./src/**/*.css",
  "./src/**/*.html"
];

gulp.task('watch', ['build-dev'], function() {
  gulp.watch(filesToWatch, ['build-dev']);
});

/*=====  End of Watch  ======*/



/*===================================
=            Browsersync            =
===================================*/
gulp.task('browser-sync', function() {
    browserSync.init({
        server: "build",
        files: ["build"],
    });
});

gulp.task('watch-reload', ['build-dev'], function() {
  browserSync.init({
      server: "build",
  });

  gulp.watch(filesToWatch, ['build-dev']);
  gulp.watch(filesToWatch).on('change', browserSync.reload);
});
/*=====  End of Browsersync  ======*/

/*=================================================================
=            Automatic pushes for working with Webflow            =
=================================================================*/

gulp.task('buildScriptsThenAddAndCommit', ['build-dev'], function() {
    return gulp.src('.')
      .pipe(git.add())
      .pipe(git.commit('automatic commit from webflow-prototyping-framework'));
});

var gitPushTimer;
gulp.task('buildScriptsThenAddAndCommitThenPush', ['buildScriptsThenAddAndCommit'], function() {
  clearTimeout(gitPushTimer);
  gitPushTimer = setTimeout(function() {
    git.push('origin', 'master', function (err) {
      if (err) throw err;
    });
  }, 500);
});

gulp.task('watchFilesAndAutomaticallyPushChanges', ['buildScriptsThenAddAndCommitThenPush'], function() {
  gulp.watch(filesToWatch, ['buildScriptsThenAddAndCommitThenPush']);
});

/*=====  End of Automatic pushes for working with Webflow  ======*/


