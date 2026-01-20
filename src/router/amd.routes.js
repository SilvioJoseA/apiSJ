import { Router } from "express";
import controller from "../controller/amd.controller.js";

const router = Router();

// ============================================
// TABLE MANAGEMENT ROUTES
// ============================================
/**
 * Show all AMD tables
 * GET /amd/tables/all
 */
router.get('/amd/tables/all', controller.showAllTables);
router.get('/amd/talents', controller.showAllTables); // Legacy route

/**
 * Show specific AMD tables
 * GET /amd/tables/show
 */
router.get('/amd/tables/show', controller.showTables);
router.get('/amd/show', controller.showTables); // Legacy route

/**
 * Get all records from specific table by name
 * GET /amd/tables/:tableName
 */
router.get('/amd/tables/:tableName', controller.getAllTablesByName);
router.get('/amd/select/:tableName', controller.getAllTablesByName); // Legacy route

/**
 * Alter positions table structure
 * POST /amd/positions/alter
 */
router.post('/amd/positions/alter', controller.alterTablePositions);
router.get('/amd/positions/alter', controller.alterTablePositions); // Legacy route

// ============================================
// SOFT SKILLS ROUTES
// ============================================
/**
 * Get all soft skills
 * GET /amd/soft-skills
 */
router.get('/amd/soft-skills', controller.getSoftSkills);
router.get('/amd/soft_skills', controller.getSoftSkills); // Legacy route

/**
 * Get all employment soft skills
 * GET /amd/employment-soft-skills
 */
router.get('/amd/employment-soft-skills', controller.getEmploymentSoftSkills);
router.get('/amd/emplyment_soft_skills', controller.getEmploymentSoftSkills); // Legacy route

// ============================================
// QUIZ ROUTES
// ============================================
/**
 * Get all quiz questions
 * GET /amd/quiz/questions
 */
router.get('/amd/quiz/questions', controller.getQuizQuestions);
router.get('/amd/quiz_questions', controller.getQuizQuestions); // Legacy route

/**
 * Get all quiz stages
 * GET /amd/quiz/stages
 */
router.get('/amd/quiz/stages', controller.getQuizStages);
router.get('/amd/quiz_stages', controller.getQuizStages); // Legacy route

/**
 * Get all quiz options
 * GET /amd/quiz/options
 */
router.get('/amd/quiz/options', controller.getQuizOptions);
router.get('/amd/quiz_options', controller.getQuizOptions); // Legacy route

/**
 * Get complete quiz structure (stages, questions, and options)
 * GET /amd/quiz/complete
 */
router.get('/amd/quiz/complete', controller.getStagesAndQuestionsAndOrders);
router.get('/amd/quiz_stages_questions_options', controller.getStagesAndQuestionsAndOrders); // Legacy route

// ============================================
// LANGUAGES ROUTES
// ============================================
/**
 * Delete language by ID
 * DELETE /amd/languages/:id
 */
router.delete('/amd/languages/:id', controller.deleteLeguagesById);

/**
 * Delete talent language by language ID
 * DELETE /amd/talent-languages/:languageId
 */
router.delete('/amd/talent-languages/:languageId', controller.deleteTalentLanguageByIdLanguage);
router.delete('/amd/talent_lenguages/:lenguage_id', controller.deleteTalentLanguageByIdLanguage); // Legacy route

// ============================================
// USERS ROUTES
// ============================================
/**
 * Delete AMD user by ID
 * DELETE /amd/users/:id
 */
router.delete('/amd/users/:id', controller.deleteUserById);

// ============================================
// POSITIONS ROUTES
// ============================================
/**
 * Insert new position
 * POST /amd/positions
 */
router.post('/amd/positions', controller.insertPositions);
router.post('/amd/positions/insert', controller.insertPositions); // Legacy route

export default router;