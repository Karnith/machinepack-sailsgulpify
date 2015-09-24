var SailsGulpify = require('machinepack-sailsgulpify'),
    Prompts = require('machinepack-prompts');

Prompts.text({
  message: "For first time configuration, enter gulpifysails. To switch engines, please enter gulp for gulp engine or grunt for grunt engine.",
  exampleValue: 'gulp'
}).exec({
  error: function (err){
    console.error('Unexpected error interpeting interactive prompt input:', err);
    return process.exit(1);
  },
  // OK- got user input.
  success: function (userInput){
    var toggle = userInput.toLowerCase();
    if(toggle === 'gulp'){
      SailsGulpify.toggleSailsrc({
        gulp: toggle,
        sailsrcSrc: '../json/gulp.sailsrc',
        outputDir: '../../../.sailsrc'
      }).exec({
        error: function (err){
          console.error('There was an error toggling gulp: ',err);
          return process.exit(1);
        },
        success: function (){
          console.log('Done. Sails now using gulp');
          return process.exit(0);
        }
      });
    }
    else if(toggle === 'grunt') {
      SailsGulpify.toggleSailsrc({
        grunt: toggle,
        sailsrcSrc: '../json/grunt.sailsrc',
        outputDir: '../../../.sailsrc'
      }).exec({
        error: function (err){
          console.error('There was an error toggling grunt:  ',err);
          return process.exit(1);
        },
        success: function (){
          console.log('Done. Sails now using grunt');
          return process.exit(0);
        }
      });
    }
    else if(toggle === 'gulpifysails') {
      SailsGulpify.sailsGulpify().exec({
        error: function (err){
          console.error('could not load json file- error details:',err);
          return process.exit(1);
        },
        success: function (){
          console.log('Done. Sails now gulpified');
          return process.exit(0);
        }
      });
    }
    else {
      console.log('Invalid option, please try again.');
    }
  }
});
