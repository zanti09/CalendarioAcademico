/**
 * Horario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    dia: {
      type: 'integer',
      required: true
    },
    horaInicio: {
      type: 'datetime',
      required: true
    },
    horaFin: {
      type: 'datetime',
      required: true
    },
    fkIdMateria: {
      model:'Materia',
      required:true
    }
  }
};

