let fs = require('fs');

let getCursos = () => {
    try{
        let cursoModel = require('../models/curso.json');
        return JSON.parse(JSON.stringify(cursoModel));    
    }catch(err){
        throw("Ocurrió un error al tratar de recuperar los cursos");
    }
};

let crear = (curso, callback) => {
    let cursos, response;
    try{
        cursos = getCursos();
    }catch(err){
        callback(err);
    }    

    let cursoEncontrado = cursos.find((c)=>{
        return c.id === curso.id; 
    });
        
    if(cursoEncontrado){        
        callback("El ID ingresado ya existe en la lista de cursos");
    } else {
       cursos.push(curso);
       let datos = JSON.stringify(cursos);           
       fs.writeFile(__dirname + '/../models/curso.json', datos, (err)=>{
           if(err) return callback(err);
           callback(null, "El curso ha sido creado exitosamente");
       });             
    }     
}

let obtener = (callback) => {    
    try{
        let cursos = getCursos();
        cursos = cursos.filter((curso)=>{
            return curso.disponible
        })
        callback(null, cursos);
    }catch(err){
        callback(err);
    }
}

let obtenerPorId = (id, callback) => {
    try{
        let cursos = getCursos();        
        let curso = cursos.find((c)=>{
            return c.id === id;
        });
        console.log("reputisima", typeof(id), curso);
        if(curso){
            callback(null, curso);
        }else{
            callback("No se ha encontrado el curso especificado");
        }
        
    }catch(err){
        callback(err);
    }
}

module.exports = {
    crear,
    obtener,
    obtenerPorId
}