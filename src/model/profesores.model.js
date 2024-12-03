import { pool } from "../db.js";

const profesoresModel = {};

/**
 * Function that creates the `profesores` table if it doesn't exist
 * @returns {Promise<void>}
 */
profesoresModel.createTableProfesores = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS profesores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                dni VARCHAR(100) NOT NULL,
                sexo VARCHAR(200),
                birthDate VARCHAR(200),
                address VARCHAR(255),
                phone VARCHAR(15),
                email VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    } catch (error) {
        console.error("Error creating `profesores` table:", error.message);
        throw new Error("Error creating `profesores` table!");
    }
};

/**
 * Query to insert a new profesor into `profesores` table
 * @param {Object} profesorData 
 * @returns {Promise<void>}
 */
profesoresModel.insertProfesor = async (profesorData) => {
    try {
        const { firstName, lastName, dni, sexo, birthDate, address, phone, email } = profesorData;
        await pool.query(
            `INSERT INTO profesores (firstName, lastName, dni, sexo, birthDate, address, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, dni, sexo, birthDate, address, phone, email]
        );
    } catch (error) {
        console.error("Error inserting profesor into `profesores` table:", error.message);
        throw new Error("Error inserting profesor into `profesores` table!");
    }
};
/**
 * identif_pr,apellpro,nombpro,dnipro,sexopro,fecnacpr,direcpro,telfijpr,celupro,emailpro
 * Query to inset profesores data
 * @param {Array<object>} values 
 */
profesoresModel.insertProfesoresMassive = async ( values ) => {
    try {
        await pool.query(`INSERT INTO profesores ( id , firstName , lastName , dni , sexo , birthDate , address , phone , email ) VALUES ?`, [values]);
    } catch (error) {
        console.error("Error inserting profesores : ",error.message);
        throw new Error("Error inserting profesores!");
    }
}

/**
 * Query to fetch all profesores
 * @returns {Promise<Array>}
 */
profesoresModel.getAllProfesores = async () => {
    try {
        const [rows] = await pool.query(`SELECT * FROM profesores`);
        return rows;
    } catch (error) {
        console.error("Error fetching profesores:", error.message);
        throw new Error("Error fetching profesores!");
    }
};

/**
 * Query to fetch a profesor by id
 * @param {number} id 
 * @returns {Promise<Object>}
 */
profesoresModel.getProfesorById = async (id) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM profesores WHERE id = ?`, [id]);
        return rows[0] || null;
    } catch (error) {
        console.error("Error fetching profesor by ID:", error.message);
        throw new Error("Error fetching profesor by ID!");
    }
};

/**
 * Query to delete a profesor by id
 * @param {number} id 
 * @returns {Promise<void>}
 */
profesoresModel.deleteProfesorById = async (id) => {
    try {
        await pool.query(`DELETE FROM profesores WHERE id = ?`, [id]);
    } catch (error) {
        console.error("Error deleting profesor by ID:", error.message);
        throw new Error("Error deleting profesor by ID!");
    }
};

export default profesoresModel;
