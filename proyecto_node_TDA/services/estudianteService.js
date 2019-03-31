let fs = require('fs');

let getEstudiantes = () => {
    try{
        let estudianteModel = require('../models/estudiante.json');
        return JSON.parse(JSON.stringify(estudianteModel));    
    }catch(err){
        throw("Ocurrió un error al tratar de recuperar los estudiantes");
    }
};

let getMatriculas = () => {
    try{
        let matriculaModel = require('../models/matricula.json');
        return JSON.parse(JSON.stringify(matriculaModel));    
    }catch(err){
        throw("Ocurrió un error al tratar de recuperar las matrículas");
    }
};

let obtenerPorDoc = (documento, callback) => {
    try{
        let estudiantes = getEstudiantes();        
        let estudiante = estudiantes.find((e)=>{
            return e.documento === documento;
        });
        
        if(estudiante){
            callback(null, estudiante);
        }else{
            callback(null, null);
        }
        
    }catch(err){
        callback(err);
    }
}

let crear = (estudiante, callback) => {
    let estudiantes, response;

    try{
        estudiantes = getEstudiantes();
    }catch(err){
        callback(err);
    }    

    let estudianteEncontrado = estudiantes.find((e)=>{
        return e.documento === estudiante.documento; 
    });
        
    if(estudianteEncontrado){        
        callback("El documento ingresado ya existe en la lista de estudiantes");
    } else {
       estudiantes.push(estudiante);
       let datos = JSON.stringify(estudiantes);           
       fs.writeFile(__dirname + '/../models/estudiante.json', datos, (err)=>{
           if(err) return callback(err);
           callback(null, "El estudiante ha sido creado exitosamente");
       });             
    }     
}

let matricular = (curso_id, documento, callback) => {
    let estudianteModel, cursoModel, matriculaModel, response;

    try{
        estudianteModel = getEstudiantes();
        cursoModel = require('./cursosService').getCursos();
        matriculaModel = getMatriculas();
    }catch(err){
        callback(err);
    }    

    let estudiante = estudianteModel.find((e)=>{
        return e.documento === documento; 
    });

    let curso = cursoModel.find((c)=>{
        return c.id === curso_id; 
    });

    if(estudiante && curso){        
        let matriculaEncontrada = matriculaModel.find((mat)=>{
            return mat.curso_id === curso_id && mat.documento_estudiante === documento; 
        });

        if(matriculaEncontrada){        
            callback("El estudiante ya se encuentra matriculado en el curso seleccionado");
        } else {
            let matricula = {
                curso_id: curso_id,
                documento_estudiante: documento 
            }            

            matriculaModel.push(matricula);
            let datos = JSON.stringify(matriculaModel);           
            fs.writeFile(__dirname + '/../models/matricula.json', datos, (err)=>{
                if(err) return callback(err);
                callback(null, "El estudiante se ha matriculado exitosamente");
            });             
        }     
    }
        
    
}

module.exports = {
    obtenerPorDoc,
    crear,
    matricular
}