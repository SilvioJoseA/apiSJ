import { Router } from "express";
import controller from "../controller/auth.controller.js";
import alumnoController from "../controller/alumnos.controller.js";
import cuotasController from "../controller/cuotas.controller.js";

const router = Router();

// ============================================
// AUTHENTICATION & TOKEN ROUTES
// ============================================
/**
 * Get access token for PayPerTic API
 * GET /auth/token
 * 
 * @returns {string} Access token for PayPerTic API
 */
router.get("/auth/token", controller.getToken);
router.get("/token", controller.getToken); // Legacy route

// ============================================
// PAYMENT STATUS ROUTES (PayPerTic Integration)
// ============================================
/**
 * Check payment status by payment ID
 * GET /auth/payments/:paymentId/status
 * 
 * @param {string} paymentId - PayPerTic payment ID
 * @returns {string} Payment status
 */
router.get("/auth/payments/:paymentId/status", controller.toCheckPay);
router.get("/status/check/:id_pagos_tic", controller.toCheckPay); // Legacy route

/**
 * Cancel payment by payment ID
 * POST /auth/payments/:paymentId/cancel
 * 
 * @param {string} paymentId - PayPerTic payment ID
 * @returns {string} Cancelled payment status
 */
router.post("/auth/payments/:paymentId/cancel", controller.cancelarPago);
router.get("/cuotas/cancelar/:id_pagos_tic", controller.cancelarPago); // Legacy route

// ============================================
// CUOTAS STATUS ROUTES (Bulk Operations)
// ============================================
/**
 * Check all pending payments status
 * GET /auth/cuotas/status/all
 * 
 * @returns {Array} Array of cuotas with updated payment status
 */
router.get("/auth/cuotas/status/all", cuotasController.toCheckAllPayCuotas);
router.get("/status/all", cuotasController.toCheckAllPayCuotas); // Legacy route

/**
 * Check all pending payments status for April
 * GET /auth/cuotas/status/month/abril
 * 
 * @returns {Array} Array of April cuotas with updated payment status
 */
router.get("/auth/cuotas/status/month/abril", cuotasController.toCheckAllPayCuotasAbril);
router.get("/status/all/abril", cuotasController.toCheckAllPayCuotasAbril); // Legacy route

/**
 * Check all pending payments status for specific month and year
 * GET /auth/cuotas/status/:year/:month
 * 
 * @param {string} year - Year (e.g., "2025")
 * @param {string} month - Month name (e.g., "marzo", "abril")
 * @returns {Array} Array of cuotas with updated payment status
 */
router.get("/auth/cuotas/status/:year/:month", cuotasController.toCheckAllPayCuotasByMonth);
router.get("/status/2025/:month", cuotasController.toCheckAllPayCuotasByMonth); // Legacy route

// ============================================
// ALUMNO QUERY ROUTES
// ============================================
/**
 * Get alumno information by DNI (for parents/guardians)
 * POST /auth/alumnos/by-dni
 * 
 * @body {string} dni - Student DNI
 * @returns {Object} Alumno information with role 'father'
 */
router.post("/auth/alumnos/by-dni", alumnoController.getAlumnoByDni);
router.post("/cuotas/alumno-dni", alumnoController.getAlumnoByDni); // Legacy route

export default router;