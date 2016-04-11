module.exports = {
  friendlyName: 'Install gulp dependencies',
  description: 'Adds gulp dependencies to the projects packasge.json',
  extendedDescription: 'Install dependencies',
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

    invalidSemVer: {
      description: 'Provided semver range is invalid. See https://docs.npmjs.com/misc/semver for more information.'    }
  },


  fn: function(inputs, exits, env) {
    var installPackage = require('machine').build(require('./install-package-npm')),
        packages = [
          'gulp',
          'gulp-autoprefixer',
          'gulp-cache',
          'gulp-changed',
          'gulp-coffee',
          'gulp-concat',
          'gulp-if',
          'gulp-imagemin',
          'gulp-jade',
          'gulp-jshint',
          'gulp-less',
          'gulp-inject',
          'gulp-livereload',
          'gulp-load-plugins',
          'gulp-minify-css',
          'gulp-notify',
          'gulp-rename',
          'gulp-rimraf',
          'gulp-sass',
          'gulp-template-compile',
          'gulp-uglify',
          'gulp-util',
          'rimraf',
          'run-sequence'
        ];

    installPackage({
      name: packages[0],
      version: '*',
      dir: '../../../node_modules',
      save: true
    }).exec({
      error: function (err){
        console.error('an error occurred- error details:',err);
        return exits.error();
      },
      success: function() {
        //return exits.success();
        console.log('Installing '+packages[1]);
        installPackage({
          name: packages[1],
          version: '*',
          dir: '../../../node_modules',
          save: true
        }).exec({
          error: function (err){
            console.error('an error occurred- error details:',err);
            return exits.error();
          },
          success: function() {
            //return exits.success();
            installPackage({
              name: packages[2],
              version: '*',
              dir: '../../../node_modules',
              save: true
            }).exec({
              error: function (err){
                console.error('an error occurred- error details:',err);
                return exits.error();
              },
              success: function() {
                //return exits.success();
                installPackage({
                  name: packages[3],
                  version: '*',
                  dir: '../../../node_modules',
                  save: true
                }).exec({
                  error: function (err){
                    console.error('an error occurred- error details:',err);
                    return exits.error();
                  },
                  success: function() {
                    //return exits.success();
                    installPackage({
                      name: packages[4],
                      version: '*',
                      dir: '../../../node_modules',
                      save: true
                    }).exec({
                      error: function (err){
                        console.error('an error occurred- error details:',err);
                        return exits.error();
                      },
                      success: function() {
                        //return exits.success();
                        installPackage({
                          name: packages[5],
                          version: '*',
                          dir: '../../../node_modules',
                          save: true
                        }).exec({
                          error: function (err){
                            console.error('an error occurred- error details:',err);
                            return exits.error();
                          },
                          success: function() {
                            //return exits.success();
                            installPackage({
                              name: packages[6],
                              version: '*',
                              dir: '../../../node_modules',
                              save: true
                            }).exec({
                              error: function (err){
                                console.error('an error occurred- error details:',err);
                                return exits.error();
                              },
                              success: function() {
                                //return exits.success();
                                installPackage({
                                  name: packages[7],
                                  version: '*',
                                  dir: '../../../node_modules',
                                  save: true
                                }).exec({
                                  error: function (err){
                                    console.error('an error occurred- error details:',err);
                                    return exits.error();
                                  },
                                  success: function() {
                                    //return exits.success();
                                    installPackage({
                                      name: packages[8],
                                      version: '*',
                                      dir: '../../../node_modules',
                                      save: true
                                    }).exec({
                                      error: function (err){
                                        console.error('an error occurred- error details:',err);
                                        return exits.error();
                                      },
                                      success: function() {
                                        //return exits.success();
                                        installPackage({
                                          name: packages[9],
                                          version: '*',
                                          dir: '../../../node_modules',
                                          save: true
                                        }).exec({
                                          error: function (err){
                                            console.error('an error occurred- error details:',err);
                                            return exits.error();
                                          },
                                          success: function() {
                                            //return exits.success();
                                            installPackage({
                                              name: packages[10],
                                              version: '*',
                                              dir: '../../../node_modules',
                                              save: true
                                            }).exec({
                                              error: function (err){
                                                console.error('an error occurred- error details:',err);
                                                return exits.error();
                                              },
                                              success: function() {
                                                //return exits.success();
                                                installPackage({
                                                  name: packages[11],
                                                  version: '*',
                                                  dir: '../../../node_modules',
                                                  save: true
                                                }).exec({
                                                  error: function (err){
                                                    console.error('an error occurred- error details:',err);
                                                    return exits.error();
                                                  },
                                                  success: function() {
                                                    //return exits.success();
                                                    installPackage({
                                                      name: packages[12],
                                                      version: '*',
                                                      dir: '../../../node_modules',
                                                      save: true
                                                    }).exec({
                                                      error: function (err){
                                                        console.error('an error occurred- error details:',err);
                                                        return exits.error();
                                                      },
                                                      success: function() {
                                                        //return exits.success();
                                                        installPackage({
                                                          name: packages[13],
                                                          version: '*',
                                                          dir: '../../../node_modules',
                                                          save: true
                                                        }).exec({
                                                          error: function (err){
                                                            console.error('an error occurred- error details:',err);
                                                            return exits.error();
                                                          },
                                                          success: function() {
                                                            //return exits.success();
                                                            installPackage({
                                                              name: packages[14],
                                                              version: '*',
                                                              dir: '../../../node_modules',
                                                              save: true
                                                            }).exec({
                                                              error: function (err){
                                                                console.error('an error occurred- error details:',err);
                                                                return exits.error();
                                                              },
                                                              success: function() {
                                                                //return exits.success();
                                                                installPackage({
                                                                  name: packages[15],
                                                                  version: '*',
                                                                  dir: '../../../node_modules',
                                                                  save: true
                                                                }).exec({
                                                                  error: function (err){
                                                                    console.error('an error occurred- error details:',err);
                                                                    return exits.error();
                                                                  },
                                                                  success: function() {
                                                                    //return exits.success();
                                                                    installPackage({
                                                                      name: packages[16],
                                                                      version: '*',
                                                                      dir: '../../../node_modules',
                                                                      save: true
                                                                    }).exec({
                                                                      error: function (err){
                                                                        console.error('an error occurred- error details:',err);
                                                                        return exits.error();
                                                                      },
                                                                      success: function() {
                                                                        //return exits.success();
                                                                        installPackage({
                                                                          name: packages[17],
                                                                          version: '*',
                                                                          dir: '../../../node_modules',
                                                                          save: true
                                                                        }).exec({
                                                                          error: function (err){
                                                                            console.error('an error occurred- error details:',err);
                                                                            return exits.error();
                                                                          },
                                                                          success: function() {
                                                                            //return exits.success();
                                                                            installPackage({
                                                                              name: packages[18],
                                                                              version: '*',
                                                                              dir: '../../../node_modules',
                                                                              save: true
                                                                            }).exec({
                                                                              error: function (err){
                                                                                console.error('an error occurred- error details:',err);
                                                                                return exits.error();
                                                                              },
                                                                              success: function() {
                                                                                //return exits.success();
                                                                                installPackage({
                                                                                  name: packages[19],
                                                                                  version: '*',
                                                                                  dir: '../../../node_modules',
                                                                                  save: true
                                                                                }).exec({
                                                                                  error: function (err){
                                                                                    console.error('an error occurred- error details:',err);
                                                                                    return exits.error();
                                                                                  },
                                                                                  success: function() {
                                                                                    //return exits.success();
                                                                                    installPackage({
                                                                                      name: packages[20],
                                                                                      version: '*',
                                                                                      dir: '../../../node_modules',
                                                                                      save: true
                                                                                    }).exec({
                                                                                      error: function (err){
                                                                                        console.error('an error occurred- error details:',err);
                                                                                        return exits.error();
                                                                                      },
                                                                                      success: function() {
                                                                                        //return exits.success();
                                                                                        installPackage({
                                                                                          name: packages[21],
                                                                                          version: '*',
                                                                                          dir: '../../../node_modules',
                                                                                          save: true
                                                                                        }).exec({
                                                                                          error: function (err){
                                                                                            console.error('an error occurred- error details:',err);
                                                                                            return exits.error();
                                                                                          },
                                                                                          success: function() {
                                                                                            //return exits.success();
                                                                                            installPackage({
                                                                                              name: packages[22],
                                                                                              version: '*',
                                                                                              dir: '../../../node_modules',
                                                                                              save: true
                                                                                            }).exec({
                                                                                              error: function (err){
                                                                                                console.error('an error occurred- error details:',err);
                                                                                                return exits.error();
                                                                                              },
                                                                                              success: function() {
                                                                                                //return exits.success();
                                                                                                installPackage({
                                                                                                  name: packages[23],
                                                                                                  version: '*',
                                                                                                  dir: '../../../node_modules',
                                                                                                  save: true
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
            });
          }
        });
      }
    });

    //for (var i = 0; i <= packages.length; i++) {
      //  installPackage({
      //    name: package,
      //    version: '*',
      //    dir: '../../../node_modules',
      //    save: true
      //  }).exec({
      //    error: function (err){
      //      console.error('an error occurred- error details:',err);
      //      return exits.error();
      //    },
      //    success: function() {
      //      return exits.success();
      //    }
      //  });
      //}
    //packages.forEach(function(package, cb){
    //  installPackage({
    //    name: package,
    //    version: '*',
    //    dir: '../../../node_modules',
    //    save: true
    //  }).exec({
    //    error: function (err){
    //      console.error('an error occurred- error details:',err);
    //      return exits.error();
    //    },
    //    success: function() {
    //      exits.success()
    //      return cb;
    //    }
    //  });
    //});
  }
};
