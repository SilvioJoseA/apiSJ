import { pool } from "../db.js";

const cuotasModel = {};
/**
 * Funtion to create Cuotas Table
 * @returns 
 */
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

/**
 * Function to insert a cuota
 * @param {Object} body 
 * @returns 
 */
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
/**
 * Fetch all cuotas by Cliclo lectivo 
 * @param {string} ciclo 
 * @returns 
 */
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
/**
 * Get all cuotas
 * @returns 
 */
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
/**
 * 
 * @returns cuotas of abril
 */
cuotasModel.getAllCuotasAbril = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT a.firstName, a.lastName, a.email, c.* 
            FROM cuotas_2025 c
            INNER JOIN alumnos_2025 a ON c.alumno_id = a.id
            WHERE mes='abril'
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching all cuotas : "+error);
    }
}
/**
 * 
 * @returns Cuotas not payed of april
 */
cuotasModel.getAllCuotasAbrilNotAprobed = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT a.firstName, a.lastName, a.email, c.* 
            FROM cuotas_2025 c
            INNER JOIN alumnos_2025 a ON c.alumno_id = a.id
            WHERE mes='abril' AND c.status <> 'pagado' AND c.status <> 'cancelado'
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching all cuotas : "+error);
    }
}
/**
 * 
 * @param {string} month 
 * @returns 
 */
cuotasModel.getAllCuotasNotAprobed = async (month) => {
    try {
        const [rows] = await pool.query(`
            SELECT a.firstName, a.lastName, a.email, c.* 
            FROM cuotas_2025 c
            INNER JOIN alumnos_2025 a ON c.alumno_id = a.id
            WHERE mes=? AND c.status <> 'pagado' AND c.status <> 'cancelado'
        `,[month]);
        return rows;
    } catch (error) {
        console.error("Error fetching all cuotas : "+error);
    }
}
cuotasModel.getAllCuotasMarzo = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT a.firstName, a.lastName, a.email, c.* 
            FROM cuotas_2025 c
            INNER JOIN alumnos_2025 a ON c.alumno_id = a.id
            WHERE mes='marzo'
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching all cuotas : "+error);
    }
}
cuotasModel.getAllCuotasMayo = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT a.firstName, a.lastName, a.email, c.* 
            FROM cuotas_2025 c
            INNER JOIN alumnos_2025 a ON c.alumno_id = a.id
            WHERE mes='mayo'
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching all cuotas : "+error);
    }
}
cuotasModel.getAllCuotasJunio = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT a.firstName, a.lastName, a.email, c.* 
            FROM cuotas_2025 c
            INNER JOIN alumnos_2025 a ON c.alumno_id = a.id
            WHERE mes='junio'
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching all cuotas : "+error);
    }
}
cuotasModel.getAllCuotasJulio = async () => {
    try {
        const [ rows ] = await pool.query(`
                SELECT a.firstName, a.lastName , a.email , c.*
                FROM cuotas_2025 c
                INNER JOIN alumnos_2025 a ON c.alumno_id = a.id
                WHERE mes = 'julio'
            `);
        return rows;
    } catch (error) {
        console.error("Error fetching all cuotas : "+error);
    }
}

cuotasModel.getAllCuotasMarzoNotAproved = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT a.firstName, a.lastName, a.email, c.* 
            FROM cuotas_2025 c
            INNER JOIN alumnos_2025 a ON c.alumno_id = a.id
              WHERE mes='marzo' AND c.status <> 'pagado'
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching all cuotas : "+error);
    }
}
/**
 * Query to fetch all cuotas created today
 * @returns {Promise<Object[]>} Array of cuotas created today with alumno info
 */
