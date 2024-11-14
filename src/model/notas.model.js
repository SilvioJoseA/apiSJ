import { pool } from "../db.js";

const notasModel = {};

/**
 * Query to create notas table if it doesn't exist 
 */
notasModel.createTableNotas = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS notas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                alumno_id INT NOT NULL,
                subject VARCHAR(100) NOT NULL,
                grade DECIMAL(5,2) NOT NULL,
                observations TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (alumno_id) REFERENCES alumnos(id) ON DELETE CASCADE  
            )
        `);
    } catch (error) {
        console.error("Error creating notas table:", error.message);
        throw new Error("Error creating notas table!");
    }
};

/**
 * Query to get notas by alumno_id
 * @param {number} alumno_id 
 * @returns Array of notas
 */
notasModel.getNotasByAlumnoId = async (alumno_id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM notas WHERE alumno_id = ? ORDER BY created_at DESC", [alumno_id]);
        return rows;
    } catch (error) {
        console.error("Error fetching notas by alumno_id:", error.message);
        throw new Error("Error fetching notas by alumno_id!");
    }
};

/**
 * Query to insert a new nota for a specific alumno
 * @param {number} alumno_id 
 * @param {string} subject 
 * @param {number} grade 
 * @param {string} observations 
 * @returns Inserted nota
 */
notasModel.insertNotaByAlumnoId = async (alumno_id, subject, grade, observations) => {
    try {
        const [result] = await pool.query(
            "INSERT INTO notas (alumno_id, subject, grade, observations) VALUES (?, ?, ?, ?)",
            [alumno_id, subject, grade, observations]
        );
        return { id: result.insertId, alumno_id, subject, grade, observations };
    } catch (error) {
        console.error("Error inserting nota by alumno_id:", error.message);
        throw new Error("Error inserting nota by alumno_id!");
    }
};

/**
 * Query to update a nota by nota id
 * @param {number} id 
 * @param {string} subject 
 * @param {number} grade 
 * @param {string} observations 
 * @returns Updated nota
 */
notasModel.updateNotaById = async (id, subject, grade, observations) => {
    try {
        await pool.query(
            "UPDATE notas SET subject = ?, grade = ?, observations = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            [subject, grade, observations, id]
        );
        return { id, subject, grade, observations };
    } catch (error) {
        console.error("Error updating nota by id:", error.message);
        throw new Error("Error updating nota by id!");
    }
};

/**
 * Query to delete a nota by nota id
 * @param {number} id 
 * @returns Deletion result
 */
notasModel.deleteNotaById = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM notas WHERE id = ?", [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error deleting nota by id:", error.message);
        throw new Error("Error deleting nota by id!");
    }
};

export default notasModel;
