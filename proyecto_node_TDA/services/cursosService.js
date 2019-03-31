let fs = require('fs');

let crear = (curso, callback) => {
    let cursoModel = require('../models/curso.json');
    cursoModel = JSON.parse(JSON.stringify(cursoModel));    
    let response;

    let cursoEncontrado = cursoModel.find((c)=>{
        return c.id === curso.id; 
    });
        
    if(cursoEncontrado){
        response = "El ID ingresado ya existe en la lista de cursos";
        callback(response);
    } else {
       cursoModel.push(curso);
       let datos = JSON.stringify(cursoModel);           
       fs.writeFile(__dirname + '/../models/curso.json', datos, (err)=>{
           if(err) return callback(err);
           callback(null, "El curso ha sido creado exitosamente");
       });             
    }     
}

module.exports = {
    crear,
}