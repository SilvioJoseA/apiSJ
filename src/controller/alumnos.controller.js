import alumnosModel from "../model/alumnos.model.js";

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

    export default controller;