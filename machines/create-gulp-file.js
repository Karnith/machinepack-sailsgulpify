module.exports = {
  friendlyName: 'Create Gulp File',
  description: 'Creates a gulp file from template in the root project directory',
  extendedDescription: '',
  cacheable: false,
  sync: false,
  environment: [],

  inputs: {

    gulpFileSrcPath: {
      friendlyName: 'Gulp file source path',
      description: 'The directory where the gulp file lives.  If not specified as an absolute path, this will be resolved relative to the current working directory.',
      example: '../templates/gulpfile.js',
      required: true
    },

    outputDir: {
      friendlyName: 'Output directory',
      description: 'The path to the directory where gulp file should be placed.',
      example: '../../../gulpfile.js',
      required: true
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
    }
  },

  fn: function(inputs, exits, env) {
    var path = require('path'),
      cp = require('machine').build(require('./copy-files'));

    cp({
      gulpFileSrcPath: path.resolve(__dirname, inputs.gulpFileSrcPath),
      outputDir: path.resolve(__dirname, inputs.outputDir)
    }).exec({
      error: function (err){
        console.error('an error occurred- error details:',err);
        return exits.error();
      },
      success: function() {
        return exits.success();
      }
    });
  }
};
