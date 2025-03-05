import pagosModel from "../model/pagos.model.js";

const controller = {};

controller.createPagoTable = async ( req , res ) => {
    try {
        await pagosModel.createTablePagos();
        res.status(200).json({message:"Table pagos created successfully!"});
    } catch (error) {
        console.error("Error creating pago table : ",error.message);
    }
}

controller.insertPago = async ( req , res ) => {
    try {
        const { ID, 
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
            due_date } = req.body;
            const values = { ID, 
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
                due_date };
        await pagosModel.insertPago(final_amount, 
            status, 
            type, 
            collector, 
            external_transaction_id, 
            currency, 
            status_detail, 
            request_date, 
            metadata, 
            rejected_date, 
            due_date);
            res.status(201).json({message:"Pago inserted successuly!"});
    } catch (error) {
        console.error("Error inserting pago :",error.message);
    }
}

controller.getAllPagos = async ( req , res ) => {
    try {
        const rows = await pagosModel.getAllPagos();
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error fetching pagos :",error.message)    
    }
}


export default controller;