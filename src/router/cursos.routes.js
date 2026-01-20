import { Router } from "express";
import controller from "../controller/cursos.controller.js";
import filesController from "../controller/files.controller.js";

const router = Router();

// ============================================
// ADMIN ROUTES - Database Management
// ============================================
/**
 * Create cursos table
 * GET /cursos/admin/create-table
 */
router.get('/cursos/admin/create-table', controller.createTableCursos);
router.get('/cursos/create', controller.createTableCursos); // Legacy route

/**
 * Insert cursos from massive data (Excel file)
 * POST /cursos/admin/massive-insert
 */
router.post('/cursos/admin/massive-insert', controller.insertCursoMassiveData);
router.get('/cursos/insert/massive', controller.insertCursoMassiveData); // Legacy route

/**
 * Insert prices for cursos
 * POST /cursos/admin/insert-prices
 */
router.post('/cursos/admin/insert-prices', controller.insertPrices);
router.get('/cursos/insert/prices', controller.insertPrices); // Legacy route

// ============================================
// CRUD ROUTES - Basic Operations
// ============================================
/**
 * Get all cursos
 * GET /cursos
 */
router.get('/cursos', controller.getAllCursos);

/**
 * Get curso by ID
 * GET /cursos/:id
 */
router.get('/cursos/:id', controller.getCursoById);

/**
 * Create new curso
 * POST /cursos
 */
router.post('/cursos', controller.insertCurso);

/**
 * Delete curso by ID
 * DELETE /cursos/:id
 */
router.delete('/cursos/:id', controller.deleteCursoById);

/**
 * Update cupo máximo (maximum capacity) for curso
 * PUT /cursos/:id/cupo-maximo
 */
router.put('/cursos/:id/cupo-maximo', controller.updateCupoMaximoById);
router.post('/cursos/update-cupos/:id', controller.updateCupoMaximoById); // Legacy route

// ============================================
// QUERY ROUTES - Filtering & Options
// ============================================
/**
 * Get all niveles (levels) available
 * GET /cursos/options/niveles
 */
router.get('/cursos/options/niveles', controller.getAllNiveles);
router.get('/niveles', controller.getAllNiveles); // Legacy route

/**
 * Get all horarios (schedules) available
 * GET /cursos/options/horarios
 */
router.get('/cursos/options/horarios', controller.getAllHorarios);
router.get('/horarios', controller.getAllHorarios); // Legacy route

// ============================================
// STATISTICS ROUTES
// ============================================
/**
 * Get cursos count
 * GET /cursos/stats/count
 */
router.get('/cursos/stats/count', controller.counterCursos);
router.get('/cursos-counter', controller.counterCursos); // Legacy route

// ============================================
// FILE UPLOAD ROUTES
// ============================================
/**
 * Read and parse uploaded Excel files
 * GET /files/upload/read
 */
router.get('/files/upload/read', filesController.readFile);
router.get('/upload/files', filesController.readFile); // Legacy route

export default router;