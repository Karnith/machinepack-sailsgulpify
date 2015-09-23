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
    },

    doesNotExist: {
      friendlyName: 'does not exist',
      description: 'Nothing exists at the provided LESS source directory path.',
      example: 'abc123',
    }
  },

  fn: function(inputs, exits, env) {
    var path = require('path'),
      Filesystem = require('machinepack-fs');
    // Copy over gulp file.
    Filesystem.cp({
      source: path.resolve(__dirname, inputs.gulpFileSrcPath),
      destination: path.resolve(__dirname, inputs.outputDir)
    }).exec({
      error: function (err){
        console.error('an error occurred- error details:',err);
        return exits.error();
      },
      doesNotExist: function(gulpFileSrcPath) {
        console.log('could not locate gulp file at '+gulpFileSrcPath);
        return exits.error();
      },
      success: function() {
        return exits.success();
      }
    }); //</copy gulp file>
  }
};
