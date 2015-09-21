module.exports = {


  friendlyName: 'Create gulp tasks',


  description: 'Creates the gulp task folder and all related task files',


  cacheable: false,


  sync: false,


  inputs: {

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function(inputs, exits
    /**/
  ) {
    return exits.success();
  },



};