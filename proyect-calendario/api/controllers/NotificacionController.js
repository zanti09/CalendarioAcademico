/**
 * NotificacionController
 *
 * @description :: Server-side logic for managing Notificacions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  crearNotificacion: function (req, res) {
    var parametros = req.allParams();
    sails.log.info("Parametros", parametros);
    var nuevaNotificacion = {
      descripcion: parametros.descripcion,
      fechaNotificacion: parametros.fechaNotificacion,
      estado: parametros.estado,
      fkIdMateria: parametros.fkIdMateria
    };

    Notificacion.create(nuevaNotificacion)
      .exec(function (error, notificacionCreada) {
        if (error) {
          return res.serverError(error);
        }
        else {
          console.log(notificacionCreada);

        }
      });
  },
  eliminarNotificacion: function (req, res) {
    var params = req.allParams();
    sails.log.info("Parametros", params);
    if (req.method == "POST" && params.id) {
      Notificacion.destroy({
        id: params.id
      }).exec(function (err, notificacionBorrado) {
        if (err)
          return res.serverError(err);
        return res.redirect("/");
      });
    }
    else {
      return res.badRequest();
    }
  },
  editarNotificacion: function (req, res) {
    var parametros = req.allParams();
    if (parametros.descripcion &&
      parametros.fechaNotificacion &&
      parametros.fkIdMateria &&
      parametros.id) {
      Notificacion.update({
        id: parametros.id
      }, {
        descripcion: parametros.descripcion,
        fechaNotificacion: parametros.fechaNotificacion,
        materia: parametros.fkIdMateria
      })
        .exec(function (err, notificacionEditada) {
          if (err)
            return res.serverError(err);
          if (notificacionEditada) {
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
  listarNotificacion: function (req, res) {
  Notificacion.find({fkIdMateria:1}).exec(function (err, usersNamedFinn){
  if (err) {
    return res.serverError(err);
  }
  sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
  return res.json(usersNamedFinn);
});}
};