cuotasModel.getCuotasCreatedToday = async () => {
    try {
        const [rows] = await pool.query(`
        SELECT a.firstName, a.lastName, a.email, c.* 
FROM cuotas_2025 c 
INNER JOIN alumnos_2025 a ON c.alumno_id = a.id 
WHERE c.created_at >= DATE_SUB(CURDATE(), INTERVAL 10 DAY)
AND c.created_at <= NOW() 
AND c.mes = 'julio' 
AND c.status = 'pending'`);
        return rows;
    } catch (error) {
        console.error("Error fetching today's cuotas: ", error);
    }
};
cuotasModel.getCuotasPending = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT a.firstName, a.lastName, a.email, a.dni , c.* 
            FROM cuotas_2025 c
            INNER JOIN alumnos_2025 a ON c.alumno_id = a.id
            WHERE c.status = 'pending'
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching today's cuotas: ", error);
        throw error; 
    }
};
cuotasModel.getCuotasCreatedToday1 = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                a.firstName, 
                a.lastName, 
                a.email, 
                a.dni, 
                c.* 
            FROM 
                cuotas_2025 c
            INNER JOIN 
                alumnos_2025 a ON c.alumno_id = a.id
            WHERE 
                DATE(c.created_at) = CURDATE()  -- Filtra solo las creadas hoy
                AND c.status = 'pending'       -- Opcional: agregar si necesitas pendientes
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching today's cuotas: ", error);
        throw error; 
    }
};
cuotasModel.getAlumnosPending = async () => {
    try {
        const [ rows ] = await pool.query(`SELECT 
                                                a.firstName,
                                                cursos.price_month,
                                            FROM cuotas_2025 c 
                                            INNER JOIN alumnos_2025 a ON c.alumno_id = a.id 
                                            INNER JOIN cursos ON cursos.id = a.curso_id 
                                            WHERE c.status = 'pending'`
        );
            return rows;
    } catch (error) {
        console.error("Error fetching alumnos :"+error);
    }
}
cuotasModel.getAlumnosNotPayed = async (month) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
                a.*, 
                cr.price_month
             FROM 
                alumnos_2025 a 
             LEFT JOIN 
                cuotas_2025 c ON a.id = c.alumno_id AND c.mes = ? AND c.status = 'pagado' 
             LEFT JOIN 
                cursos cr ON a.curso_id = cr.id  -- Asumo que hay un campo curso_id en alumnos_2025
             WHERE 
                c.alumno_id IS NULL;`,
            [month]
        );
        return rows;
    } catch (error) {
        console.error("Error fetching alumnos NotPayed: " + error);
        throw error; // Es buena práctica propagar el error para manejarlo arriba
    }
};
cuotasModel.getAllCuotasByMonth = async () => {
    try {//
      const query = `
        SELECT 
          a.dni,
          a.firstName, 
          a.lastName, 
          a.email,
          
          -- Datos de Marzo
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'marzo' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS montoMarzo,
          'marzo' AS mesMarzo,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'marzo' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS statusMarzo,
          (SELECT c.updated_at FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'marzo' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS updatedMarzo,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'marzo' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS metodoMarzo,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'marzo' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS id_pagos_ticMarzo,
          
          -- Datos de Abril
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'abril' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS montoAbril,
          'abril' AS mesAbril,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'abril' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS statusAbril,
          (SELECT c.updated_at FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'abril' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS updatedAbril,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'abril' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS metodoAbril,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'abril' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS id_pagos_ticAbril,
          
          -- Datos de Mayo
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'mayo' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS montoMayo,
          'mayo' AS mesMayo,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'mayo' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS statusMayo,
          (SELECT c.updated_at FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'mayo' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS updatedMayo,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'mayo' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS metodoMayo,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'mayo' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS id_pagos_ticMayo,
          
          -- Datos de Junio
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'junio' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS montoJunio,
          'junio' AS mesJunio,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'junio' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS statusJunio,
          (SELECT c.updated_at FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'junio' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS updatedJunio,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'junio' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS metodoJunio,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'junio' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS id_pagos_ticJunio,
          
          -- Datos de Julio
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'julio' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS montoJulio,
          'julio' AS mesJulio,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'julio' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS statusJulio,
          (SELECT c.updated_at FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'julio' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS updatedJulio,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'julio' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS metodoJulio,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'julio' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS id_pagos_ticJulio,
          
          -- Datos de Agosto
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'agosto' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS montoAgosto,
          'agosto' AS mesAgosto,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'agosto' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS statusAgosto,
          (SELECT c.updated_at FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'agosto' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS updatedAgosto,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'agosto' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS metodoAgosto,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'agosto' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS id_pagos_ticAgosto,
          
          -- Datos de Septiembre
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'septiembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS montoSeptiembre,
          'septiembre' AS mesSeptiembre,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'septiembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS statusSeptiembre,
          (SELECT c.updated_at FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'septiembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS updatedSeptiembre,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'septiembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS metodoSeptiembre,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'septiembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS id_pagos_ticSeptiembre,
          
          -- Datos de Octubre
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'octubre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS montoOctubre,
          'octubre' AS mesOctubre,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'octubre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS statusOctubre,
          (SELECT c.updated_at FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'octubre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS updatedOctubre,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'octubre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS metodoOctubre,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'octubre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS id_pagos_ticOctubre,
          
          -- Datos de Noviembre
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'noviembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS montoNoviembre,
          'noviembre' AS mesNoviembre,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'noviembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS statusNoviembre,
          (SELECT c.updated_at FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'noviembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS updatedNoviembre,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'noviembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS metodoNoviembre,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'noviembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS id_pagos_ticNoviembre,
          
          -- Datos de Diciembre
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'diciembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS montoDiciembre,
          'diciembre' AS mesDiciembre,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'diciembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS statusDiciembre,
          (SELECT c.updated_at FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'diciembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS updatedDiciembre,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'diciembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS metodoDiciembre,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'diciembre' AND (c.status = 'pending' OR c.status= 'pagado') LIMIT 1) AS id_pagos_ticDiciembre
          
        FROM alumnos_2025 a
        WHERE EXISTS (SELECT 1 FROM cuotas_2025 c WHERE c.alumno_id = a.id);`;

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
  /**
   * 
   * @param {number} cuota_id 
   * @param {string} newStatus 
   */
  cuotasModel.updateStatus = async ( cuota_id , newStatus ) => {
    try {
        console.log(cuota_id, newStatus);
        const query = `UPDATE cuotas_2025 SET status = ?, updated_at = NOW() WHERE id = ?`;
        const answer = await pool.query(query,[ newStatus, cuota_id ]);
        console.log('Uploaded successfully! ->',answer);
    } catch (error) {
        console.error(error);
    }
  }
/**
 * Function to calculate average of cuptas pagadas by month
 * @param {string} month 
 * @returns 
 */
cuotasModel.getAverageCuotasByMonth = async (month) => {
    try {
        if(!month){
            return ;
        }
        const result = await pool.query(`SELECT AVG(amount) as average FROM cuotas 
                                          WHERE month=? AND status='pagado'`,[month]);
        return result[0]?.average || 0;
    } catch (error) {
        console.error('Error calculating average cuotas:', error);
    }
}
/**
 * Function to calculate suma of cuotas by month
 * @param {string} month 
 * @returns 
 */
cuotasModel.getSumCuotasByMonth = async (month) => {
    try {
        if(!month){
            return ;
        }
        const result = await pool.query(
            `SELECT SUM(monto) as total 
             FROM cuotas_2025 
             WHERE mes = ? 
             AND status = 'pagado'`,
            [month]
        );
        console.log(result);
        return result[0]?result[0][0]:0;
    } catch (error) {
        console.error('Error calculating suma of cuotas', error);
    }
}
/**
 * Function to calculate average of today
 * @returns 
 */
cuotasModel.getAverageToday = async () => {
    try {
        const result = await pool.query(`SELECT AVG(amount) as average FROM cuotas 
                                            WHERE DATE(created_at) = CURRENT_DATE() AND status='pagado'`);
        return result[0]?.average || 0;
    } catch (error) {
        console.error("Error calculating average cuotas: ", error);
    }
}
/**
 * Function to calculate the suma of cuotas by today
 * @returns 
 */
cuotasModel.getSumaCuotasByToday = async () => {
    try {
        const result = await pool.query(`SELECT SUM(monto) as total FROM cuotas_2025 
                                        WHERE DATE(updated_at) = CURRENT_DATE() AND status='pagado'`);
        return result[0]? result[0][0] : 0;
    } catch (error) {
        console.error("Error calculating suma of cuotas today :", error);
    }
}
/**
 * Function to get 7 days with the sum of cuotas
 * @returns 
 */
cuotasModel.getSumaCuotasByLastWeek = async () => {
    try {
        const result = await pool.query(`WITH fechas_ultimos_7_dias AS (
                                        SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY) as fecha
                                            UNION SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY)
                                            UNION SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY)
                                            UNION SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY)
                                            UNION SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY)
                                            UNION SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY)
                                            UNION SELECT CURDATE()
                                        )
                                SELECT 
                                    f.fecha,
                                    COALESCE(SUM(c.monto), 0) as total_diario
                                    FROM 
                                    fechas_ultimos_7_dias f
                                    LEFT JOIN 
                                    cuotas_2025 c ON DATE(c.updated_at) = f.fecha 
                                AND c.status = 'pagado'
                                GROUP BY f.fecha ASC;`)
        return result[0] ? result[0] : 0;
    } catch (error) {
        console.error("Error calculating suma of cuptas by the last week", error);
    }
}
/**
 * Function to sum of cuotas by the last 7 days by user
 * @returns 
 */
cuotasModel.getSumCuotasByLastWeekAndUsers = async () => {
    try {
        const result = await pool.query(`WITH fechas_ultimos_7_dias AS (
    SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY) as fecha
        UNION SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY)
        UNION SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY)
        UNION SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY)
        UNION SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY)
        UNION SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY)
        UNION SELECT CURDATE())
    SELECT 
        f.fecha,
        c.usuario,
        COALESCE(SUM(c.monto), 0) as total_diario_por_usuario
    FROM 
        fechas_ultimos_7_dias f
    LEFT JOIN 
        cuotas_2025 c ON DATE(c.updated_at) = f.fecha 
    AND c.status = 'pagado'
    GROUP BY 
        f.fecha,
        c.usuario
    ORDER BY 
        f.fecha ASC`
        );
            return result[0]? result[0] : 0;
    } catch (error) {
        console.error("Error calculating sum by the last week :",error);
    }
}
/**
 * Function to fetch the deudores by month
 * @param {string} month 
 * @returns 
 */
cuotasModel.getAllDudoresByMonth = async ( month ) => {
    try {
        if(!month){return }
        const rows = await pool.query(`SELECT * AS a FROM alumnos_2025 WHERE a.id`)
    } catch (error) {
        console.error("Error fetching all Deudores by month :"+error);
    }
}
/**
 * Function that fetching all cuotas from each idAlumno
 * @param {number} idAlumno 
 * @returns 
 */
cuotasModel.getCuotasByIdAlumno = async ( idAlumno ) => {
    try {
        const result = await pool.query(`SLECT * FROM cuotas_2025 WHERE idAlumno = ?`,[idAlumno]);
        return result;
    } catch (error) {
        console.error()
    }
}
/**
 * Function that is fetching all cuotas from each alumno_id payed
 * @param {number} idAlumno 
 * @returns 
 */
const MESES_DEL_AÑO = ["Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto"/*,
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
*/]; 

cuotasModel.getCuotasByMonthByIdAlumno = async (idAlumno) => {
    try {
        const result = await pool.query(
            `SELECT * FROM cuotas_2025 WHERE alumno_id = ? AND (status = 'pagado' OR status = 'pending')`,
            [idAlumno]
        );

        const cuotasExistentes = result[0] || [];

        // Crear un mapa rápido por nombre de mes
        const mapaCuotas = new Map(cuotasExistentes.map(cuota => [cuota.mes, cuota]));

        // Completar con los 12 meses, respetando el orden
        const cuotasCompletas = MESES_DEL_AÑO.map((mes, index) => {
            if (mapaCuotas.has(mes)) {
                return mapaCuotas.get(mes);
            }

            return {
                id: 100000 + index, // ID ficticio solo para el frontend
                alumno_id: idAlumno,
                mes,
                monto: null,
                status: "pagar",
                id_pagos_tic: null,
                created_at: null,
                updated_at: null,
                usuario: null,
                metodo: null
            };
        });

        return cuotasCompletas;

    } catch (error) {
        console.error(error);
        return [];
    }
};

cuotasModel.toCancelCuotas = async () => {
    try {
        const query = `SELECT * FROM cuotas_2025 INNER JOIN alumnos_2025 AS alumnos ON alumnos.id = cuotas_2025.alumno_id WHERE cuotas_2025.mes = 'julio' AND alumnos.nivel = '5° AÑO'`;
        const alumnos = await pool.query(query);
        return alumnos;
    } catch (error) {
        console.error("Error fetching cuotas to cancel :", error);
    }
}
/**
 * Function to fetch cuota by idCuota
 * @param {number} idCuota 
 * @returns 
 */
cuotasModel.getCuotaById = async ( idCuota ) => {
    try {
        const cuota = await pool.query("SELECT * FROM cuotas_2025 WHERE id = ?",[idCuota]);
        return cuota[0][0]?cuota[0][0]:{};
    } catch (error) {
        console.error("Error fetching cuota by id :", error);
    }
}
cuotasModel.updateCuotaFull = async (idCuota, monto, status, usuario, metodo) => {
  try {
    await pool.query(
      "UPDATE cuotas_2025 SET monto = ?, status = ?, usuario = ?, metodo = ? WHERE id = ?",
      [monto, status, usuario, metodo, idCuota]
    );
  } catch (error) {
    console.error("Error updating cuota:", error);
  }
};
cuotasModel.getCuotasByRange = async (date_start, date_end) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
    DATE(updated_at) AS dia,
    metodo,
    COUNT(*) AS cantidad,
    SUM(monto) AS monto
FROM cuotas_2025
WHERE updated_at BETWEEN ? AND ?
GROUP BY DATE(updated_at), metodo
ORDER BY dia, metodo;
`,
      [date_start, date_end]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching cuotas by range of date:", error);
  }
};
cuotasModel.cuotasModelByRangeUsers = async ( date_start , date_end ) => {
    try {
        const [rows] = await pool.query(`
    SELECT 
        *,
        COUNT(*) AS cantidad,
        SUM(monto) AS suma
    FROM cuotas_2025
    WHERE updated_at BETWEEN ? AND ?
    GROUP BY DATE(updated_at), metodo
    ORDER BY updated_at, metodo, usuario;
`, [date_start, date_end]);

        return rows;
    } catch (error) {
        console.error("Error fetching cuotas :",error);
    }
}

export default cuotasModel;