import { Router } from "express";
import controller from "../controller/notas.controller.js";

const router = Router();

router.get('/notas/create', controller.createNotasTable);
router.get('/notas/:alumno_id', controller.getNotasByAlumnoId); // Se corrigió la sintaxis aquí
router.post('/notas/:alumno_id', controller.insertNotaByAlumnoId);
router.delete('/notas/:id', controller.deleteNotaById);

export default router;
