import { Router } from "express";
import controller from "../controller/inscripciones.controller.js";

const router = Router();

// ============================================
// ADMIN ROUTES - Database Management
// ============================================
/**
 * Create inscripciones table
 * GET /inscripciones/admin/create-table
 */
router.get('/inscripciones/admin/create-table', controller.createTableInscripciones);
router.get('/create/inscripciones', controller.createTableInscripciones); // Legacy route

// ============================================
// CRUD ROUTES - Basic Operations
// ============================================
/**
 * Get all inscripciones
 * GET /inscripciones
 */
router.get('/inscripciones', controller.toGetAllInsctipciones);

/**
 * Create new inscripcion (from payment confirmation)
 * POST /inscripciones
 */
router.post('/inscripciones', controller.toInserInscripto);

export default router; 