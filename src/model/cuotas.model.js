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
            WHERE DATE(c.created_at) = CURDATE()
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching today's cuotas: ", error);
        throw error; // Es mejor lanzar el error para manejarlo donde se llame a la función
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
cuotasModel.getCuotasCreatedToday = async () => {
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
    try {
      const query = `
        SELECT 
          a.firstName, 
          a.lastName, 
          a.email,
          
          -- Datos de Marzo
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'marzo' LIMIT 1) AS montoMarzo,
          'marzo' AS mesMarzo,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'marzo' LIMIT 1) AS statusMarzo,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'marzo' LIMIT 1) AS metodoMarzo,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'marzo' LIMIT 1) AS id_pagos_ticMarzo,
          
          -- Datos de Abril
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'abril' LIMIT 1) AS montoAbril,
          'abril' AS mesAbril,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'abril' LIMIT 1) AS statusAbril,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'abril' LIMIT 1) AS metodoAbril,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'abril' LIMIT 1) AS id_pagos_ticAbril,
          
          -- Datos de Mayo
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'mayo' LIMIT 1) AS montoMayo,
          'mayo' AS mesMayo,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'mayo' LIMIT 1) AS statusMayo,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'mayo' LIMIT 1) AS metodoMayo,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'mayo' LIMIT 1) AS id_pagos_ticMayo,
          
          -- Datos de Junio
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'junio' LIMIT 1) AS montoJunio,
          'junio' AS mesJunio,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'junio' LIMIT 1) AS statusJunio,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'junio' LIMIT 1) AS metodoJunio,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'junio' LIMIT 1) AS id_pagos_ticJunio,
          
          -- Datos de Julio
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'julio' LIMIT 1) AS montoJulio,
          'julio' AS mesJulio,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'julio' LIMIT 1) AS statusJulio,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'julio' LIMIT 1) AS metodoJulio,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'julio' LIMIT 1) AS id_pagos_ticJulio,
          
          -- Datos de Agosto
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'agosto' LIMIT 1) AS montoAgosto,
          'agosto' AS mesAgosto,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'agosto' LIMIT 1) AS statusAgosto,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'agosto' LIMIT 1) AS metodoAgosto,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'agosto' LIMIT 1) AS id_pagos_ticAgosto,
          
          -- Datos de Septiembre
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'septiembre' LIMIT 1) AS montoSeptiembre,
          'septiembre' AS mesSeptiembre,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'septiembre' LIMIT 1) AS statusSeptiembre,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'septiembre' LIMIT 1) AS metodoSeptiembre,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'septiembre' LIMIT 1) AS id_pagos_ticSeptiembre,
          
          -- Datos de Octubre
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'octubre' LIMIT 1) AS montoOctubre,
          'octubre' AS mesOctubre,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'octubre' LIMIT 1) AS statusOctubre,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'octubre' LIMIT 1) AS metodoOctubre,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'octubre' LIMIT 1) AS id_pagos_ticOctubre,
          
          -- Datos de Noviembre
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'noviembre' LIMIT 1) AS montoNoviembre,
          'noviembre' AS mesNoviembre,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'noviembre' LIMIT 1) AS statusNoviembre,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'noviembre' LIMIT 1) AS metodoNoviembre,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'noviembre' LIMIT 1) AS id_pagos_ticNoviembre,
          
          -- Datos de Diciembre
          (SELECT c.monto FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'diciembre' LIMIT 1) AS montoDiciembre,
          'diciembre' AS mesDiciembre,
          (SELECT c.status FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'diciembre' LIMIT 1) AS statusDiciembre,
          (SELECT c.metodo FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'diciembre' LIMIT 1) AS metodoDiciembre,
          (SELECT c.id_pagos_tic FROM cuotas_2025 c WHERE c.alumno_id = a.id AND c.mes = 'diciembre' LIMIT 1) AS id_pagos_ticDiciembre
          
        FROM alumnos_2025 a
        WHERE EXISTS (SELECT 1 FROM cuotas_2025 c WHERE c.alumno_id = a.id);
      `;

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
  cuotasModel.updateStatus = async ( cuota_id , newStatus ) => {
    try {
        console.log(cuota_id, newStatus);
        const query =   `UPDATE cuotas_2025 SET status = ? WHERE id = ?`
        await pool.query(query,[ newStatus, cuota_id ]);
        console.log('Uploaded successfully!');
    } catch (error) {
        console.error(error);
    }
  }
export default cuotasModel;