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
cuotasModel.getAllCuotas = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT a.firstName, a.lastName, a.email, c.* 
            FROM cuotas_2025 c
            INNER JOIN alumnos_2025 a ON c.alumno_id = a.id
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching all cuotas : "+error);
    }
}
cuotasModel.getAllCuotasByMonth = async () => {
    try {
      const query = `
        SELECT 
          a.firstName, 
          a.lastName, 
          a.email, 
          MAX(CASE WHEN c.mes = 'marzo' THEN c.monto ELSE NULL END) AS montoMarzo,
          MAX(CASE WHEN c.mes = 'marzo' THEN c.mes ELSE NULL END) AS mesMarzo,
          MAX(CASE WHEN c.mes = 'marzo' THEN c.status ELSE NULL END) AS statusMarzo,
          MAX(CASE WHEN c.mes = 'marzo' THEN c.metodo ELSE NULL END) AS metodoMarzo,

          MAX(CASE WHEN c.mes = 'abril' THEN c.monto ELSE NULL END) AS montoAbril,
          MAX(CASE WHEN c.mes = 'abril' THEN c.mes ELSE NULL END) AS mesAbril,
          MAX(CASE WHEN c.mes = 'abril' THEN c.status ELSE NULL END) AS statusAbril,
          MAX(CASE WHEN c.mes = 'abril' THEN c.metodo ELSE NULL END) AS metodoAbril,

          MAX(CASE WHEN c.mes = 'mayo' THEN c.monto ELSE NULL END) AS montoMayo,
          MAX(CASE WHEN c.mes = 'mayo' THEN c.mes ELSE NULL END) AS mesMayo,
          MAX(CASE WHEN c.mes = 'mayo' THEN c.status ELSE NULL END) AS statusMayo,
          MAX(CASE WHEN c.mes = 'mayo' THEN c.metodo ELSE NULL END) AS metodoMayo,

          MAX(CASE WHEN c.mes = 'junio' THEN c.monto ELSE NULL END) AS montoJunio,
          MAX(CASE WHEN c.mes = 'junio' THEN c.mes ELSE NULL END) AS mesJunio,
          MAX(CASE WHEN c.mes = 'junio' THEN c.status ELSE NULL END) AS statusJunio,
          MAX(CASE WHEN c.mes = 'junio' THEN c.metodo ELSE NULL END) AS metodoJunio,

          MAX(CASE WHEN c.mes = 'julio' THEN c.monto ELSE NULL END) AS montoJulio,
          MAX(CASE WHEN c.mes = 'julio' THEN c.mes ELSE NULL END) AS mesJulio,
          MAX(CASE WHEN c.mes = 'julio' THEN c.status ELSE NULL END) AS statusJulio,
          MAX(CASE WHEN c.mes = 'julio' THEN c.metodo ELSE NULL END) AS metodoJulio,

          MAX(CASE WHEN c.mes = 'agosto' THEN c.monto ELSE NULL END) AS montoAgosto,
          MAX(CASE WHEN c.mes = 'agosto' THEN c.mes ELSE NULL END) AS mesAgosto,
          MAX(CASE WHEN c.mes = 'agosto' THEN c.status ELSE NULL END) AS statusAgosto,
          MAX(CASE WHEN c.mes = 'agosto' THEN c.metodo ELSE NULL END) AS metodoAgosto,

          MAX(CASE WHEN c.mes = 'septiembre' THEN c.monto ELSE NULL END) AS montoSeptiembre,
          MAX(CASE WHEN c.mes = 'septiembre' THEN c.mes ELSE NULL END) AS mesSeptiembre,
          MAX(CASE WHEN c.mes = 'septiembre' THEN c.status ELSE NULL END) AS statusSeptiembre,
          MAX(CASE WHEN c.mes = 'septiembre' THEN c.metodo ELSE NULL END) AS metodoSeptiembre,

          MAX(CASE WHEN c.mes = 'octubre' THEN c.monto ELSE NULL END) AS montoOctubre,
          MAX(CASE WHEN c.mes = 'octubre' THEN c.mes ELSE NULL END) AS mesOctubre,
          MAX(CASE WHEN c.mes = 'octubre' THEN c.status ELSE NULL END) AS statusOctubre,
          MAX(CASE WHEN c.mes = 'octubre' THEN c.metodo ELSE NULL END) AS metodoOctubre,

          MAX(CASE WHEN c.mes = 'noviembre' THEN c.monto ELSE NULL END) AS montoNoviembre,
          MAX(CASE WHEN c.mes = 'noviembre' THEN c.mes ELSE NULL END) AS mesNoviembre,
          MAX(CASE WHEN c.mes = 'noviembre' THEN c.status ELSE NULL END) AS statusNoviembre,
          MAX(CASE WHEN c.mes = 'noviembre' THEN c.metodo ELSE NULL END) AS metoodNoviembre,

          MAX(CASE WHEN c.mes = 'diciembre' THEN c.monto ELSE NULL END) AS montoDiciembre,
          MAX(CASE WHEN c.mes = 'diciembre' THEN c.mes ELSE NULL END) AS mesDiciembre,
          MAX(CASE WHEN c.mes = 'diciembre' THEN c.status ELSE NULL END) AS statusDiciembre,
          MAX(CASE WHEN c.mes = 'diciembre' THEN c.metodo ELSE NULL END) AS metodoDiciembre

        FROM 
          cuotas_2025 c 
        INNER JOIN 
          alumnos_2025 a ON c.alumno_id = a.id
        GROUP BY 
          a.firstName, a.lastName, a.email;
      `;
  /*
        "mes": "Marzo",
      "monto": "48000.00",
      "status": "pending",
      "id_pagos_tic": "307f71d3-df0a-4cba-a02e-57be2eaf9370",
      "created_at": "2025-03-12T03:18:14.000Z",
      "updated_at": "2025-03-12T03:18:14.000Z",
      "usuario": "tic",
      "metodo": "pagos-tic"
  */
      const [rows] = await pool.query(query);
      if (Array.isArray(rows)) {
        return rows;
      } else {
        throw new Error('El resultado no es un array');
      }
    } catch (error) {
      console.error('Error fetching all cuotas by month:', error);
      throw error;
    }
  };
export default cuotasModel;