var Prompts = require('machinepack-prompts');

module.exports = {
  friendlyName: 'Sails Gulpify',
  description: 'Main Machine that combine all other machines in the pack to gulpify sails',
  extendedDescription: 'This machine will either install / configure everything on first run or reconfigure sails when sails project node module has been updated.',
  cacheable: false,
  sync: false,
  environment: [],

  inputs: {
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
      createGulpEngine = require('machine').build(require('./create-gulp-engine')),
      toggleSailsrc = require('machine').build(require('./toggle-sailsrc')),
      installGulpDependencies = require('machine').build(require('./install-gulp-dependencies'));

    Prompts.text({
      message: "For first time configuration, enter yes, otherwise enter no if sails node module was upgraded.",
      exampleValue: 'yes'
    }).exec({
      error: function (err){
        console.error('Unexpected error interpeting interactive prompt input:', err);
        return process.exit(1);
      },
      // OK- got user input.
      success: function (userInput){
        var firstTimeRun = userInput.toLowerCase();
        if(firstTimeRun === 'yes'){
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
                  createGulpEngine({
                    gulpFolderSrcPath: '../lib/gulp',
                    outputDir: '../../sails/lib/hooks/gulp'
                    //outputDir: '../../../api/hooks/gulp'
                  }).exec({
                    error: function (err){
                      console.error('an error occurred- error details:',err);
                      return exits.error();
                    },
                    invalid: function (){ exits.invalid() },
                    success: function() {
                      // return exits.success();
                      toggleSailsrc({
                        sailsrcSrc: '../json/gulp.sailsrc',
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
        else if(firstTimeRun === 'no') {
          createGulpEngine({
            gulpFolderSrcPath: '../lib/gulp',
            outputDir: '../../sails/lib/hooks/gulp'
            //outputDir: '../../../api/hooks/gulp'
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
      }
    });
  }
};
