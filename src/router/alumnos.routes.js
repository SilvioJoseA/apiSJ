import { Router } from "express";
import controller from "../controller/alumnos.controller.js";

const router = Router();

    router.get('/alumnos/create', controller.createTableAlumnos);
    router.get('/alumnos', controller.getAllAlumnos);
    router.get('/alumnos-teacher/:id_profesor',controller.getAllAlumnosByIdProfesor)
    router.post('/alumnos', controller.addAlumno);
    router.delete('/alumnos/:id', controller.deleteAlumnoById);
    router.get('/alumnos/:id', controller.getAlunoById);
    router.get('/alumnos/insert/massive', controller.insertAlumnosMassiveData);
    router.put('/alumnos/update/status/:id', controller.updateStatusById);
    router.put('/alumnos/update/inscription/:id', controller.updateInscriptionById);
    router.put('/alumnos/update/curso/:id', controller.updateCursoByCursoId);
    router.get('/alumnos/verify', controller.verifyDni);

export default router;