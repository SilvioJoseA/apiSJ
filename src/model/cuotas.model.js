import { pool } from "../db.js";

const cuotasModel = {};
cuotasModel.createTableCuotas = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS cuotas_2025 (
                id INT AUTO_INCREMENT PRIMARY KEY,
                alumno_id INT NOT NULL,
                mes ENUM('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre') NOT NULL,
                monto DECIMAL(10, 2) NOT NULL,
                status ENUM('deuda', 'pending', 'pagado') NOT NULL,
                id_pagos_tic VARCHAR(200),
                FOREIGN KEY (alumno_id) REFERENCES alumnos_2025(id)
            )
        `;
        await pool.query(query);
        return true;
    } catch (error) {
        console.error("Error creating table cuotas: " + error.message);
    }
};

cuotasModel.insertCuota = async ( body ) => {
    try {
        const {alumno_id,mes,monto,status,id_pagos_tic} = body;
        const query = `INSERT INTO cuotas_2025 ( id , alumno_id , mes , monto , status , id_pagos_tic) VALUES (NULL,?,?,?,?,?)`;
        await pool.query(query,[alumno_id,mes,monto,status,id_pagos_tic]);
        return true;
    } catch (error) {
        console.error("Error adding cuota :"+error.message);
    }

}   
export default cuotasModel;