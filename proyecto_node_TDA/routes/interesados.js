var express = require('express');
var router = express.Router();
var cursoService = require('../services/cursosService');

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
            console.log("puta", data);
            render("Información del curso seleccionado", data);
        });
    }    
});

module.exports = router;
