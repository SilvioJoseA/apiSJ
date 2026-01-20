import { Router } from "express";
import controller from "../controller/cuotas.controller.js";

const router = Router();

// ============================================
// ADMIN ROUTES - Database Management
// ============================================
/**
 * Create cuotas table
 * GET /cuotas/admin/create-table
 */
router.get('/cuotas/admin/create-table', controller.createTableCuotas);
router.get('/create-table-cuotas', controller.createTableCuotas); // Legacy route

// ============================================
// CRUD ROUTES - Basic Operations
// ============================================
/**
 * Get all cuotas
 * GET /cuotas
 */
router.get('/cuotas', controller.getAllCuotas);

/**
 * Get all cuotas with alumnos information
 * GET /cuotas/with-alumnos
 */
router.get('/cuotas/with-alumnos', controller.getAllCuotasByAllAlumnos);
router.get('/to-see-cuotas', controller.getAllCuotasByAllAlumnos); // Legacy route

/**
 * Get cuota by ID
 * GET /cuotas/:idCuota
 */
router.get('/cuotas/:idCuota', controller.getCuotaById);
router.get('/cuota/:idCuota', controller.getCuotaById); // Legacy route

/**
 * Create new cuota
 * POST /cuotas
 */
router.post('/cuotas', controller.addCuota);

/**
 * Update cuota status by ID
 * PUT /cuotas/:idCuota/status
 */
router.put('/cuotas/:idCuota/status', controller.updateStatusById);
router.put('/cuotas/update/:idCuota', controller.updateStatusById); // Legacy route

/**
 * Update full cuota information by ID
 * PUT /cuotas/:idCuota
 */
router.put('/cuotas/:idCuota', controller.updateCuotaFull);
router.put('/cuotas/update/full/:idCuota', controller.updateCuotaFull); // Legacy route

// ============================================
// QUERY ROUTES - By Month
// ============================================
/**
 * Get all cuotas by month (generic)
 * GET /cuotas/by-month?month=marzo
 */
router.get('/cuotas/by-month', controller.getAllCuotasByMonth);
router.get('/cuotas/month', controller.getAllCuotasByMonth); // Legacy route

/**
 * Get all cuotas for March
 * GET /cuotas/month/marzo
 */
router.get('/cuotas/month/marzo', controller.getAllCuotasMarzo);
router.get('/cuotas/marzo', controller.getAllCuotasMarzo); // Legacy route

/**
 * Get all cuotas for April
 * GET /cuotas/month/abril
 */
router.get('/cuotas/month/abril', controller.getAllCuotasAbril);
router.get('/cuotas/abril', controller.getAllCuotasAbril); // Legacy route

/**
 * Get all cuotas for May
 * GET /cuotas/month/mayo
 */
router.get('/cuotas/month/mayo', controller.getAllCuotasMayo);
router.get('/cuotas/mayo', controller.getAllCuotasMayo); // Legacy route

/**
 * Get all cuotas for June
 * GET /cuotas/month/junio
 */
router.get('/cuotas/month/junio', controller.getAllCuotasJunio);
router.get('/cuotas/junio', controller.getAllCuotasJunio); // Legacy route

/**
 * Get all cuotas for July
 * GET /cuotas/month/julio
 */
router.get('/cuotas/month/julio', controller.getAllCuotasJulio);
router.get('/cuotas/julio', controller.getAllCuotasJulio); // Legacy route

// ============================================
// QUERY ROUTES - By Alumno
// ============================================
/**
 * Get all cuotas by alumno ID
 * GET /cuotas/by-alumno/:idAlumno
 */
router.get('/cuotas/by-alumno/:idAlumno', controller.getAllCuotasPayedByIdAlumno);
router.get('/cuotas/meses/:idAlumno', controller.getAllCuotasPayedByIdAlumno); // Legacy route

/**
 * Get alumnos without payment for specific month
 * GET /cuotas/alumnos/not-payed?month=abril
 */
router.get('/cuotas/alumnos/not-payed', controller.toGetAlumnosNotPayed);
router.get('/alumnos-not-payed', controller.toGetAlumnosNotPayed); // Legacy route

