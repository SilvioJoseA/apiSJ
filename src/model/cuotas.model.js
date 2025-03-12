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
        const {alumno_id,mes,monto,status,id_pagos_tic,usuario,metodo} = body;
        console.log(body);
        //INSERT INTO `cuotas_2025` (`id`, `alumno_id`, `mes`, `monto`, `status`, `id_pagos_tic`, `created_at`, `updated_at`, `usuario`) VALUES (NULL, '15', 'Mayo', '500', 'pending', 'sdfsds12312', current_timestamp(), current_timestamp(), 'silvio');
        //INSERT INTO `cuotas_2025` (`id`, `alumno_id`, `mes`, `monto`, `status`, `id_pagos_tic`, `created_at`, `updated_at`, `usuario`, `metodo`) VALUES (NULL, '15', 'Febrero', '500', 'pending', 'l;dfgde65', current_timestamp(), current_timestamp(), 'Silvio', 'transferencia');
        const query = `INSERT INTO cuotas_2025 ( id , alumno_id , mes , monto , status , id_pagos_tic ,created_at,updated_at,usuario,metodo) VALUES (NULL,?,?,?,?,?,current_timestamp(),current_timestamp(),?,?)`;
        console.log(query);
        await pool.query(query,[alumno_id,mes,monto,status,id_pagos_tic,usuario,metodo]);
        return true;
    } catch (error) {
        console.error("Error adding cuota :"+error.message);
    }

}  
cuotasModel.getAllCuotasByAllAlumnos = async (ciclo='') => {
    try {
        const table_alumnos = ciclo?'alumnos_'+ciclo:'alumnos';
        const table_cuotas = ciclo?'cuotas_'+ciclo:'cuotas';
        const query = `
                        SELECT 
                            a.*, 
                            c.* 
                        FROM 
                        ${table_alumnos} a
                        LEFT JOIN 
                        ${table_cuotas} c 
                        ON 
                            a.id = c.alumno_id;
                        `;
        const rows = await pool.query(query);
      //  console.log(rows);
      return rows;
    } catch (error) {
        console.error("Error fetchig all cuotas by all alumnos "+error);
    }
} 
export default cuotasModel;