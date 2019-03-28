let cursoModel = require('../models/curso.json');

let crear = (curso) => {
    console.log("Cursos actuales");
    console.log(cursoModel);
    console.log("Creando curso");
    console.log(curso);
}

module.exports = {
    crear,
}