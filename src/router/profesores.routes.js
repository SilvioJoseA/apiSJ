import { Router } from "express";
import controller from "../controller/profesores.controller.js";

const router = Router();

    router.get('/profesores/create',controller.createTableProfesores);
    router.get('/profesores', controller.getAllProfesores);
    router.get('/profesores/:id', controller.getProfesoresById);
    router.post('/profesores/:id', controller.insertProfesor);
    router.delete('/profesores/:id', controller.deleteProfesorById);
    router.get('/profesores/insert/massive', controller.insertProfesorMassivedData);

export default router;