/**
 *  Gulp hook for sails
 *
 */

module.exports = function (sails) {

  /**
   * Module dependencies
   */

  var Err = require('../../../../sails/errors'),
    path  = require('path'),
    ChildProcess = require('child_process');


  return {


    /**
     * Initialize this project's Grunt tasks
     * and execute the environment-specific gulpfile
     *
     */
    initialize: function (cb) {

      sails.log.verbose('Loading app Gulpfile...');

      // Start task depending on environment
      if(sails.config.environment === 'production'){
        return this.runTask('prod', cb);
      }

      this.runTask('default', cb);
    },


    /**
     * Fork Gulp child process
     *
     * @param {String} taskName - grunt task to run
     * @param {Function} cb - optional, fires when the Grunt task has been started (non-production) or finished (production)
     */
    runTask: function (taskName, cb_afterTaskStarted) {

      cb_afterTaskStarted = cb_afterTaskStarted || function () {};

      var environment = sails.config.environment;
      var pathToSails = path.resolve(__dirname, '../../../');

      // Only relevant in a development environment:
      // (unfortunately, cannot use sails.getBaseurl() because it is not calculatable yet)
      var baseurl = 'http://' + (sails.config.host || 'localhost') + ':' + sails.config.port;

      if (!taskName) {
        taskName = '';
      }
      
      var execArgs = process.execArgv.slice(0);
      if(execArgs.indexOf('--debug') !== -1) {
        execArgs.splice(execArgs.indexOf('--debug'),1)
      }

      // Fork Grunt child process
      var child = ChildProcess.fork(

        // cwd for child process
        path.join(pathToSails,'../gulp/bin/gulp.js'),

        // cmd args+opts for child process
        [
          taskName,
          '--pathToSails='+pathToSails,

          // Backwards compatibility for v0.9.x
          '--gdsrc='+ pathToSails + '/node_modules'
        ],

        // opts to pass to node's `child_process` logic
        {
          silent: true,
          stdio: 'pipe',
          execArgv: execArgs
        }
      );


      var errorMsg = '';
      var stackTrace = '';

      // Log output as it comes in to the appropriate log channel
      child.stdout.on('data', function (consoleMsg) {

        // store all the output
        consoleMsg = consoleMsg.toString();
        errorMsg += consoleMsg;

        // Clean out all the whitespace
        var trimmedStackTrace = (typeof stackTrace === 'string') ? stackTrace : '';
        trimmedStackTrace = trimmedStackTrace.replace(/[\n\s]*$/,'');
        trimmedStackTrace = trimmedStackTrace.replace(/^[\n\s]*/,'');
        var trimmedConsoleMsg = (typeof consoleMsg === 'string') ? consoleMsg : '';
        trimmedConsoleMsg = trimmedConsoleMsg.replace(/[\n\s]*$/,'');
        trimmedConsoleMsg = trimmedConsoleMsg.replace(/^[\n\s]*/,'');

        // Remove '--force to continue' message since it makes no sense
        // in this context:
        trimmedConsoleMsg = trimmedConsoleMsg.replace(/Use --force to continue\./i, '');
        trimmedStackTrace = trimmedStackTrace.replace(/Use --force to continue\./i, '');

        // Find the Stack Trace related to this warning
        stackTrace = errorMsg.substring(errorMsg.lastIndexOf('Running "'));

        //     if (consoleMsg.match(/Use --force to continue/)) {
        // //   sails.log.warn('** Gulp :: Warning **');
        // //   sails.log.warn(errorMsg,trimmedStackTrace);
        // }

        // Handle fatal errors, like missing gulp dependency, etc.
        if (consoleMsg.match(/Fatal error/g)) {

          // If no Gulpfile exists, don't crash- just display a warning.
          if (consoleMsg.match(/Unable to find Gulpfile/i)) {
            sails.log.info('Gulptfile could not be found.');
            sails.log.info('(no gulp tasks will be run.)');
            return;
          }

          Err.fatal.__GulpAborted__(trimmedConsoleMsg, trimmedStackTrace);
          return;
        }

        // Handle fatal Gulp errors by killing Sails process as well
        if (consoleMsg.match(/Aborted due to warnings/)) {
          sails.log.error('** Gulp :: An error occurred. **');
          // sails.log.warn(trimmedStackTrace);
          // sails.emit('hook:gulp:error', trimmedStackTrace);
          Err.fatal.__GulpAborted__(trimmedConsoleMsg, trimmedStackTrace);
          return;
        }

        if (consoleMsg.match(/ParseError/)) {
          sails.log.warn('** Gulp :: Parse Warning **');
          sails.log.warn(trimmedStackTrace);
        }

        // Only display console message if it has content besides whitespace
        else if ( !consoleMsg.match(/^\s*$/) ) {
          sails.log.verbose('Gulp :: ' + trimmedConsoleMsg);
        }
      });

      // Handle general-case gulp output:
      child.stdout.on('error', function (gulpOutput) {
        sails.log.error('Gulp ::', _sanitize(gulpOutput));
      });
      child.stderr.on('data', function (gulpOutput) {
        gulpOutput = _sanitize(gulpOutput);
        // Ignore the "debugger listening" message from node --debug
        if (gulpOutput.match(/debugger listening on port/)) {
          return;
        }
        sails.log.error('Gulp ::', gulpOutput);
      });
      child.stderr.on('error', function (gulpOutput) {
        sails.log.error('Gulp ::', _sanitize(gulpOutput));
      });

      // When process is complete, fire event on `sails`
      child.on('exit', function (code, s) {
        if ( code !== 0 ) return sails.emit('hook:gulp:error');
        sails.emit('hook:gulp:done');

        // Fire finish after gulp is done in production
        if(sails.config.environment === 'production'){
          cb_afterTaskStarted();
        }
      });

      // Since there's likely a watch task involved, and we may need
      // to flush the whole thing, we need a way to grab hold of the child process
      // So we save a reference to it
      sails.log.verbose('Tracking new gulp child process...');
      sails.childProcesses.push(child);

      // Go ahead and get out of here, since Gulp might sit there backgrounded
      if(sails.config.environment !== 'production'){
        cb_afterTaskStarted();
      }
    }
  };
};


/**
 * After ensuring a chunk is a string, trim any leading or
 * trailing whitespace.  If chunk cannot be nicely casted to a string,
 * pass it straight through.
 *
 * @param  {*} chunk
 * @return {*}
 */
function _sanitize (chunk) {

  if (chunk && typeof chunk === 'object' && chunk.toString) {
    chunk = chunk.toString();
  }
  if (typeof chunk === 'string') {
    chunk = chunk.replace(/^[\s\n]*/, '');
    chunk = chunk.replace(/[\s\n]*$/, '');
  }
  return chunk;
}
