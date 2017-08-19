/**
 * PerdiodoAcademicoController
 *
 * @description :: Server-side logic for managing Periodos Academicos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var dateFormat = require('dateformat');

module.exports = {
  crearPeriodoAcademico: function (req, res) {
    var parametros = req.allParams();
    console.log(parametros);
    if (parametros.estado &&
      parametros.nombre &&
      parametros.fechaInicio &&
      parametros.fechaFin) {
      var fechaInicio = new Date(parametros.fechaInicio);
      var fechaFin = new Date(parametros.fechaFin);
      nuevoPeriodoAcademico={
        fkIdUsuario:1,
        nombre:parametros.nombre,
        estado:parametros.estado,
        fechaInicio:fechaInicio,
        fechaFin:fechaFin
        };
      PerdiodoAcademico.create(nuevoPeriodoAcademico)
        .exec(function (error, periodoAcademicoNueno) {
          if (error) {
            console.log(error)
            return res.serverError(error);
          }
          else {
            return res.redirect("/periodos");
          }
        });
    }
    else {
      return res.badRequest();
    }
  },
  editarPeriodoAcademico: function (req, res) {
    var parametros = req.allParams();
    if (parametros.estado &&
      parametros.nombre &&
      parametros.fechaInicio &&
      parametros.fechaFin &&
      parametros.id) {
      var fechaInicio = new Date(parametros.fechaInicio);
      var fechaFin = new Date(parametros.fechaFin);
      periodoAcademicoModificar={
        estado:parametros.estado,
        nombre:nombre,
        fechaInicio:fechaInicio,
        fechaFin:fechaFin
      };
      PerdiodoAcademico.update({id:parametros.id},periodoAcademicoModificar)
        .exec(function (error, periodoAcademicoModificado) {
          if (error) {
            return res.serverError(error);
          }
          else {
            if(periodoAcademicoModificado){
              //Si encontro
              return res.redirect("/periodos")
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
  eliminarPeriodoAcademico: function (req, res) {
    var params = req.allParams();
    sails.log.info("Parametros", params);
    if (req.method == "POST" && params.id) {
      PeriodoAcademico.destroy({
        id: params.id
      }).exec(function (err, periodoAcademicoEliminado) {
        if (err) {
          return res.serverError(err);
        }
        else {
          if (periodoAcademicoEliminado) {
            //Si encontro
            return res.redirect("/periodos")
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
  inicioPeriodoAcademico: function (req, res) {
    var parametros = req.allParams();
    PerdiodoAcademico
      .find()
      .exec(function (err, periodos) {
        if (err)
          return res.negotiate(err);
        return res.view('GestionPeriodoAcademico/periodoAcademico', {
          periodos: periodos,
          dateFormat:dateFormat
        });
      });

  },
  irEditar: function (req, res) {
    var parametros = req.allParams();
    console.log(parametros);
    if (parametros.id) {
      PerdiodoAcademico.findOne({
        id: parametros.id
      })
        .exec(function (err, periodoAcademicoEncontrado) {
          if (err)
            return res.serverError(err);
          if (periodoAcademicoEncontrado) {
            //Si encontro
            return res.view('GestionPeriodoAcademico/editarPeriodoAcademico', {
              periodoAcademico: periodoAcademicoEncontrado,
              dateFormat:dateFormat
            });

          }
          else {
            //No encontro
            return res.redirect('/periodos');
          }
        });
    }
    else {
      return res.redirect('/periodos/crear');
    }
  },
  irCrear:function (req, res) {
    return res.view('GestionPeriodoAcademico/crearPeriodoAcademico')
  }
};

