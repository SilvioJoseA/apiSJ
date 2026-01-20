import { Router } from "express";
import controller from "../controller/alumnos.controller.js";

const router = Router();

// ============================================
// ADMIN ROUTES - Database Management
// ============================================
/**
 * Create alumnos table (default)
 * GET /alumnos/admin/create-table
 */
router.get('/alumnos/admin/create-table', controller.createTableAlumnos);

/**
 * Create alumnos table for specific ciclo lectivo
 * GET /alumnos/admin/create-table/:cicloLectivo
 */
router.get('/alumnos/admin/create-table/:cicloLectivo', controller.createTableAlumnosByCicloLectivo);

/**
 * Insert alumnos from massive data (Excel file)
 * POST /alumnos/admin/massive-insert
 */
router.post('/alumnos/admin/massive-insert', controller.insertAlumnosMassiveData);

// ============================================
// CRUD ROUTES - Basic Operations
// ============================================
/**
 * Get all alumnos (optional: filter by ciclo lectivo)
 * GET /alumnos?cicloLectivo=2025
 * GET /alumnos/all/:proximociclo (legacy support)
 */
router.get('/alumnos', controller.getAllAlumnos);
router.get('/alumnos/all/:proximociclo?', controller.getAllAlumnos); // Legacy route

/**
 * Get alumno by ID (with optional ciclo lectivo)
 * GET /alumnos/:id?ciclo=2025
 * GET /alumnos/:ciclo/:id (legacy support)
 */
router.get('/alumnos/:id', controller.getAlunoById);
router.get('/alumnos/:ciclo/:id', controller.getAlunoById); // Legacy route

/**
 * Create new alumno
 * POST /alumnos/:cicloLectivo
 */
router.post('/alumnos/:cicloLectivo', controller.addAlumno);

/**
 * Update alumno by ID
 * PUT /alumnos/:id
 */
router.put('/alumnos/:id', controller.updateAlumnoById);

/**
 * Delete alumno by ID (with optional ciclo lectivo)
 * DELETE /alumnos/:id?ciclo=2025
 * DELETE /alumnos/:ciclo/:id (legacy support)
 */
router.delete('/alumnos/:id', controller.deleteAlumnoById);
router.delete('/alumnos/:ciclo/:id', controller.deleteAlumnoById); // Legacy route

// ============================================
// ALUMNO SPECIFIC UPDATES
// ============================================
/**
 * Update alumno status
 * PUT /alumnos/:id/status
 */
router.put('/alumnos/:id/status', controller.updateStatusById);

/**
 * Update alumno inscription status
 * PUT /alumnos/:id/inscription
 */
router.put('/alumnos/:id/inscription', controller.updateInscriptionById);

/**
 * Update alumno curso assignment
 * PUT /alumnos/:id/curso
 */
router.put('/alumnos/:id/curso', controller.updateCursoByCursoId);

/**
 * Update alumno type of cuota
 * PUT /alumnos/:id/cuota-type?ciclo=2025
 */
router.put('/alumnos/:id/cuota-type', controller.updateTypeCuotaById);
router.put('/alumnos-type-cuota/:id/:ciclo?', controller.updateTypeCuotaById); // Legacy route

/**
 * Update alumno seguro
 * PUT /alumnos/:id/seguro?ciclo=2025
 */
router.put('/alumnos/:id/seguro', controller.updateSeguroById);
router.put('/alumnos-seguro/:id/:ciclo?', controller.updateSeguroById); // Legacy route

// ============================================
// VERIFICATION & VALIDATION ROUTES
// ============================================
/**
 * Verify DNI availability and status
 * POST /alumnos/verify-dni
 */
router.post('/alumnos/verify-dni', controller.verifyDni);
router.post('/alumnos/verify', controller.verifyDni); // Legacy route

/**
 * Check if DNI is already registered
 * POST /alumnos/check-dni
 */
router.post('/alumnos/check-dni', controller.dniRegistred);
router.post('/alumnos/dni-registred', controller.dniRegistred); // Legacy route

// ============================================
// AVERAGE CALCULATION ROUTES
// ============================================
/**
 * Calculate oral average for specific alumno
 * POST /alumnos/:id/average/oral/calculate
 */
router.post('/alumnos/:id/average/oral/calculate', controller.calculateAverageOralById);
router.get('/alumnos/tomakeaverageoral/:id', controller.calculateAverageOralById); // Legacy route

/**
 * Calculate written average for specific alumno
 * POST /alumnos/:id/average/written/calculate
 */
router.post('/alumnos/:id/average/written/calculate', controller.calculateAverageEscritoById);
router.get('/alumnos/tomakeaverageescrito/:id', controller.calculateAverageEscritoById); // Legacy route

/**
 * Calculate oral average for all alumnos
 * POST /alumnos/average/oral/calculate-all
 */
router.post('/alumnos/average/oral/calculate-all', controller.calculateAverageOralByAll);
router.put('/alumnos/tomakeaverageoralall', controller.calculateAverageOralByAll); // Legacy route

/**
 * Calculate written average for all alumnos
 * POST /alumnos/average/written/calculate-all
 */
router.post('/alumnos/average/written/calculate-all', controller.calculateAverageEscritoByAll);
router.put('/alumnos/tomakeaverageescritoall', controller.calculateAverageEscritoByAll); // Legacy route

/**
 * Calculate general average for all alumnos
 * POST /alumnos/average/general/calculate-all
 */
router.post('/alumnos/average/general/calculate-all', controller.calculateAverageGeneral);
router.put('/alumnos/tomakeaveragegeneral', controller.calculateAverageGeneral); // Legacy route

// ============================================
// QUERY & STATISTICS ROUTES
// ============================================
/**
 * Get alumnos by profesor ID
 * GET /alumnos/by-professor/:profesorId
 */
router.get('/alumnos/by-professor/:profesorId', controller.getAllAlumnosByIdProfesor);
router.get('/alumnos-teacher/:id_profesor', controller.getAllAlumnosByIdProfesor); // Legacy route

/**
 * Get alumnos count (optional: filter by ciclo lectivo)
 * GET /alumnos/stats/count?ciclo=2025
 */
router.get('/alumnos/stats/count', controller.counterAlumnos);
router.get('/alumnos_counter/:cicle?', controller.counterAlumnos); // Legacy route

export default router;