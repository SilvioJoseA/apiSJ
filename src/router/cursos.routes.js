import { Router } from "express";
import controller from "../controller/cursos.controller.js";
import filesController from "../controller/files.controller.js";

const router = Router();

    router.get('/cursos/create', controller.createTableCursos);
    router.get('/cursos', controller.getAllCursos);
    router.get('/niveles', controller.getAllNiveles);
    router.get('/horarios', controller.getAllHorarios);
    router.get('/cursos/:id', controller.getCursoById);
    router.post('/cursos', controller.insertCurso);
    router.delete('/cursos/:id', controller.deleteCursoById);
    router.get('/upload/files', filesController.readFile);
    router.get('/cursos/insert/massive', controller.insertCursoMassiveData);

export default router;