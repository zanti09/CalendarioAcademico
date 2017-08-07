/**
 * HorarioController
 *
 * @description :: Server-side logic for managing Horarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var dateFormat = require('dateformat');

module.exports = {
  crearHorario: function (req, res) {
    var parametros = req.allParams();
    console.log(parametros);
    if (parametros.dia &&
      parametros.horaInicio &&
      parametros.horaFin &&
    parametros.fkIdMateria) {
      var horaInicio = new Date();
      var strHoraInicio = parametros.horaInicio.split(':');
      horaInicio.setHours(strHoraInicio[0], strHoraInicio[1], 0);
      var horaFin = new Date();
      var strHoraFin = parametros.horaFin.split(':');
      horaFin.setHours(strHoraFin[0], strHoraFin[1], 0);
      nuevoHorario={
        dia:parametros.dia,
        horaInicio:horaInicio,
        horaFin:horaFin,
        fkIdMateria:parametros.fkIdMateria
      };
      Horario.create(nuevoHorario)
        .exec(function (error, horarioNueno) {
          if (error) {
            console.log(error)
            return res.serverError(error);
          }
          else {
            return res.redirect("/horarios");
          }
        });
    }
    else {
      return res.badRequest();
    }
  },
  editarHorario: function (req, res) {
    var parametros = req.allParams();
    if (parametros.dia &&
      parametros.horaInicio &&
      parametros.horaFin &&
      parametros.fkIdMateria &&
      parametros.id) {
      var horaInicio = new Date();
      var strHoraInicio = parametros.horaInicio.split(':');
      horaInicio.setHours(strHoraInicio[0], strHoraInicio[1], 0);
      var horaFin = new Date();
      var strHoraFin = parametros.horaFin.split(':');
      horaFin.setHours(strHoraFin[0], strHoraFin[1], 0);
      horarioModificar={
        dia:parametros.dia,
        horaInicio:horaInicio,
        horaFin:horaFin,
        fkIdMateria:parametros.fkIdMateria
      };
      Horario.update({id:parametros.id},horarioModificar)
        .exec(function (error, horarioModificado) {
          if (error) {
            return res.serverError(error);
          }
          else {
            if(horarioModificado){
              //Si encontro
              return res.redirect("/horarios")
            }else{
              //No encontro
              return res.notFound()
            }
          }
        });
    }
    else {
      return res.badRequest();
    }
  },
  eliminarHorario: function (req, res) {
    var params = req.allParams();
    sails.log.info("Parametros", params);
    if (req.method == "POST" && params.id) {
      Horario.destroy({
        id: params.id
      }).exec(function (err, horarioEliminado) {
        if (err) {
          return res.serverError(err);
        }
        else {
          if (horarioEliminado) {
            //Si encontro
            return res.redirect("/horarios")
          } else {
            //No encontro
            return res.notFound()
          }
        }
      });
    }
    else {
      return res.badRequest();
    }
  },
  inicioHorario: function (req, res) {
    var parametros = req.allParams();
    Horario
      .find()
      .populate('fkIdMateria')
      .exec(function (err, horarios) {
        if (err)
          return res.negotiate(err);
        console.log(horarios);
        return res.view('GestionHorarios/horario', {
          horarios: horarios,
          dateFormat:dateFormat
        });
      });
    /*PerdiodoAcademico.find({estado:'En curso',fkIdUsuario:parametros.fkIdUsuario }).exec(function (err, periodoacemico) {
     if (err)
     return res.negotiate(err);

     return res.view('GestionMaterias/materia')

     /*Materia
     .find({
     fkIdPeriodoAcademico:periodoacemico[0].id
     })
     .exec(function (err, materias) {
     if (err)
     return res.negotiate(err);
     return res.view('GestionMaterias/materia', {
     materias: materias
     });
     });
     });*/

  },
  irEditar: function (req, res) {
    var parametros = req.allParams();
    console.log(parametros);
    if (parametros.id) {
      Horario.findOne({
        id: parametros.id
      })
        .exec(function (err, horarioEncontrado) {
          if (err)
            return res.serverError(err);
          if (horarioEncontrado) {
            //Si encontro
            Materia
              .find()
              .exec(function (err, materias) {
                if (err)
                  return res.negotiate(err);
                return res.view('GestionHorarios/editarHorario', {
                  horario: horarioEncontrado,
                  materias:materias,
                  dateFormat:dateFormat
                });
              });

          }
          else {
            //No encontro
            return res.redirect('/horarios');
          }
        });
    }
    else {
      return res.redirect('/horarios/crear');
    }
  },
  irCrear:function (req, res) {
    Materia
      .find()
      .exec(function (err, materias) {
        if (err)
          return res.negotiate(err);
        return res.view('GestionHorarios/crearHorario', {
          materias: materias
        });
      });

  }
};

