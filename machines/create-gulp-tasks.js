module.exports = {
  friendlyName: 'Create gulp tasks',
  description: 'Creates the gulp task folder and all related task files',
  extendedDescription: '',
  cacheable: false,
  sync: false,
  environment: [],

  inputs: {

    gulpFolderSrcPath: {
      friendlyName: 'Gulp file source path',
      description: 'The directory where the gulp file lives.  If not specified as an absolute path, this will be resolved relative to the current working directory.',
      example: './templates/gulpfile.js',
      required: true
    },

    outputFolderDir: {
      friendlyName: 'Output directory',
      description: 'The path to the directory where gulp file should be placed.',
      example: './foo',
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
      example: 'abc123'
    }
  },

  fn: function(inputs, exits, env) {
    var path = require('path'),
      cp = require('machine').build(require('./copy-files'));

    cp({
      gulpFileSrcPath: path.resolve(__dirname, inputs.gulpFolderSrcPath),
      outputDir: path.resolve(__dirname, inputs.outputFolderDir)
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
