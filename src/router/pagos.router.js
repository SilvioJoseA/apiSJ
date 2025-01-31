import { Router } from "express";
import controller from "../controller/pagos.controller.js";
    const router = Router();

        router.get('/pagos/create',controller.createPagoTable);
        router.post('/pagos/insert', controller.insertPago);
        router.get('/pagos', controller.getAllPagos);
        
export default router;