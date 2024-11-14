import { Router } from "express";
import controller from "../controller/alumnos.controller.js";

const router = Router();

    router.get('/alumnos/create', controller.createTableAlumnos);
    router.get('/alumnos', controller.getAllAlumnos);
    router.post('/alumnos', controller.addAlumno);
    router.delete('/alumnos/:id', controller.deleteAlumnoById);
    router.get('/alumnos/:id', controller.getAlunoById);

export default router;