var express = require('express');
var router = express.Router();
var cursosController = require('../controllers/cursosController');

router.get('/', (req, res, next) => {
  res.render('Cursos', {
    h1: 'Cursos',
    description: 'Listado de cursos educación continua'
  });
});

router.get('/crear', (req, res, next) => {
  res.render('cursos/crear', {
    h1: 'Bienvenido coordinador',
    description: 'Crear curso educación continua'
  });
});

router.post('/crear', (req, res, next) => {
  let description;
  let creado = false;
  console.log("1", req.body.nombre, req.body.id, req.body.valor, req.body.descripcion);
  if(req.body.nombre && req.body.id && req.body.valor && req.body.descripcion){
    console.log("2");
    let newCurso = {
      nombre: req.body.nombre,
      id: parseInt(req.body.id),
      valor: parseFloat(req.body.valor),
      descripcion: req.body.descripcion,
      modalidad: req.body.modalidad,
      intensidad: parseInt(req.body.intensidad),
    }

    if(cursosController.crear(newCurso)){
      console.log("3");
      description = "Curso creado exitosamente";
      creado = true;      
    }else{
      console.log("4");
      description = "Ocurrió un error al tratar de crear el curso";
    }

  }else{
    console.log("5");
    description = "Por favor revise los campos obligatorios";
  }
  
  res.render('cursos/crear', {
    h1: 'Creación de cursos',
    description: description,
    creado: creado
  });
});

module.exports = router;
