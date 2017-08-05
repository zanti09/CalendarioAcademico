/**
 * PerdiodoAcademicoController
 *
 * @description :: Server-side logic for managing Perdiodoacademicoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  crearPeriodoAcademico: function (req, res) {
    var parametros = req.allParams();
    sails.log.info("Parametros", parametros);
    var nuevoPeriodoAcademico = {
      nombre: parametros.nombre,
      fechaInicio: parametros.fechaInicio,
      fechaFin: parametros.fechaFin,
      estado: parametros.estado,
      fkIdUsuario: parametros.fkIdUsuario
    };

    PerdiodoAcademico.create(nuevoPeriodoAcademico)
      .exec(function (error, periodoAcademicoCreado) {
        if (error) {
          return res.serverError(error);
        }
        else {
          console.log(periodoAcademicoCreado);
        }
      });
  },
  eliminarPeriodoAcademico: function (req, res) {
    var params = req.allParams();
    sails.log.info("Parametros", params);
    if (req.method == "POST" && params.id) {
      PerdiodoAcademico.destroy({
        id: params.id
      }).exec(function (err, periodoAcademicoBorrado) {
        if (err)
          return res.serverError(err);
        return res.redirect("/");
      });
    }
    else {
      return res.badRequest();
    }
  },
  editarPeriodoAcademico: function (req, res) {
    var parametros = req.allParams();
    if (parametros.nombre &&
      parametros.fechaInicio &&
      parametros.fechaFin &&
      parametros.estado &&
      parametros.fkIdUsuario) {
      PerdiodoAcademico.update({
        id: parametros.id
      }, {
        nombre: parametros.nombre,
        fechaInicio: parametros.fechaInicio,
        fechaFin: parametros.fechaFin,
        estado: parametros.estado,
        fkIdUsuario: parametros.fkIdUsuario
      })
        .exec(function (err, periodoAcademicoEditado) {
          if (err)
            return res.serverError(err);
          if (periodoAcademicoEditado) {
            //Si encontro
            return res.redirect("/");
          }
          else {
            //No encontro
            return res.notFound();
          }
        });
    }
    else {
      return res.badRequest();
    }
  },
  listarPeriodoAcademico: function (req, res) {
    PerdiodoAcademico.find({fkIdUsuario:1}).exec(function (err,usersNamedFinn){
      if (err) {
        return res.serverError(err);
      }
      sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
      return res.json(usersNamedFinn);
    });}
};


