import { Router } from "express";
import preinscriptosController from "../controller/preinscriptos.controller.js";

const router = Router();

// ============================================
// ADMIN ROUTES - Database Management
// ============================================
/**
 * Create preinscriptos table
 * GET /preinscriptos/admin/create-table
 */
router.get('/preinscriptos/admin/create-table', preinscriptosController.createTablePreinscriptos);
router.get('/preinscriptos/create', preinscriptosController.createTablePreinscriptos); // Legacy route

// ============================================
// CRUD ROUTES - Basic Operations
// ============================================
/**
 * Get all preinscriptos
 * GET /preinscriptos
 */
router.get('/preinscriptos', preinscriptosController.getAllPreInscriptos);

/**
 * Create new preinscripto
 * POST /preinscriptos
 */
router.post('/preinscriptos', preinscriptosController.addPreinscripto);

/**
 * Delete preinscripto by ID
 * DELETE /preinscriptos/:id
 */
router.delete('/preinscriptos/:id', preinscriptosController.deletePreInsptoById);

export default router;