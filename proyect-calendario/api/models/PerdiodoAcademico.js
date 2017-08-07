/**
 * PerdiodoAcademico.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre: {
      type: 'string',
      required: true
    },
    fechaInicio: {
      type: "date",
      required: true
    },
    fechaFin: {
      type: "date",
      required: true
    },
    materias:{
      collection:'Materia',
      via:'fkIdPeriodoAcademico'
    },
    estado: {
      type: 'string',
      enum: ['En curso', 'Concretado'],
      defaultsTo: 'En curso',
      required:true
    },
    fkIdUsuario:{
      model:'User',
      required:true
    }
  }
};

