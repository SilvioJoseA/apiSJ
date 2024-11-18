import { pool } from "../db.js";

const alumnosModel = {};

/**
 * Function that creates the alumnos table if it doesn't exist 
 * @returns {Promise<void>}
 */
alumnosModel.createTableAlumnos = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS alumnos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                dni VARCHAR(100) NOT NULL,
                birthDate DATE NOT NULL,
                address VARCHAR(100),
                phone VARCHAR(100),
                email VARCHAR(100),
                guardianName VARCHAR(100),
                guardianDNI VARCHAR(100),
                guardianEmail VARCHAR(100),
                guardianPhone VARCHAR(100),
                isMinor BOOLEAN NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    } catch (error) {
        console.error("Error creating alumnos table:", error.message);
        throw new Error("Error creating alumnos table!");
    }
};

/**
 * Query to insert a new alumno into alumnos table
 * @param {Object} alumnoData 
 * @returns {Promise<void>}
 */
alumnosModel.insertAlumno = async (alumnoData) => {
    try {
        const { firstName, lastName, dni, gender , birthDate, address, phone, email, guardianName, guardianDNI, guardianEmail, guardianPhone, isMinor } = alumnoData;
        await pool.query(`INSERT INTO alumnos (firstName, lastName, dni, birthDate, address, phone, email, guardianName, guardianDNI, guardianEmail, guardianPhone, isMinor) VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`, 
            [firstName, lastName, dni, gender, birthDate, address, phone, email, guardianName, guardianDNI, guardianEmail, guardianPhone, isMinor]);
    } catch (error) {
        console.error("Error inserting alumno:", error.message);
        throw new Error("Error inserting alumno!");
    }
};

/**
 * Query to fetch all alumnos from alumnos table
 * @returns {Promise<Object[]>}
 */
alumnosModel.getAllAlumnos = async () => {
    try {
        const [rows] = await pool.query(`SELECT * FROM alumnos`);
        return rows;
    } catch (error) {
        console.error("Error fetching alumnos:", error.message);
        throw new Error("Error fetching alumnos!");
    }
};

/**
 * Query to delete a alumno by id from alumnos table
 * @param {number} id 
 * @returns {Promise<void>}
 */
alumnosModel.deleteAlumnoById = async (id) => {
    try {
        await pool.query(`DELETE FROM alumnos WHERE id = ?`, [id]);
    } catch (error) {
        console.error(`Error deleting alumno:`, error.message);
        throw new Error("Error deleting alumno!");
    }
};
/**
 * Query to get alumno by id
 * @param {number} id 
 */
alumnosModel.getAlumnoById = async ( id ) => {
    try {
        const [row] = await pool.query("SELECT * FROM alumnos WHERE id = ?", [ id ]);
        return row;
    } catch (error) {
        console.error("Error fetching alumno by id :", error.message);
        throw new Error("Error fetching alumno by id!");   
    }
}

export default alumnosModel;
