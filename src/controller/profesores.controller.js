import profesoresModel from "../model/profesores.model.js";
import filesController from "./files.controller.js";
const controller = {};

/**
 * Function to create profesores table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.createTableProfesores = async (req, res) => {
    try {
        await profesoresModel.createTableProfesores();
        res.status(200).json({ message: "Profesores Table created successfully!" });
    } catch (error) {
        console.error("Error creating profesores table:", error.message);
        throw new Error("Error creating profesores table!");
    }
};

/**
 * Function to insert a profesor into profesores table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.insertProfesor = async (req, res) => {
    try {
        const { nombre, apellido } = req.body;
        if (!nombre || !apellido) {
            throw new Error("Missing required fields: 'nombre' or 'apellido'.");
        }

        await profesoresModel.insertProfesor(req.body);
        res.status(200).json({ message: "Profesor inserted successfully!" });
    } catch (error) {
        console.error("Error inserting profesor into profesores table:", error.message);
        throw new Error("Error inserting profesor into profesores table!");
    }
};
/**
 * 
 */
controller.insertProfesorMassivedData = async ( req , res ) => {
    try {
        const profesorData = await filesController.readFile('./../files/profesores.xls');
        const values = profesorData.map( ({identif_pr,apellpro,nombpro,dnipro,sexopro,fecnacpr,direcpro,celupro,emailpro}) => [identif_pr,apellpro,nombpro,dnipro,sexopro,fecnacpr,direcpro,celupro,emailpro]);
        await profesoresModel.insertProfesoresMassive(values);
        res.status(200).json({message:"Profesores inserted successfully!"})
    } catch (error) {
        console.error("Error inserting data : ",error.message);
        throw new Error("Error inserting data!");
    }
}

/**
 * Function to get all profesores 
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getAllProfesores = async (req, res) => {
    try {
        const rows = await profesoresModel.getAllProfesores(); // Se añadió 'await'
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching all profesores:", error.message);
        throw new Error("Error fetching all profesores!");
    }
};

/**
 * Function to get a profesor by id
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getProfesoresById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("Missing required parameter: 'id'.");
        }

        const row = await profesoresModel.getProfesorById(id);
        if (!row) {
            throw new Error("Profesor not found.");
        }

        res.status(200).json(row);
    } catch (error) {
        console.error("Error fetching profesor by id:", error.message);
        throw new Error("Error fetching profesor by id!");
    }
};

/**
 * Function to delete profesor by id
 * @param {Object} req 
 * @param {Object} res 
 */
controller.deleteProfesorById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("Missing required parameter: 'id'.");
        }

        await profesoresModel.deleteProfesorById(id);
        res.status(200).json({ message: "Profesor deleted successfully!" });
    } catch (error) {
        console.error("Error deleting profesor:", error.message);
        throw new Error("Error deleting profesor!");
    }
};

export default controller;
