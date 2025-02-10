import { Router } from "express";
import controller from "../controller/inscripciones.controller.js";

const router = Router();

    router.get('/create/inscripciones', controller.createTableInscripciones);
    router.post('/inscripciones', controller.toInserInscripto);
    router.get('/inscripciones', controller.toGetAllInsctipciones);

export default router;