// ============================================
// QUERY ROUTES - By Date Range
// ============================================
/**
 * Get cuotas by date range
 * GET /cuotas/range?date_start=2025-01-01&date_end=2025-01-31
 * GET /cuotas/range/:date_start/:date_end (legacy)
 */
router.get('/cuotas/range', controller.getCuotasByRange);
router.get('/cuotas/range/:date_start/:date_end', controller.getCuotasByRange); // Legacy route

/**
 * Get cuotas by date range grouped by users
 * GET /cuotas/range/users?date_start=2025-01-01&date_end=2025-01-31
 * GET /cuotas/range/users/:date_start/:date_end (legacy)
 */
router.get('/cuotas/range/users', controller.getCuotasByRangeUsers);
router.get('/cuotas/range/users/:date_start/:date_end', controller.getCuotasByRangeUsers); // Legacy route

// ============================================
// STATISTICS & ANALYTICS ROUTES
// ============================================
/**
 * Get sum of cuotas for today
 * GET /cuotas/stats/sum/today
 */
router.get('/cuotas/stats/sum/today', controller.getSumToday);
router.get('/cuotas/sum', controller.getSumToday); // Legacy route

/**
 * Get sum of cuotas for specific month
 * GET /cuotas/stats/sum/month/:month
 */
router.get('/cuotas/stats/sum/month/:month', controller.getSumByMonth);
router.get('/cuotas/sum/:month', controller.getSumByMonth); // Legacy route

/**
 * Get sum of cuotas for last week
 * GET /cuotas/stats/sum/last-week
 */
router.get('/cuotas/stats/sum/last-week', controller.getSumByLastWeek);
router.get('/cuotas/suma/week', controller.getSumByLastWeek); // Legacy route

/**
 * Get sum of cuotas for last week grouped by users
 * GET /cuotas/stats/sum/last-week/by-users
 */
router.get('/cuotas/stats/sum/last-week/by-users', controller.getSumByLastWeekByUser);
router.get('/cuotas/suma/week-and-users', controller.getSumByLastWeekByUser); // Legacy route

/**
 * Get average amount of cuotas for specific month
 * GET /cuotas/stats/average/month/:month
 */
router.get('/cuotas/stats/average/month/:month', controller.getAverageByMonth);

/**
 * Get average amount of cuotas for today
 * GET /cuotas/stats/average/today
 */
router.get('/cuotas/stats/average/today', controller.getAverageByToday);

// ============================================
// PAYMENT LINKS & EMAIL OPERATIONS
// ============================================
/**
 * Generate payment link for alumno and month
 * POST /cuotas/payment-link
 * Body: { idAlumno, month }
 */
router.post('/cuotas/payment-link', controller.toMakeOneLink);
router.get('/cuota/:idAlumno/:month', controller.toMakeOneLink); // Legacy route

/**
 * Generate email options array for cuotas created today
 * GET /cuotas/emails/options/today
 */
router.get('/cuotas/emails/options/today', controller.toMakeArrayMailOptionsByModel);
router.get('/to-see-mailOptions', controller.toMakeArrayMailOptionsByModel); // Legacy route
router.get('/to-see-mail-options', controller.toMakeArrayMailOptions); // Legacy route (different method)

/**
 * Generate email options array for May payments
 * GET /cuotas/emails/options/month/mayo
 */
router.get('/cuotas/emails/options/month/mayo', controller.toMakeArrayMailOptionsMayo);
router.get('/to-make-links-mayo', controller.toMakeArrayMailOptionsMayo); // Legacy route

/**
 * Generate email options array for June payments
 * GET /cuotas/emails/options/month/junio
 */
router.get('/cuotas/emails/options/month/junio', controller.toMakeArrayMailOptionsJunio);
router.get('/to-make-links-junio', controller.toMakeArrayMailOptionsJunio); // Legacy route

/**
 * Send emails for April cuotas (App endpoint)
 * POST /cuotas/emails/send/abril
 */
router.post('/cuotas/emails/send/abril', controller.App);
router.get('/cuotas/app', controller.App); // Legacy route

export default router;