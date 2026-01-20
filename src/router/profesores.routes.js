import { Router } from "express";
import controller from "../controller/profesores.controller.js";

const router = Router();

// ============================================
// ADMIN ROUTES - Database Management
// ============================================
/**
 * Create profesores table
 * GET /profesores/admin/create-table
 */
router.get('/profesores/admin/create-table', controller.createTableProfesores);
router.get('/profesores/create', controller.createTableProfesores); // Legacy route

/**
 * Insert profesores from massive data (Excel file)
 * POST /profesores/admin/massive-insert
 */
router.post('/profesores/admin/massive-insert', controller.insertProfesorMassivedData);
router.get('/profesores/insert/massive', controller.insertProfesorMassivedData); // Legacy route

// ============================================
// CRUD ROUTES - Basic Operations
// ============================================
/**
 * Get all profesores
 * GET /profesores
 */
router.get('/profesores', controller.getAllProfesores);

/**
 * Get profesor by ID
 * GET /profesores/:id
 */
router.get('/profesores/:id', controller.getProfesoresById);

/**
 * Create new profesor
 * POST /profesores
 */
router.post('/profesores', controller.insertProfesor);
router.post('/profesores/:id', controller.insertProfesor); // Legacy route (incorrect, but maintained)

/**
 * Delete profesor by ID
 * DELETE /profesores/:id
 */
router.delete('/profesores/:id', controller.deleteProfesorById);

export default router;