/**
 * Materia.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre:{
      type:'string',
      required:true
    },
    descripcion:{
      type:'string',
      required:true
    },
    fkIdPeriodoAcademico:{
      model:'PerdiodoAcademico',
      required:true
    },
    horarios:{
      collection:'Horario',
      via:'fkIdMateria'
    },
    notificaciones:{
      collection:'Notificacion',
      viea:'fkIdMateria'
    }
  }
};

