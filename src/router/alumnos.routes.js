import { Router } from "express";
import controller from "../controller/alumnos.controller.js";

const router = Router();

    router.get('/alumnos/create', controller.createTableAlumnos);
   // router.get('/alumnos/:proximociclo?', controller.getAllAlumnos);
    router.get('/alumnos/all/:proximociclo?', controller.getAllAlumnos);
    router.get('/alumnos-teacher/:id_profesor',controller.getAllAlumnosByIdProfesor)
    router.post('/alumnos/insert/:cicloLectivo', controller.addAlumno);
    router.delete('/alumnos/:id', controller.deleteAlumnoById);
    router.get('/alumnos/:id', controller.getAlunoById);
    router.get('/alumnos/insert/massive', controller.insertAlumnosMassiveData);
    router.put('/alumnos/update/status/:id', controller.updateStatusById);
    router.put('/alumnos/update/inscription/:id', controller.updateInscriptionById);
    router.put('/alumnos/update/curso/:id', controller.updateCursoByCursoId);
    router.post('/alumnos/verify', controller.verifyDni);
    router.get('/alumnos/tomakeaverageoral/:id', controller.calculateAverageOralById);
    router.get('/alumnos/tomakeaverageescrito/:id', controller.calculateAverageEscritoById);
    router.put('/alumnos/tomakeaverageoralall', controller.calculateAverageOralByAll);
    router.put('/alumnos/tomakeaverageescritoall', controller.calculateAverageEscritoByAll);
    router.put('/alumnos/tomakeaveragegeneral', controller.calculateAverageGeneral);
    //Routes by ciclo lectivo
    router.get('/alumnos/create/:cicloLectivo', controller.createTableAlumnosByCicloLectivo);
    router.post('/alumnos/dni-registred', controller.dniRegistred);

export default router;