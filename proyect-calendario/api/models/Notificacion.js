/**
 * Notificacion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    descripcion: {
      type: 'string',
      required: true
    },
    fechaNotificacion: {
      type: "datetime",
      required:true
    },
    fkIdMateria:{
      model:'Materia',
      required:true
    },
    estado:{
      type:'string',
      enum:['En progreso','Realizada'],
      defaultsTo:'En progreso',
      required:true
    }
  }
};

