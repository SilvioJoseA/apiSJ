import { pool } from "../db.js";

const pagosModel = {};

pagosModel.createTablePagos = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS pagos (
    ID SERIAL PRIMARY KEY,
    final_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    collector VARCHAR(100) NOT NULL,
    external_transaction_id VARCHAR(100) UNIQUE NOT NULL,
    currency VARCHAR(10) NOT NULL,
    status_detail VARCHAR(100),
    request_date TIMESTAMP NOT NULL,
    metadata JSON,
    rejected_date TIMESTAMP,
    due_date TIMESTAMP
);`);
        console.log("Table 'pagos' created or already exists.");
    } catch (error) {
        console.error("Error creating pagos table:", error.message);
    }
};

pagosModel.insertPago = async (final_amount, 
    status, 
    type, 
    collector, 
    external_transaction_id, 
    currency, 
    status_detail, 
    request_date, 
    metadata, 
    rejected_date, 
    due_date) => {
    try {
        await pool.query(
            `INSERT INTO pagos (
                final_amount, 
                status, 
                type, 
                collector, 
                external_transaction_id, 
                currency, 
                status_detail, 
                request_date, 
                metadata, 
                rejected_date, 
                due_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [final_amount, 
                status, 
                type, 
                collector, 
                external_transaction_id, 
                currency, 
                status_detail, 
                request_date, 
                metadata, 
                rejected_date, 
                due_date]);
    } catch (error) {
        console.error("Error inserting pago:", error.message);
        throw error;  // Relanza el error para manejarlo en el controlador
    }
};

pagosModel.getAllPagos = async () => {
    try {
        return await pool.query(`SELECT * FROM pagos`);
    } catch (error) {
        console.error("Error fetching pagos :",error.message);
    }
}

export default pagosModel;