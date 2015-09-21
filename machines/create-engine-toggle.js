module.exports = {


  friendlyName: 'Create engine toggle',


  description: 'Modifies core sails files ading the ability to toggle between grunt and gulp via cli argument',


  extendedDescription: 'Use --engine=<gulp|grunt> to create project with that engine',


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