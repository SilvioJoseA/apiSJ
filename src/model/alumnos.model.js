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
                firstName VARCHAR(100),
                lastName VARCHAR(100),
                dni VARCHAR(100),
                gender VARCHAR(100),
                birthDate VARCHAR(200),
                address VARCHAR(100),
                phone VARCHAR(100),
                email VARCHAR(100),
                guardianName VARCHAR(100),
                guardianDNI VARCHAR(100),
                guardianEmail VARCHAR(100),
                guardianPhone VARCHAR(100),
                isMinor BOOLEAN,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,     
                curso_id INT,
                FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
            )
        `);
    } catch (error) {
        console.error("Error creating alumnos table:", error.message);
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
    }
};
/**
 * Query to find alumno by dni from alumnos table
 * @param {string} dni 
 * @returns 
 */
alumnosModel.verifyDni = async (dni) => {
    try {
        const query = `
            SELECT * 
            FROM alumnos 
            WHERE dni = ? 
        `;
        const [rows] = await pool.query(query, [dni]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Error verifying DNI:", error.message);
    }
};
/**
 * Query to find alumno by dni from alumnos table
 * @param {string} dni 
 * @returns 
 */
alumnosModel.verifyStatusInscription = async (dni) => {
    try {
        const query = `
            SELECT id 
            FROM alumnos 
            WHERE dni = ? 
              AND status = 'apto' 
              AND promedio >= 6
        `;
        const [rows] = await pool.query(query, [dni]);
        return rows.length > 0 ? rows[0] : {message:"No Apto"};
    } catch (error) {
        console.error("Error verifying DNI:", error.message);
    }
};
/* 
        const query = `
            SELECT * 
            FROM alumnos 
            WHERE dni = ? 
              AND status = 'apto' 
              AND promedio >= 6
        `;
*
/

/**
 * Query to inscribir alumno
 * @param {number} alumno_id 
 */
alumnosModel.updatedInscriptionById = async ( alumno_id , inscripcion ) => {
    try {
        await pool.query(`UPDATE alumnos SET inscripcion = ? WHERE id = ? AND status = 'apto' AND promedio >= 6`, [ inscripcion , alumno_id ]);
    } catch (error) {
        console.error('Error in inscription : ',error.message);
    }
}
/**
 * Query to update status from alumno by alumno_id and status
 * @param {number} alumno_id 
 * @param {string} status 
 */
alumnosModel.updateStatusById = async ( alumno_id , status ) => {
    try {
        await pool.query(`UPDATE alumnos SET status = ? WHERE id = ?`, [status,alumno_id])
    } catch (error) {
        console.error('Error updating status : ',error.message);
    }
}
/**
 * Query to update curso from alumno by alumno_id and curso_id
 * @param {number} alumno_id 
 * @param {string} status 
 */
alumnosModel.updateCursoByCursoId = async ( curso_id , alumno_id ) => {
    try {
        await pool.query(`UPDATE alumnos SET curso_id = ? WHERE id = ?`, [curso_id,alumno_id])
    } catch (error) {
        console.error('Error updating curso : ',error.message);
    }
}
/**
 * Query to update promedio_escrito by alumno_id
 * @param {number} alumno_id 
 */
alumnosModel.toCalculateAverageEscritoById = async (alumno_id) => {
    try {
        await pool.query(
            `UPDATE alumnos 
             SET promedio_escrito = COALESCE((
                 SELECT AVG(grade) 
                 FROM notas 
                 WHERE alumno_id = ? 
                   AND (
                       subject = 'reading' 
                       OR subject = 'use of english' 
                       OR subject = 'writing' 
                       OR subject = 'reading and writing'
                   )
             ), 0) 
             WHERE id = ?`,
            [alumno_id, alumno_id]
        );
    } catch (error) {
        console.error('Error calculating average (escrito) by id:', error.message);
    }
};

/**
 * Query to update promedio_oral by alumno_id
 * @param {number} alumno_id 
 */
alumnosModel.toCalculateAverageOralById = async (alumno_id) => {
    try {
        await pool.query(
            `UPDATE alumnos 
             SET promedio_oral = COALESCE((
                 SELECT AVG(grade) 
                 FROM notas 
                 WHERE alumno_id = ? 
                   AND (
                       subject = 'listening' 
                       OR subject = 'speaking'
                   )
             ), 0) 
             WHERE id = ?`,
            [alumno_id, alumno_id]
        );
    } catch (error) {
        console.error('Error calculating average (oral) by id:', error.message);
    }
};
/**
 * Query to update promedio_oral by allAlumnos
 * 
 */
alumnosModel.toCalculateAverageOralForAll = async () => {
    try {
        const response = await pool.query(
            `UPDATE alumnos 
             SET promedio_oral = COALESCE((
                 SELECT AVG(grade) 
                 FROM notas 
                 WHERE notas.alumno_id = alumnos.id 
                   AND (
                       subject = 'listening' 
                       OR subject = 'speaking'
                   )
             ), 0)`
        );
        console.log(response);
    } catch (error) {
        console.error('Error calculating average oral for all alumnos:', error.message);
    }
};
/**
 * Query to update promedio_oral by allAlumnos
 * 
 */
alumnosModel.toCalculateAverageEscritoForAll = async () => {
    try {
        await pool.query(
            `UPDATE alumnos 
             SET promedio_escrito = COALESCE((
                 SELECT AVG(grade) 
                 FROM notas 
                 WHERE notas.alumno_id = alumnos.id 
                   AND (
                       subject = 'reading' 
                       OR subject = 'use of english' 
                       OR subject = 'writing' 
                       OR subject = 'reading and writing'
                   )
             ), 0)`
        );
    } catch (error) {
        console.error('Error calculating average oral for all alumnos:', error.message);
    }
};
/**
 * Query to update average general
 */
alumnosModel.toCalculateGeneralAverage = async () => {
   try {
    await pool.query(`UPDATE 
                            alumnos 
                        SET 
                            promedio = (COALESCE(promedio_escrito, 0) + COALESCE(promedio_oral, 0)) / 2;
                    `);
   } catch (error) {
    console.error("Error calculating average general :",error.message);
   } 
} 

/**
 * Query to get all alumnos from a relationship profesor_id;
 * @param {number} profesor_id 
 * @returns 
 */
alumnosModel.getAllAlumnosByIdProfesor = async (profesor_id) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                alumnos.id,
                alumnos.firstName,
                alumnos.lastName,
                alumnos.dni,
                alumnos.gender,
                alumnos.birthDate,
                alumnos.address,
                alumnos.phone,
                alumnos.email,
                alumnos.guardianName,
                alumnos.guardianDNI,
                alumnos.guardianEmail,
                alumnos.guardianPhone,
                alumnos.isMinor,
                alumnos.created_at,
                alumnos.updated_at,
                alumnos.curso_id,
                alumnos.status,
                alumnos.inscripcion,
                alumnos.promedio_escrito,
                alumnos.promedio_oral,
                alumnos.promedio,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'subject', notas.subject,
                        'grade', notas.grade
                    )
                ) AS notas
            FROM alumnos
            INNER JOIN cursos ON alumnos.curso_id = cursos.id
            LEFT JOIN notas ON alumnos.id = notas.alumno_id
            WHERE cursos.profesor_id = ?
            GROUP BY alumnos.id
        `, [profesor_id]);
        return rows;
    } catch (error) {
        console.error('Error fetching alumnos with notas by id_profesor ', error.message);
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
    }
}
/**
 * Query to insert massive alumnos
 * @param {Array<Object>} values 
 */
alumnosModel.inserAlumnosMassive = async ( values ) => {
    try {
        await pool.query(`INSERT INTO alumnos ( firstName,lastName,dni,gender,birthDate,address,phone,email,curso_id) VALUES ?`,[values]);
    } catch (error) {
        console.error("Error inserting alumnos :", error.message);   
    }
}


export default alumnosModel;
/* 
id firstName lastName	dni	sexo	birthDate	address	phone	email	id_curso id_profesor

*/