import alumnosModel from "../model/alumnos.model.js";
import filesController from "./files.controller.js";
const controller = {};
    
    /**
     * Function to create alumnos table 
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.createTableAlumnos = async ( req , res ) => {
        try {
            await alumnosModel.createTableAlumnos();
            res.status(201).json({ message: "Alumnos table created successfully!"});
        } catch (error) {
            console.error(`Error createng alumnos table :`, error.message);
            throw new Error("Error creartibng alumnos table!");
            
        }
    }
    /**
     * Function to fetch all alumnos from alumnos table
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.getAllAlumnos = async ( req , res ) => {
        try {
            const rows = await alumnosModel.getAllAlumnos();
            res.status(201).json(rows);
        } catch (error) {
            console.error("Error fetching all Alumnos from alumnos table :", error.message);
            throw new Error("Error fetching all alumnos from alumnos table!");
            
        }
    }
    controller.verifyDni = async ( req , res ) => {
        try {
            const { dni } = req.body;
                console.log('Hola');
            const row = await alumnosModel.verifyDni(dni);
            if ( row ){
                res.status(201).json(row);
            } else {
                res.status(500);
            }
            
        } catch (error) {
            console.error("Error verifing dni : ",error.message);
            throw new Error("Error varifing dni!");
        }
    }
    controller.updateStatusById = async ( req , res ) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            await alumnosModel.updateStatusById(id,status);
            res.status(201).json("Status updated successfully!");
        } catch (error) {
            console.error("Error updating status by id : ",error.message);
            throw new Error("Error updating status by id!");
        }
    }
    controller.updateInscriptionById = async ( req , res ) => {
        try {
            const { id } = req.params;
            const { inscripcion } = req.body;
            await alumnosModel.updatedInscriptionById(id,inscripcion);
            res.status(201).json({message:"Inscription updated successfully!"})
        } catch (error) {
            console.error("Error updating inscription by id : ",error.message);
            throw new Error("Error updating inscription by id!");
        }
    }
    controller.updateCursoByCursoId= async ( req , res ) => {
        try {
            const { id } = req.params;
            const { curso_id } = req.body;
            await alumnosModel.updateCursoByCursoId(curso_id,id);
            res.status(201).json({message:"curso updated successfully!"})
        } catch (error) {
            console.error("Error updating curso by id : ",error.message);
            throw new Error("Error updating curso by id!");
        }
    }
    controller.getAllAlumnosByIdProfesor = async ( req , res ) => {
        try {
            const { id_profesor } = req.params;
            const rows = await alumnosModel.getAllAlumnosByIdProfesor( id_profesor );
            res.status(201).json(rows);
        } catch (error) {
            console.error("Error fetching all alumnos by id_profesor : ",error.message);
            throw new Error("Error fetching all alumnos by id_profesor!");
        }
    }
    /**
     * Function to insert alumno into alumnos table
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.addAlumno = async ( req , res ) => {
        try {
            const alumnosData = req.body;
                await alumnosModel.insertAlumno(alumnosData);
                res.status(201).json({ message: "Alumno created successfully!"});
        } catch (error) {
            console.error("Error adding alumno into alumnos table : ", error.message);
            throw new Error("Error adding alumno into alumnos table!");
            
        }
    }
    /**
     * Function to delete a alumno by id from alumnos table
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.deleteAlumnoById = async ( req , res ) => {
        try {
            const { id } = req.params;
                await alumnosModel.deleteAlumnoById(id);
                res.status(201).json({ message: "Alumno deleted successfully!"});
        } catch (error) {
            console.error("Error deleting alumno by id from alumnos table :", error.message);
            throw new Error("Error deleting alumno by id from alumnos table!");
                       
        }
    }
    /**
     * Function to get alumno by id from alumnos table
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.getAlunoById = async ( req , res ) => {
        try {
            const { id } = req.params;
            const row = await alumnosModel.getAlumnoById(id);
            res.status(201).json(row[0]);
        } catch (error) {
            console.error("Error fetching alumno by id :", error.message);
            throw new Error("Error fetching aluno by id!");     
        }
    } 

    /**
    * Function to insert massive alumnos into alumnos table
    * @param {Object} req 
    * @param {Object} res 
    */
controller.insertAlumnosMassiveData = async ( req , res ) => {
    try {
        const cursosData = await filesController.readFile('./../files/alumnos.xls');
        const values = cursosData.map( ({ nombalu,apellalu,dnialu,sexoalu,fecnacal,direcalu,celualu,emailalu,identif_cu }) => [apellalu,nombalu,dnialu,sexoalu,fecnacal,direcalu,celualu,emailalu,identif_cu ]);
            console.log("Longitud de array : ",values.length);
            await alumnosModel.inserAlumnosMassive(values);
            res.status(200).json({message:"Alumnos inserted successfully!"});
    } catch (error) {
        console.error("Error inserting data : " , error.message);
        throw new Error("Error insertin data!");
    }
}
export default controller;