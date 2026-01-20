import { Router } from "express";
import controller from "../controller/pagos.controller.js";
import controllerCuotas from "../controller/cuotas.controller.js";
import controllerAlumnos from "../controller/alumnos.controller.js";

const router = Router();

// ============================================
// ADMIN ROUTES - Database Management
// ============================================
/**
 * Create pagos table
 * GET /pagos/admin/create-table
 */
router.get('/pagos/admin/create-table', controller.createPagoTable);
router.get('/pagos/create', controller.createPagoTable); // Legacy route

// ============================================
// CRUD ROUTES - Basic Operations
// ============================================
/**
 * Get all pagos
 * GET /pagos
 */
router.get('/pagos', controller.getAllPagos);

/**
 * Create new pago
 * POST /pagos
 */
router.post('/pagos', controller.insertPago);
router.post('/pagos/insert', controller.insertPago); // Legacy route

// ============================================
// CUOTAS INTEGRATION ROUTES
// ============================================
/**
 * Send emails for cuotas
 * POST /pagos/cuotas/emails/send
 */
router.post('/pagos/cuotas/emails/send', controllerCuotas.toSendEmails);
router.get('/enviar/emails', controllerCuotas.toSendEmails); // Legacy route

/**
 * Generate email options array for cuotas
 * GET /pagos/cuotas/emails/options
 */
router.get('/pagos/cuotas/emails/options', controllerCuotas.App);
router.get('/make-array-options', controllerCuotas.App); // Legacy route

// ============================================
// PAYMENT PROCESSING ROUTES
// ============================================
/**
 * Get payment object (payer and amount) for alumno
 * GET /pagos/payment-object/:alumnoId
 */
router.get('/pagos/payment-object/:alumnoId', controllerAlumnos.toMakeObjectPayerAndAmount);
router.get('/object-payer-amount/:id', controllerAlumnos.toMakeObjectPayerAndAmount); // Legacy route

export default router;