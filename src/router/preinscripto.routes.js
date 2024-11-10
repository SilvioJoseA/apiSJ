import { Router } from "express";
import preinscriptosController from "../controller/preinscriptos.controller.js";

const router = Router();
    
    router.get('/preinscriptos/create', preinscriptosController.createTablePreinscriptos);
    router.get('/preinscriptos', preinscriptosController.getAllPreInscriptos);
    router.post('/preinscriptos', preinscriptosController.addPreinscripto);
    router.delete('/preinscriptos/:id', preinscriptosController.deletePreInsptoById);

export default router;