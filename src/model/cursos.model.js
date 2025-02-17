import { pool } from "../db.js";

/*
Structure of the cursos table:
- id: Unique identifier (Primary Key)
- curso: Course name
- aula: Classroom name or identifier
- nivel: Course level
- horario: Course schedule
*/
const cursosModel = {};

/**
 * Creates the `cursos` table if it does not exist.
 */
cursosModel.createTableCursos = async (cicloLectivo) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cursos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                curso VARCHAR(200) NOT NULL,
                aula VARCHAR(200) NOT NULL,
                nivel VARCHAR(200) NOT NULL,
                horario VARCHAR(200),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    } catch (error) {
        console.error('Error creating cursos table:', error.message);
    }
};

/**
 * Inserts a new course into the `cursos` table.
 * @param {Object} dataCurso - Course data { curso, aula, nivel, horario }.
 */
cursosModel.insertCurso = async (dataCurso) => {
    try {
        const { curso, aula, nivel, horario } = dataCurso;
        await pool.query(
            `INSERT INTO cursos (curso, aula, nivel, horario) VALUES (?, ?, ?, ?)`,
            [curso, aula, nivel, horario]
        );
    } catch (error) {
        console.error("Error inserting course:", error.message);
    }
};
/**
 * Query to insert massive cursos
 * @param {Array<Object>} values 
 */
cursosModel.inserCursosMassive = async ( values ) => {
    try {
        await pool.query(`INSERT INTO cursos ( id , curso , aula , nivel , horario , profesor_id ) VALUES ?`,[values]);
    } catch (error) {
        console.error("Error inserting cursos :", error.message);   
    }
}


/**
 * Retrieves all courses from the `cursos` table.
 * @returns {Array} List of courses.
 */
cursosModel.getAllCursos = async () => {
    try {
        const [rows] = await pool.query(` SELECT * FROM cursos ORDER BY nivel ASC`);
        return rows;
    } catch (error) {
        console.error("Error fetching all courses:", error.message);
    }
};
/**
 * Retrieves all niveles from the `cursos` table.
 * @returns {Array} List of niveles.
 */
cursosModel.getAllNiveles = async () => {
    try {
        const [rows] = await pool.query(`SELECT id, nivel, horario, price FROM cursos 
                                                    WHERE cupo_maximo - cupo > 0 
                                              ORDER BY nivel ASC`
                                        );
        return rows;
    } catch (error) {
        console.error("Error fetching all niveles:", error.message);
    }
};
/**
 * Retrieves all horarios from the `cursos` table.
 * @returns {Array} List of horarios.
 */
cursosModel.getAllHorarios = async () => {
    try {
        const [rows] = await pool.query(`SELECT DISTINCT horario FROM cursos`);
        return rows;
    } catch (error) {
        console.error("Error fetching all horarios:", error.message);
    }
};


/**
 * Deletes a course by its ID.
 * @param {number} id - ID of the course to delete.
 * @returns {boolean} `true` if the course was deleted, `false` otherwise.
 */
cursosModel.delteCursoById = async (id) => {
    try {
        const [result] = await pool.query(`DELETE FROM cursos WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error deleting course by ID:", error.message);
    }
};

/**
 * Retrieves a course by its ID.
 * @param {number} id - ID of the course to fetch.
 * @returns {Object|null} The course object if found, or `null` if not.
 */
cursosModel.getCursoById = async (id) => {
    try {
        const row = await pool.query(`SELECT * FROM cursos WHERE id = ?`, [id]);
        return row[0][0];
    } catch (error) {
        console.error("Error fetching course by ID:", error.message);
    }
};

cursosModel.insertPrices = async (value, id) => {
    try {
        await pool.query("UPDATE cursos SET price = ? WHERE id = ?", [value, id]);
    } catch (error) {
        console.error("Error al insertar precios en cursos:", error.message);
    }
};
cursosModel.updateCupoMaximoCursoById = async ( cupoMaximo , id ) => {
    try {
        await pool.query(`UPDATE cursos SET cupo_maximo = ? WHERE id = ?`,[cupoMaximo,id]);
    } catch (error) {
        console.error("Error updating cupo maximo by id:"+error.message);
    }
}


export default cursosModel;
