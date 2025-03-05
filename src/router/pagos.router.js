import { Router } from "express";
import controller from "../controller/pagos.controller.js";
import controllerCuotas from "../controller/cuotas.controller.js";
    const router = Router();

        router.get('/pagos/create',controller.createPagoTable);
        router.post('/pagos/insert', controller.insertPago);
        router.get('/pagos', controller.getAllPagos);
        //Cuotas
        router.get('/enviar/emails', controllerCuotas.toSendEmails);
        router.get('/make-array-options', controllerCuotas.App);
        
export default router;