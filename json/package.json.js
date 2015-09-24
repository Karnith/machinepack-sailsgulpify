/**
 * Module dependencies
 */

var _ = require('lodash');
var util = require('util');

/**
 *
 * @param  {[type]} scope [description]
 * @return {[type]}       [description]
 */
module.exports = function dataForPackageJSON(scope) {

  var sailsPkg = scope.sailsPackageJSON || {};

  // To determine the sails dep. to inject in the newly created package.json,
  // use `sails.prerelease` specified in the package.json of Sails itself.
  // If a `prerelease` version no. is not specified, just use `version`
  var sailsVersionDependency = (sailsPkg.sails && sailsPkg.sails.prerelease) || ('~' + sailsPkg.version);

  // List default dependencies used for apps with a frontend
  var dependenciesFrontAndBackend = {
    'gulp': getDependencyVersion(sailsPkg, 'gulp'),
    'gulp-autoprefixer': getDependencyVersion(sailsPkg, 'gulp-autoprefixer'),
    'gulp-cache': getDependencyVersion(sailsPkg, 'gulp-cache'),
    'gulp-changed': getDependencyVersion(sailsPkg, 'gulp-changed'),
    'gulp-coffee': getDependencyVersion(sailsPkg, 'gulp-coffee'),
    'gulp-concat': getDependencyVersion(sailsPkg, 'gulp-concat'),
    'gulp-if': getDependencyVersion(sailsPkg, 'gulp-if'),
    'gulp-imagemin': getDependencyVersion(sailsPkg, 'gulp-imagemin'),
    'gulp-jade': getDependencyVersion(sailsPkg, 'gulp-jade'),
    'gulp-jshint': getDependencyVersion(sailsPkg, 'gulp-jshint'),
    'gulp-less': getDependencyVersion(sailsPkg, 'gulp-less'),
    'gulp-linker': getDependencyVersion(sailsPkg, 'gulp-linker'),
    'gulp-livereload': getDependencyVersion(sailsPkg, 'gulp-livereload'),
    'gulp-load-plugins': getDependencyVersion(sailsPkg, 'gulp-load-plugins'),
    'gulp-minify-css': getDependencyVersion(sailsPkg, 'gulp-minify-css'),
    'gulp-notify': getDependencyVersion(sailsPkg, 'gulp-notify'),
    'gulp-rename': getDependencyVersion(sailsPkg, 'gulp-rename'),
    'gulp-rimraf': getDependencyVersion(sailsPkg, 'gulp-rimraf'),
    'gulp-sass': getDependencyVersion(sailsPkg, 'gulp-sass'),
    'gulp-template-compile': getDependencyVersion(sailsPkg, 'gulp-template-compile'),
    'gulp-uglify': getDependencyVersion(sailsPkg, 'gulp-uglify'),
    'gulp-util': getDependencyVersion(sailsPkg, 'gulp-util'),
    'rimraf': getDependencyVersion(sailsPkg, 'rimraf'),
    'run-sequence': getDependencyVersion(sailsPkg, 'run-sequence')
  };

  // List default dependencies used for back-end only apps (--no-frontend)
  var dependenciesBackendOnly = {
    'include-all': getDependencyVersion(sailsPkg, 'include-all'),
    'rc': getDependencyVersion(sailsPkg, 'rc'),
    'sails': sailsVersionDependency,
    'sails-disk': getDependencyVersion(sailsPkg, 'sails-disk')
  };

  // Creating default package.json file content
  var defaultPackageJSONContent = {
    name: scope.appName,
    private: true,
    version: '0.0.0',
    description: 'a Sails application',
    keywords: [],
    dependencies: (scope['frontend'] === false) ? dependenciesBackendOnly : dependenciesFrontAndBackend,
    scripts: {
      debug: 'node debug app.js',
      start: 'node app.js'
    },
    main: 'app.js',
    repository: {
      type: 'git',
      url: util.format('git://github.com/%s/%s.git', scope.github.username, scope.appName)
    },
    author: scope.author || '',
    license: ''
  };

  //
  // Check for `packageJson` configuration
  //

  if (scope.packageJson && _.isObject(scope.packageJson)) {
    //
    // Adding new dependencies to package.json
    //
    _.merge(defaultPackageJSONContent, (scope.packageJson || {}));

    //
    // Remove dependencies that has false as version
    // If somebody don't need dependency it could be removed using passing to scope:
    //
    // ```
    // packageJson: {
    //    dependencies: {
    //      ejs: false
    //    }
    // }
    // ```
    //
    if (scope.packageJson.dependencies) {
      defaultPackageJSONContent.dependencies = _.omit(defaultPackageJSONContent.dependencies, function(value) {
        return value === false;
      });
    }
  }

  return _.defaults(scope.appPackageJSON || {}, defaultPackageJSONContent);
};

/**
 * getDependencyVersion
 *
 * @param  {Object} packageJSON
 * @param  {String} module
 * @return {String}
 * @api private
 */

function getDependencyVersion(packageJSON, module) {
  return (
    packageJSON.dependencies && packageJSON.dependencies[module] ||
    packageJSON.devDependencies && packageJSON.devDependencies[module] ||
    packageJSON.optionalDependencies && packageJSON.optionalDependencies[module]
  );
}
