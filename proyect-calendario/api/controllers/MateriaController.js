/**
 * MateriaController
 *
 * @description :: Server-side logic for managing Materias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearMateria: function (req, res) {
    var parametros = req.allParams();
    if (parametros.nombre &&
      parametros.descripcion ) {
      nuevaMateria={
        nombre:parametros.nombre,
        descripcion:parametros.descripcion,
        fkIdPeriodoAcademico:1
      }
      Materia.create(nuevaMateria)
        .exec(function (error, materiaNueva) {
          if (error) {
            return res.serverError(error);
          }
          else {
            return res.redirect("/materias");
          }
        });
    }
    else {
      return res.badRequest();
    }
  },
  editarMateria: function (req, res) {
    var parametros = req.allParams();
    if (parametros.nombre &&
      parametros.descripcion &&
      parametros.fkIdPeriodoAcademico &&
      parametros.id) {
      nuevaMateria={
        nombre:parametros.nombre,
        descripcion:parametros.descripcion,
        fkIdPeriodoAcademico:parametros.fkIdPeriodoAcademico
      }
      Materia.update({id:parametros.id},nuevaMateria)
        .exec(function (error, materiaModificada) {
          if (error) {
            return res.serverError(error);
          }
          else {
            if(materiaModificada){
              //Si encontro
              return res.redirect("/materias")
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
  eliminarMateria: function (req, res) {
    var params = req.allParams();
    sails.log.info("Parametros", params);
    if (req.method == "POST" && params.id) {
      Materia.destroy({
        id: params.id
      }).exec(function (err, materiaEliminada) {
        if (err) {
          return res.serverError(err);
        }
        else {
          if (materiaEliminada) {
            //Si encontro
            return res.redirect("/materias")
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
  inicioMateria: function (req, res) {
    var parametros = req.allParams();
    Materia
      .find()
      .exec(function (err, materias) {
        if (err)
          return res.negotiate(err);
        return res.view('GestionMaterias/materia', {
          materias: materias
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
      Materia.findOne({
        id: parametros.id
      })
        .exec(function (err, materiaEncontrada) {
          if (err)
            return res.serverError(err);
          if (materiaEncontrada) {
            //Si encontro
            return res.view('GestionMaterias/editarMateria', {
              materia: materiaEncontrada
            });
          }
          else {
            //No encontro
            return res.redirect('/materias');
          }
        });
    }
    else {
      return res.redirect('/materias/crear');
    }
  },
  irCrear: function (req, res) {
    return res.view('GestionMaterias/crearMateria');
  }
};

