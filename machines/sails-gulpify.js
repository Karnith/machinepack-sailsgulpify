module.exports = {
  friendlyName: 'Sails Gulpify',
  description: 'Main Machine that combine all other machines in the pack to gulpify sails',
  extendedDescription: 'This machine should be used only for new projects. If files need to be fixed / replaced / updated use the individual machines instead.',
  cacheable: false,
  sync: false,
  environment: [],

  inputs: {
    gulp: {
      friendlyName: 'Use Gulp engine',
      description: 'Toggle for the gulp engine',
      example: 'gulp',
      required: false
    },

    grunt: {
      friendlyName: 'Use Grunt engine',
      description: 'toggle for the grunt engine',
      example: 'grunt',
      required: false
    }
  },

  exits: {

    error: {
      friendlyName: 'error',
      description: 'Unexpected error occurred.'
    },

    success: {
      friendlyName: 'then',
      description: 'Normal outcome.',
      void: true
    },

    invalid: {
      friendlyName: 'Invalid',
      description: 'Nothing exists at the provided directory path.',
      example: 'abc123'
    }
  },


  fn: function(inputs, exits, env) {
    var createGulpFile = require('machine').build(require('./create-gulp-file')),
      createGulpTasks = require('machine').build(require('./create-gulp-tasks')),
      createEngineToggle = require('machine').build(require('./create-engine-toggle')),
      toggleSailsrc = require('machine').build(require('./toggle-sailsrc')),
      installGulpDependencies = require('machine').build(require('./install-gulp-dependencies'));

    createGulpFile({
      gulpFileSrcPath: '../templates/gulpfile.js',
      outputDir: '../../../gulpfile.js'
    }).exec({
      error: function (err){
        console.error('an error occurred- error details:',err);
        return exits.error();
      },
      invalid: function (){ exits.invalid() },
      success: function() {
        createGulpTasks({
          gulpFolderSrcPath: '../templates/tasks-gulp',
          outputFolderDir: '../../../tasks-gulp'
        }).exec({
          error: function (err){
            console.error('an error occurred- error details:',err);
            return exits.error();
          },
          invalid: function (){ exits.invalid() },
          success: function() {
            createEngineToggle({
              gulpFolderSrcPath: '../lib/gulp',
              outputDir: '../../../api/hooks/gulp'
            }).exec({
              error: function (err){
                console.error('an error occurred- error details:',err);
                return exits.error();
              },
              invalid: function (){ exits.invalid() },
              success: function() {
                // return exits.success();
                toggleSailsrc({
                  sailsrcSrc: '../json/.sailsrc',
                  outputDir: '../../../.sailsrc'
                }).exec({
                  error: function (err){
                    console.error('an error occurred- error details:',err);
                    return exits.error();
                  },
                  invalid: function (){ exits.invalid() },
                  success: function() {
                    // return exits.success();
                    installGulpDependencies({
                    }).exec({
                      error: function (err){
                        console.error('an error occurred- error details:',err);
                        return exits.error();
                      },
                      invalid: function (){ exits.invalid() },
                      success: function() {
                        return exits.success();
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
};
