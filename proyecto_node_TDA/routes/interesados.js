var express = require('express');
var router = express.Router();
var cursoService = require('../services/cursosService');
var estudianteService = require('../services/estudianteService');

/* GET Menú de interesados */
router.get('/', function(req, res, next) {
  res.render('interesados/index'), {
      h1: "Módulo de interesados",      
  };
});

router.get('/ver-cursos', function(req, res, next) {    
    let description;

    let render = (desc, data={}) => {
        res.render('interesados/verCursos',{
            h1: "Listado de cursos habilitados",
            description: desc,
            cursos: data
        });
    }

    cursoService.obtener((err, data)=>{
        if(err) return render(err);
        description = "Vea el listado de todos los cursos, haga clic \"ver más\" para ver más detalles";
        render(description, data);
    });
});

router.get('/curso-detalle', function(req, res, next){    
    let render = (desc, data=null) => {
        res.render('interesados/cursoDetalle',{
            h1: "Información del curso",
            description: desc,
            curso: data
        });
    }

    if(!req.query.id){
        render("No se ha especificado un curso");
    }else{
        cursoService.obtenerPorId(parseInt(req.query.id), (err, data)=>{
            if(err) return render(err);            
            render("Información del curso seleccionado", data);
        });
    }    
});

router.get('/matricular', function(req, res, next){    
    let render = (desc, data=null) => {
        res.render('interesados/matricular',{
            h1: "Información del curso",
            description: desc,
            curso: data
        });
    }

    if(!req.query.curso_id){
        render("No se ha especificado un curso");
    }else{
        cursoService.obtenerPorId(parseInt(req.query.curso_id), (err, data)=>{
            if(err) return render(err);            
            render("Matricular en el curso", data);
        });
    }    
});

router.post('/matricular', function(req, res, next){    
    let render = (desc, curso=null, view='interesados/matricular') => {
        res.render(view,{
            h1: "Matrícula de curso",
            description: desc,
            curso: curso            
        });
    }

    if(!req.query.curso_id){
        render("No se ha especificado un ID de curso", no_curso=true);
    }else{
        cursoService.obtenerPorId(parseInt(req.query.curso_id), (err, curso)=>{            
            if(err) return render(err);
            
            if(!req.body.documento){        
                render("No se ha diligenciado un documento", curso);
            }else{
                let documento;
                try{                                  
                    documento = parseInt(req.body.documento);                        
                }catch(err){                    
                    return render("El documento especificado no es válido", curso);                    
                }                
                
                estudianteService.obtenerPorDoc(documento, (err, estudiante)=>{
                    if(err){
                        render(err, curso);
                    }else if(estudiante){                
                        estudianteService.matricular(parseInt(req.query.curso_id), documento, (err, data)=>{
                            if(err) return render(err);
                            render("Se ha matriculado exitosamente", curso, 'estudiantes/matriculado');
                        });                        
                    }else{
                        render('El documento ingresado no se encuentra matriculado', null, 'interesados/noRegistrado');
                    }    
                });
            }
        }); 
    }
});

router.get('/registrar', function(req, res, next){        
    res.render('estudiantes/registrar',{
        h1: "Registro de estudiantes",
        description: "Registrar un nuevo estudiante",
    });
});

router.post('/registrar', (req, res, next) => {
    let description;  
    
    let render = (desc, estudiante, route='estudiantes/registrar')=> {
      res.render(route, {
          h1: 'Registro de estudiantes',
          description: desc,
          estudiante: estudiante
        });
    };
    let documento;

    try{
        documento = parseInt(req.body.documento);
    }catch(err){
        return render("El documento ingresado debe ser numérico");
    }
    
    let newEstudiante = {
        "nombre": req.body.nombre,
        "documento": documento,
        "correo": req.body.correo,
        "telefono": req.body.telefono,        
      }
          
      if(newEstudiante.nombre && newEstudiante.documento && newEstudiante.correo && newEstudiante.telefono){    
        estudianteService.crear(newEstudiante, (err, response)=>{
            if(err){                
                render(err, newEstudiante);
            }else{                
                render(response, newEstudiante, 'estudiantes/creado');
            }
            
        });
      }else{    
        description = "Por favor revise los campos obligatorios (*)";
        render(description, newEstudiante);
      }

});

module.exports = router;
