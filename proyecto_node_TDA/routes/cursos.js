var express = require('express');
var router = express.Router();

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
  //req.body.variable
  res.render('cursos/crear', {
    h1: 'Curso creado',
    description: 'Se ha creado el curso exitosamente'
  });
});

module.exports = router;
