import { pool } from "../db.js";

const inscripcionModel = {};

inscripcionModel.createTableInscripcion = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS inscripciones_2025 (
            id INT AUTO_INCREMENT PRIMARY KEY,
            alumno_id INT NOT NULL,
            id_pago VARCHAR(50) NOT NULL,
            dni VARCHAR(20) NOT NULL,
            nombre VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL,
            monto DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (alumno_id) REFERENCES alumnos_2025(id) ON DELETE CASCADE ON UPDATE CASCADE  
        )`);
        console.log("Tabla 'inscripciones' verificada o creada exitosamente.");
    } catch (error) {
        console.error("Error creando la tabla inscripciones:", error.message);
    }
};
inscripcionModel.insertInscripcion = async (  alumno_id , id_pago , dni , nombre , email , monto  ) => {
    try {
        await pool.query(`INSERT INTO inscripciones_2025 (id , alumno_id , id_pago , dni , nombre , email , monto) VALUES (NULL,?,?,?,?,?,?);`,[alumno_id , id_pago , dni , nombre , email , monto]);
    } catch (error) {
        console.error('Error inserting inscripcion : '+error.message);
    }
}
inscripcionModel.toGetAllInscripciones = async () => {
    try {
        const rows = await pool.query(`SELECT * FROM inscripciones_2025`);
        return rows;
    } catch (error) {
        console.error("Error fetching all inscripciones :"+error.message);
    }
}

export default inscripcionModel;
