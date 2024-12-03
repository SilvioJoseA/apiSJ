import cursosModel from "../model/cursos.model.js";
import filesController from "./files.controller.js"
const controller = {};

/**
 * Function to create the `cursos` table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.createTableCursos = async (req, res) => {
    try {
        await cursosModel.createTableCursos();
        res.status(201).json({ message: "Table 'cursos' created successfully!" });
    } catch (error) {
        console.error("Error creating 'cursos' table:", error.message);
        res.status(500).json({ error: "Error creating 'cursos' table!" });
    }
};

/**
 * Function to insert a curso into the `cursos` table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.insertCurso = async (req, res) => {
    try {
        const { curso, aula, nivel, horario } = req.body;
        if (!curso || !aula || !nivel) {
            return res.status(400).json({ error: "Required fields: curso, aula, nivel" });
        }
        await cursosModel.insertCurso({ curso, aula, nivel, horario });
        res.status(201).json({ message: "Curso added successfully!" });
    } catch (error) {
        console.error("Error inserting curso:", error.message);
        res.status(500).json({ error: "Error inserting curso!" });
    }
};

/**
 * Function to get all cursos from the `cursos` table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getAllCursos = async (req, res) => {
    try {
        const rows = await cursosModel.getAllCursos();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching cursos:", error.message);
        res.status(500).json({ error: "Error fetching cursos!" });
    }
};
/**
 * Function to get all niveles from the `cursos` table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getAllNiveles = async (req, res) => {
    try {
        const rows = await cursosModel.getAllNiveles();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching niveles:", error.message);
        res.status(500).json({ error: "Error fetching niveles!" });
    }
};
/**
 * Function to get all horarios from the `cursos` table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getAllHorarios = async (req, res) => {
    try {
        const rows = await cursosModel.getAllHorarios();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching horarios:", error.message);
        res.status(500).json({ error: "Error fetching horarios!" });
    }
};

/**
 * Function to get a curso by ID from the `cursos` table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.getCursoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID parameter is required" });
        }
        const row = await cursosModel.getCursoById(id);
        if (!row) {
            return res.status(404).json({ error: "Curso not found" });
        }
        res.status(200).json(row);
    } catch (error) {
        console.error("Error fetching curso by ID:", error.message);
        res.status(500).json({ error: "Error fetching curso by ID!" });
    }
};

/**
 * Function to delete a curso by ID from the `cursos` table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.deleteCursoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID parameter is required" });
        }
        const isDeleted = await cursosModel.deleteCursoById(id);
        if (!isDeleted) {
            return res.status(404).json({ error: "Curso not found or already deleted" });
        }
        res.status(200).json({ message: "Curso deleted successfully!" });
    } catch (error) {
        console.error("Error deleting curso by ID:", error.message);
        res.status(500).json({ error: "Error deleting curso by ID!" });
    }
};

/**
 * Function to insert massive cursos into cursos table
 * @param {Object} req 
 * @param {Object} res 
 */
controller.insertCursoMassiveData = async ( req , res ) => {
    try {
        const cursosData = await filesController.readFile('./../files/cursos.xls');
        const values = cursosData.map( ({ identif_cu , curso , aula , nivel , horario , identif_pr}) => [identif_cu,curso,aula,nivel,horario,identif_pr]);
        await cursosModel.inserCursosMassive(values);
        res.status(200).json({message:"Cursos inserted successfully!"});
    } catch (error) {
        console.error("Error inserting data : " , error.message);
    }
}

export default controller;

