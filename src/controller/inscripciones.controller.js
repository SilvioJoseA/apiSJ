import inscripcionModel from "../model/inscripciones.model.js";

const controller = {};

    controller.createTableInscripciones = async ( req , res ) => {
        try {
            await inscripcionModel.createTableInscripcion();
        } catch (error) {
            console.error("Error creating inscripciones table :"+error.message);
        }
    }
    controller.toInserInscripto = async (req, res) => {
        try {
            const  objectPay  = req.body;
    
            if (!objectPay) {
                return res.status(400).json({ message: "objectPay is required" });
            }
    
            const { alumno_id, id, payer, final_amount } = objectPay;
    
            if (!alumno_id || !id || !payer || !final_amount) {
                return res.status(400).json({ message: "Missing required fields in objectPay" });
            }
    
            const { email, name, identification } = payer;
            const { number: dni } = identification;
    
            await inscripcionModel.insertInscripcion(alumno_id, id, dni, name, email, final_amount);
    
            res.status(201).json({ message: "Inscripción insertada correctamente" });
    
        } catch (error) {
            console.error("Error fetching idPago: " + error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    controller.toGetAllInsctipciones = async ( req , res ) => {
        try {
            const rows = await inscripcionModel.toGetAllInscripciones();
            res.status(200).json(rows);
        } catch (error) {
            console.error("Error fetching all inscripciones : "+error.message);
        }
    }
/*
{
  "validation" : false,
  "review" : false,
  "channel" : "web",
  "id" : "2cefbc84-d1b9-4727-989c-4c0e2f99a50f",
  "external_transaction_id" : "pepe 2_222_1739204135281",
  "collector_id" : "8641",
  "collector_detail" : {
    "name" : "ASOCIACION CIVIL DE CULTURA SAINT JOHN'S",
    "source_logo" : "https://servicios.paypertic.com/formularios/resources/payments/8641/img/logo.png",
    "public_email" : "asociacionsj@gmail.com"
  },
  "form_url" : "https://servicios.paypertic.com/formularios/v2/pagos/2cefbc84-d1b9-4727-989c-4c0e2f99a50f",
  "details" : [ {
    "amount" : 58000.0,
    "external_reference" : "98725",
    "concept_id" : "920",
    "concept_description" : "Prueba1"
  } ],
  "currency_id" : "ARS",
  "payer" : {
    "name" : "pepe 2",
    "email" : "namepepe@gmail.com",
    "identification" : {
      "type" : "DNI_ARG",
      "number" : "222",
      "country" : "ARG"
    }
  },
  "final_amount" : 58000.0,
  "status" : "pending",
  "request_date" : "2025-02-10T16:15:36+0000",
  "due_date" : "2025-02-11T16:15:35+0000",
  "last_due_date" : "2025-02-11T16:15:35+0000",
  "last_update_date" : "2025-02-10T16:15:36+0000",
  "source" : {
    "id" : "9767f3c5-75d6-4158-9a5d-1aa2499afaa9",
    "name" : "dy4jcnnhwbzj7bg6",
    "type" : "collector"
  }
}
*/
export default controller;