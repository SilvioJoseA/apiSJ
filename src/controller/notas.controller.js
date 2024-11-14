import notasModel from "../model/notas.model.js";

const controller = {};

/**
 * Function to create notas table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.createNotasTable = async (req, res) => {
    try {
        await notasModel.createTableNotas();
        res.status(201).json({ message: "Notas table created successfully!" });
    } catch (error) {
        console.error("Error creating notas table:", error.message);
        res.status(500).json({ error: "Error creating notas table!" });
    }
};

/**
 * Function to get notas by alumno_id
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getNotasByAlumnoId = async (req, res) => {
    try {
        const { alumno_id } = req.params;
        const rows = await notasModel.getNotasByAlumnoId(alumno_id);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching notas by alumno_id:", error.message);
        res.status(500).json({ error: "Error fetching notas by alumno_id!" });
    }
};

/**
 * Function to insert a nota into the notas table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.insertNotaByAlumnoId = async (req, res) => {
    try {
        const { alumno_id } = req.params;
        const { subject, grade, observations } = req.body;
        const newNota = await notasModel.insertNotaByAlumnoId(alumno_id, subject, grade, observations);
        res.status(201).json({ message: "Nota created successfully!", nota: newNota });
    } catch (error) {
        console.error("Error inserting nota by alumno_id:", error.message);
        res.status(500).json({ error: "Error inserting nota by alumno_id!" });
    }
};

/**
 * Function to delete a nota by nota id
 * @param {Object} req 
 * @param {Object} res 
 */
controller.deleteNotaById = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await notasModel.deleteNotaById(id);
        if (success) {
            res.status(200).json({ message: "Nota deleted successfully!" });
        } else {
            res.status(404).json({ error: "Nota not found!" });
        }
    } catch (error) {
        console.error("Error deleting nota by id:", error.message);
        res.status(500).json({ error: "Error deleting nota by id!" });
    }
};

export default controller;
