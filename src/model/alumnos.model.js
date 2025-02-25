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
 * Function that creates the alumnos table dynamically based on the ciclo lectivo (e.g., "2024" or "2025")
 * @param {string} cicloLectivo - The ciclo lectivo to include in the table name (e.g., "2024" or "2025")
 * @returns {Promise<void>}
 */
alumnosModel.createTableAlumnosByClicloLectivo = async (cicloLectivo) => {
    try {
        const tableName = `alumnos_${cicloLectivo}`;
        await pool.query(`
           CREATE TABLE IF NOT EXISTS \`${tableName}\` (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(100) NULL,
                lastName VARCHAR(100) NULL,
                dni VARCHAR(100) NULL,
                gender VARCHAR(100) NULL,
                birthDate VARCHAR(200) NULL,
                address VARCHAR(100) NULL,
                phone VARCHAR(100) NULL,
                email VARCHAR(100) NULL,
                guardianName VARCHAR(100) NULL,
                guardianDNI VARCHAR(100) NULL,
                guardianEmail VARCHAR(100) NULL,
                guardianPhone VARCHAR(100) NULL,
                isMinor TINYINT(1) NULL,
                created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                curso_id INT NULL,
                status ENUM('apto', 'deuda', 'verificando', '') NULL,
                nivel VARCHAR(200) NOT NULL,
                horario VARCHAR(200) NOT NULL,
                inscripcion ENUM('inscripto', 'reinscribir', '', '') NOT NULL DEFAULT 'inscripto',
                promedio DECIMAL(10,2) NOT NULL,
                promedio_escrito DECIMAL(10,2) NOT NULL,
                promedio_oral DECIMAL(10,2) NOT NULL,
                cicloLectivo VARCHAR(20) NOT NULL,
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
alumnosModel.insertAlumno = async (alumnoData, cicloLectivo) => {
    let connection;
    try {
        // Obtener una conexión del pool
        connection = await pool.getConnection();

        // Iniciar una transacción
        await connection.beginTransaction();

        const tableName = `alumnos_${cicloLectivo}`;
        const {
            firstName, lastName, dni, gender, birthDate, address, phone, email,
            guardianName, guardianDNI, guardianEmail, guardianPhone, isMinor,
            nivel, horario, curso_id
        } = alumnoData;

        // Convertir "on" en `isMinor` a un valor booleano/int
        const isMinorValue = isMinor === "on" ? 1 : 0;

        // Consulta SQL para insertar todos los campos
        const insertQuery = `
            INSERT INTO  \`${tableName}\` (
                firstName, lastName, dni, gender, birthDate, address, phone, email, 
                guardianName, guardianDNI, guardianEmail, guardianPhone, isMinor,
                nivel, horario, curso_id
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            firstName, lastName, dni, gender, birthDate, address, phone, email,
            guardianName, guardianDNI, guardianEmail, guardianPhone, isMinorValue,
            nivel, horario, curso_id
        ];

        // Insertar al alumno
        const [row] = await connection.query(insertQuery, values);

        // Decrementar el cupo del curso
        const updateCupoQuery = `
            UPDATE cursos 
            SET cupo = cupo + 1 
            WHERE id = ?;
        `;

        // Ejecutar la actualización del cupo
        await connection.query(updateCupoQuery, [curso_id]);

        // Confirmar la transacción
        await connection.commit();

        return row;
    } catch (error) {
        // Revertir la transacción en caso de error
        if (connection) await connection.rollback();
        console.error("Error inserting alumno:", error.message);
        throw new Error("Failed to insert alumno into the database.");
    } finally {
        // Liberar la conexión
        if (connection) connection.release();
    }
};

/**
 * Query to update an existing alumno in the alumnos table by id
 * @param {number} id - The ID of the alumno to update
 * @param {Object} alumnoData - The new data for the alumno
 * @returns {Promise<void>}
 */
alumnosModel.updateAlumnoById = async (id, alumnoData) => {
    try {
        const {
            firstName, lastName, dni, gender, birthDate, address, phone, email, 
            guardianName, guardianDNI, guardianEmail, guardianPhone, isMinor,
            nivel, horario, curso_id
        } = alumnoData;

        const query = `
            UPDATE alumnos 
            SET  firstName =?, lastName=?, dni=?, gender=?, birthDate=?, address=?, phone=?, email=?, 
                guardianName=?, guardianDNI=?, guardianEmail=?, guardianPhone=?, isMinor=?,
                nivel=?, horario=?, curso_id=?
            WHERE id = ?`;

        const values = [
            firstName, lastName, dni, gender, birthDate, address, phone, email, 
            guardianName, guardianDNI, guardianEmail, guardianPhone, isMinor,
            nivel, horario, curso_id,id
        ];

        await pool.query(query, values);
    } catch (error) {
        console.error("Error updating alumno:", error.message);
    }
};


/**
 * Query to fetch all alumnos from alumnos table
 * @returns {Promise<Object[]>}
 */
alumnosModel.getAllAlumnos = async (proximociclo='') => {
    try {
        const query = !proximociclo? `SELECT * FROM alumnos`:`SELECT * FROM alumnos_${proximociclo}`;
        const [rows] = await pool.query(query);
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
        const tableName = 'alumnos';
        const query = `
            SELECT * 
            FROM ${tableName} 
            WHERE dni = ? 
        `;
        const [rows] = await pool.query(query, [dni]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Error verifying DNI:", error.message);
    }
};
alumnosModel.dniRegistred = async (ciclolectivo,dni) => {
    try {
        const query = !ciclolectivo?`SELECT * FROM alumnos WHERE dni = ?`:`SELECT * FROM alumnos_${ciclolectivo} WHERE dni=?`;
        const [ row ] = await pool.query(query,[dni]);
        return row;
    } catch (error) {
        console.error("Error searching dni registred : ", error.message);
    }
}

/**
 * Query to find alumno by dni from alumnos table
 * @param {string} dni 
 * @returns 
 */
alumnosModel.verifyStatusInscription = async (dni) => {
    try {
        // Consulta temporal para verificar el DNI
        const queryTemporal = `SELECT * FROM alumnos WHERE dni = ?`;
        const [rows] = await pool.query(queryTemporal, [dni]); // Ejecutar la consulta temporal
        console.log("Rows Temporal:", rows); // Mostrar resultados en consola para depuración

        // Verificar si hay resultados
        return rows.length > 0 ? rows[0] : { message: "No Apto" };

        /*
        // Código comentado (consulta principal)
        const query = `
            SELECT * 
            FROM alumnos 
            WHERE dni = ? 
              AND status = 'apto' 
              AND CAST(promedio AS DECIMAL(4, 2)) >= 6
              AND CAST(promedio_escrito AS DECIMAL(4, 2)) >= 6
              AND CAST(promedio_oral AS DECIMAL(4, 2)) >= 6;
        `;
        const [rowsPrincipal] = await pool.query(query, [dni]);
        console.log("Rows Principal:", rowsPrincipal);
        return rowsPrincipal.length > 0 ? rowsPrincipal[0] : { message: "No Apto" };
        */
    } catch (error) {
        console.error("Error verifying DNI:", error.message);
        throw error; // Relanzar el error para manejarlo en un nivel superior
    }
};
/**
 * Query to find alumno by dni from alumnos table
 * @param {string} dni 
 * @returns 
 */
alumnosModel.verifyStatusInscriptionKinderPreparatorio = async (dni) => {
    try {
        const query = `
            SELECT * 
            FROM alumnos 
            WHERE dni = ? 
              AND status = 'apto' 
             AND CAST(promedio_oral AS DECIMAL(4, 2))>=6
        `;
        const query1 = `
        SELECT * 
        FROM alumnos 
        WHERE dni = ?
        `;

       // const row1 = await pool.query(query1, [dni]);
        const [rows] = await pool.query(query1, [dni]);
        //console.log(row1);
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
alumnosModel.updateCursoByCursoId = async ( curso_id , alumno_id , curso_id_old = '' ) => {
    try {
        await pool.query(`UPDATE alumnos_2025 SET curso_id = ? WHERE id = ?`, [curso_id,alumno_id])
        // Incrementar el cupo del curso
        const updateCupoQuery = `
                UPDATE cursos 
                SET cupo = cupo + 1 
                WHERE id = ?;
            `;
        const updateCupoQueryLess = `
                UPDATE cursos 
                SET cupo = cupo - 1 
                WHERE id = ?;
            `;  
            if( curso_id_old ){
                await pool.query(updateCupoQueryLess,[curso_id_old]); 
            }
        await pool.query(updateCupoQuery, [curso_id]);
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
                    SELECT TRUNCATE(AVG(grade), 2)
                    FROM notas 
                WHERE notas.alumno_id = alumnos.id 
                AND (
                    subject = 'listening' 
                    OR subject = 'speaking'
                    )
                ), 0);
            `
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
                SELECT TRUNCATE(AVG(grade), 2) 
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
        await pool.query(
            `UPDATE 
                 alumnos 
             SET 
                 promedio = TRUNCATE((COALESCE(promedio_escrito, 0) + COALESCE(promedio_oral, 0)) / 2, 2);`
        );
    } catch (error) {
        console.error("Error calculating general average:", error.message);
    }
};
 
 

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
                alumnos.gender,
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
            ORDER BY 
                CASE 
                    WHEN alumnos.gender = 'male' THEN 1 
                    WHEN alumnos.gender = 'Mascul.' THEN 1
                    ELSE 2
                END,
                alumnos.firstName ASC
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
alumnosModel.deleteAlumnoById = async (id, ciclo = '') => {
    try {
        const tableName = ciclo ? `alumnos_${ciclo}` : 'alumnos';
        const [alumno] = await pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
        if (alumno[0] && alumno[0].curso_id) {
            console.log(alumno[0].curso_id);
            const updateCupoQuery = `UPDATE cursos SET cupo = cupo - 1 WHERE id = ?`;
            await pool.query(updateCupoQuery, [alumno[0].curso_id]);
            console.log("Deleted succesufully!");
        }
        await pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    } catch (error) {
        console.error(`Error deleting alumno:`, error.message);
    }
};
/**
 * Query to get alumno by id
 * @param {number} id 
 */
alumnosModel.getAlumnoById = async ( id , ciclo = '' ) => {
    try {
        const tableName = ciclo ? `alumnos_${ciclo}` : 'alumnos';
        const [row] = await pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [ id ]);
        return row;
    } catch (error) {
        console.error("Error fetching alumno by id :", error.message);  
    }
}
/**
 * Query to get alumno by id
 * @param {number} id 
 */
alumnosModel.getAlumno2025ById = async ( id ) => {
    try {
        const [row] = await pool.query("SELECT * FROM alumnos_2025 WHERE id = ?", [ id ]);
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