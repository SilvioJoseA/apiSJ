import { pool } from "../db.js";

const preinscriptosModel = {};

/**
 * Function that creates the preinscriptos table if it doesn't exist
 *  @returns {Promise<void>}
 */
preinscriptosModel.createTablePreinscriptos = async () => {
    try {
        await pool.query(`
                CREATE TABLE IF NOT EXISTS preinscriptos (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    lastname VARCHAR(100) NOT NULL,
                    dni VARCHAR(100) NOT NULL,
                    sexo VARCHAR(100) NOT NULL,
                    birthday VARCHAR(100) NOT NULL,
                    direction VARCHAR(100) NOT NULL,
                    phone VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL 
                )
            `);
    } catch (error) {
        console.error("Error creating preinscriptos table : ",error.message);
    }
}

/**
 * Query to fetch all preinscriptos from the preinscriptos table
 * @returns { Array<Object>}
 */
preinscriptosModel.getAllPreinscriptos = async () => {
    try {
        const [ rows ] = await pool.query(`SELECT * FROM preinscriptos`);
        return rows;
    } catch (error) {
        console.error("Error fetching all preinscriaptos :",error.message);
    }
}

/**
 * Query to insert a new preinscripto into preinscrioptos table
 * @param {string} name 
 * @param {string} lastname 
 * @param {string} dni 
 * @param {string} sexo 
 * @param {string} birthday 
 * @param {string} direction 
 * @param {string} phone 
 * @param {string} email 
 * @returns {Promise<void>} 
 */
preinscriptosModel.addPreinscripto = async (name , lastname , dni , sexo ,birthday , direction , phone , email) => {
    try {
        await pool.query("INSERT INTO preinscriptos ( id , name , lastname , dni , sexo ,birthday , direction , phone , email ) VALUES (NULL , ? , ? , ? , ? , ? , ? , ? , ? )", [name , lastname , dni , sexo ,birthday , direction , phone , email]);
    } catch (error) {
        console.error("Error adding preinscripto: ", error.message);
    }
}

/**
 * Query to delete a preinscripto by id preinscriptos table
 * @param {number} id
 * @returns {Promise<void>} 
 */
preinscriptosModel.deletePrinscriptosById = async ( id ) => {
    try {
        await pool.query("DELETE FROM preinscriptos WHERE id = ? ", [id]);
    } catch (error) {
        console.error("Error deleting preinscripto by id : ", error.message);
    }
}

export default preinscriptosModel;