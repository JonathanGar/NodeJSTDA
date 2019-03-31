var express = require('express');
var router = express.Router();
var cursoService = require('../services/cursosService');

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
  
  let render = (desc, curso, route='cursos/crear')=> {
    res.render(route, {
        h1: 'Creación de cursos',
        description: desc,
        curso: curso
      });
  };

  let newCurso = {
    "nombre": req.body.nombre,
    "id": parseInt(req.body.id),
    "valor": parseFloat(req.body.valor),
    "descripcion": req.body.descripcion,
    "modalidad": req.body.modalidad,
    "intensidad": parseInt(req.body.intensidad),
    "disponible": true
  }

  if(newCurso.valor <= 0){
      description = "Ingrese un valor del curso mayor que cero";
      render(description, newCurso);
  }else if(newCurso.intensidad <= 0){
      description = "Ingrese una intensidad horaria mayor que cero";
      render(description, newCurso);
  }else if(newCurso.nombre && newCurso.id && newCurso.valor && newCurso.descripcion){
    console.log("2", newCurso);
    cursoService.crear(newCurso, (err, response)=>{
        if(err){
            description = err;
            render(description, newCurso);
        }else{
            description = response;
            render(description, newCurso, 'cursos/creado');
        }
        
    });
  }else{    
    description = "Por favor revise los campos obligatorios (*)";
    render(description, newCurso);
  }
});

module.exports = router;
