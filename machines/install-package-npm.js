module.exports = {
  friendlyName: 'Install Package npm',
  description: 'NPM install and --save',
  extendedDescription: 'Saves npm packages',
  cacheable: false,
  sync: false,

  inputs: {
    name: {
      friendlyName: 'Package name',
      description: 'The name of the NPM package to install.',
      extendedDescription: 'Can also be a custom url to a package.',
      example: 'express',
      required: true,
    },

    version: {
      friendlyName: 'Version range',
      description: 'A version string (or semver range) of the NPM package to install.',
      example: '~1.0.0',
      defaultsTo: '*'
    },

    dir: {
      friendlyName: 'Directory',
      description: 'The local path where the package should be installed as a dependency.',
      extendedDescription: 'This is to the local package itself-- NOT its node_modules folder! Also note that, if specified as a relative path, this will be resolved relative to the current working directory.  If unspecified, the current working directory will be used.',
      example: '/Users/mikermcneil/dogfood-promo-site'
    },

    save: {
      friendlyName: 'Save dependency?',
      description: 'If set, the installed package will be saved to the package.json file as a dependency.',
      extendedDescription: 'This runs `npm install` with the --save flag enabled.',
      example: true,
      defaultsTo: false
    },

    saveDev: {
      friendlyName: 'Save dev dependency?',
      description: 'If set, the installed package will be saved to the package.json file as a development-only dependency.',
      extendedDescription: 'This runs `npm install` with the --save-dev flag enabled.',
      example: true,
      defaultsTo: false
    },

    prefix: {
      friendlyName: 'Prefix',
      description: 'An optional path prefix which affects the root path in which this NPM package gets installed.',
      extendedDescription: 'Note that the package will still be installed within node_modules of the destination directory. This just controls the `--prefix` command-line option passed to `npm install`.',
      example: './path-to-project'
    },

    loglevel: {
      friendlyName: 'Log level',
      description: 'If set, NPM will write logs to the console at the specified log level.',
      extendedDescription: 'This controls the --loglevel flag passed to `npm install`. Available options are "silent", "warn", "verbose" and "silly".',
      example: 'warn',
      defaultsTo: 'silent'
    }  },

  exits: {
    error: {
      friendlyName: 'error',
      description: 'Unexpected error occurred.'
    },

    success: {
      description: 'Package successfully installed.'
    },

    invalidSemVer: {
      description: 'Provided semver range is invalid. See https://docs.npmjs.com/misc/semver for more information.'
    }
  },


  fn: function(inputs, exits, env) {
    var path = require('path'),
      npm = require('machinepack-npm');

    npm.installPackage({
      name: inputs.name,
      version: inputs.version,
      dir: path.resolve(__dirname, inputs.dir),
      //dir: path.resolve(__dirname, '../../../node_modules'),
      save: inputs.save,
      loglevel: inputs.loglevel
    }).exec({
      // An unexpected error occurred.
      error: function (err){
        console.error('an error occurred- error details:',err);
        return exits.error();
      },
      // Provided semver range is invalid. See https://docs.npmjs.com/misc/semver for more information.
      invalidSemVer: function (){
        return exits.invalidSemVer();
      },
      // OK.
      success: function (){
        console.log('Installed '+inputs.name);
        return exits.success();
      }
    });
  }
};
