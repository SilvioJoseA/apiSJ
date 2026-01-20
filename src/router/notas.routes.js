import { Router } from "express";
import controller from "../controller/notas.controller.js";

const router = Router();

// ============================================
// ADMIN ROUTES - Database Management
// ============================================
/**
 * Create notas table
 * GET /notas/admin/create-table
 */
router.get('/notas/admin/create-table', controller.createNotasTable);
router.get('/notas/create', controller.createNotasTable); // Legacy route

// ============================================
// CRUD ROUTES - Basic Operations
// ============================================
/**
 * Get all notas by alumno ID
 * GET /notas/by-alumno/:alumno_id
 */
router.get('/notas/by-alumno/:alumno_id', controller.getNotasByAlumnoId);
router.get('/notas/:alumno_id', controller.getNotasByAlumnoId); // Legacy route

/**
 * Create new nota for alumno
 * POST /notas/by-alumno/:alumno_id
 */
router.post('/notas/by-alumno/:alumno_id', controller.insertNotaByAlumnoId);
router.post('/notas/:alumno_id', controller.insertNotaByAlumnoId); // Legacy route

/**
 * Delete nota by ID
 * DELETE /notas/:id
 */
router.delete('/notas/:id', controller.deleteNotaById);

export default router;
