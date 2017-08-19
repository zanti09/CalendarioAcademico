/**
 * HorarioController
 *
 * @description :: Server-side logic for managing Horarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var dateFormat = require('dateformat');

module.exports = {
  crearNotificacion: function (req, res) {
    var parametros = req.allParams();
    console.log(parametros);
    if (parametros.estado &&
      parametros.fechaNotificacion &&
      parametros.descripcion &&
      parametros.fkIdMateria) {
      var fechaNotificacion = new Date(parametros.fechaNotificacion);
      fechaNotificacion.setHours(fechaNotificacion.getHours()+5);
      nuevaNotificacion={
        estado:parametros.estado,
        fechaNotificacion:fechaNotificacion,
        descripcion:parametros.descripcion,
        fkIdMateria:parametros.fkIdMateria
      };
      Notificacion.create(nuevaNotificacion)
        .exec(function (error, notificacionNueno) {
          if (error) {
            console.log(error)
            return res.serverError(error);
          }
          else {
            return res.redirect("/notificaciones");
          }
        });
    }
    else {
      return res.badRequest();
    }
  },
  editarNotificacion: function (req, res) {
    var parametros = req.allParams();
    if (parametros.estado &&
      parametros.fechaNotificacion &&
      parametros.description &&
      parametros.fkIdMateria &&
      parametros.id) {
      var fechaNotificacion = new Date(parametros.fechaNotificacion);
      notificacionModificar={
        estado:parametros.estado,
        fechaNotificacion:fechaNotificacion,
        description:description,
        fkIdMateria:parametros.fkIdMateria
      };
      Notificacion.update({id:parametros.id},notificacionModificar)
        .exec(function (error, notificacionModificado) {
          if (error) {
            return res.serverError(error);
          }
          else {
            if(notificacionModificado){
              //Si encontro
              return res.redirect("/notificaciones")
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
  eliminarNotificacion: function (req, res) {
    var params = req.allParams();
    sails.log.info("Parametros", params);
    if (req.method == "POST" && params.id) {
      Notificacion.destroy({
        id: params.id
      }).exec(function (err, notificacionEliminado) {
        if (err) {
          return res.serverError(err);
        }
        else {
          if (notificacionEliminado) {
            //Si encontro
            return res.redirect("/notificaciones")
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
  inicioNotificacion: function (req, res) {
    var parametros = req.allParams();
    Notificacion
      .find()
      .populate('fkIdMateria')
      .exec(function (err, notificaciones) {
        if (err)
          return res.negotiate(err);
        return res.view('GestionNotificaciones/notificacion', {
          notificaciones: notificaciones,
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
      Notificacion.findOne({
        id: parametros.id
      })
        .exec(function (err, notificacionEncontrado) {
          if (err)
            return res.serverError(err);
          if (notificacionEncontrado) {
            //Si encontro
            Materia
              .find()
              .exec(function (err, materias) {
                if (err)
                  return res.negotiate(err);
                return res.view('GestionNotificaciones/editarNotificacion', {
                  notificacion: notificacionEncontrado,
                  materias:materias,
                  dateFormat:dateFormat
                });
              });

          }
          else {
            //No encontro
            return res.redirect('/notificaciones');
          }
        });
    }
    else {
      return res.redirect('/notificaciones/crear');
    }
  },
  irCrear:function (req, res) {
    Materia
      .find()
      .exec(function (err, materias) {
        if (err)
          return res.negotiate(err);
        return res.view('GestionNotificaciones/crearNotificacion', {
          materias: materias
        });
      });

  }
};

