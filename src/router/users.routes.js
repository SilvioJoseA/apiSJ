import { Router } from "express";
import userController from "../controller/users.controller.js";

const router = Router();

// ============================================
// HEALTH CHECK ROUTE
// ============================================
/**
 * Health check endpoint for users API
 * GET /users/health
 */
router.get('/users/health', async (req, res) => res.json({ message: 'Api user is functioning' }));
router.get('/users/api', async (req, res) => res.json({ message: 'Api user is functioning' })); // Legacy route

// ============================================
// ADMIN ROUTES - Database Management
// ============================================
/**
 * Create users table
 * GET /users/admin/create-table
 */
router.get('/users/admin/create-table', userController.createTableUsers);
router.get('/users/create', userController.createTableUsers); // Legacy route

// ============================================
// CRUD ROUTES - Basic Operations
// ============================================
/**
 * Get all users
 * GET /users
 */
router.get('/users', userController.getAllUsers);

/**
 * Create new user
 * POST /users
 */
router.post('/users', userController.addUser);

/**
 * Delete user by ID
 * DELETE /users/:id
 */
router.delete('/users/:id', userController.deleteUser);

// ============================================
// AUTHENTICATION ROUTES
// ============================================
/**
 * User login (authenticate user)
 * POST /users/auth/login
 * 
 * @body {string} email - User email
 * @body {string} password - User password
 * @returns {Object} User information if credentials are valid
 */
router.post('/users/auth/login', userController.getUserByUsernameAndPassword);
router.post('/users/login', userController.getUserByUsernameAndPassword); // Legacy route

export default router;