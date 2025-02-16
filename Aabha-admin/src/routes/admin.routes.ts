import express from 'express';
import { registerAdmin, loginAdmin, refreshToken } from '../controllers/admin/admin.controller';
import { validateAdminRegistration, validateAdminLogin } from '../middleware/admin.middleware';

const router = express.Router();

// Admin registration route
router.post('/register', validateAdminRegistration, registerAdmin);

// Admin login route
router.post('/login', validateAdminLogin, loginAdmin);

// Refresh token route
router.post('/refresh-token', refreshToken);

export default router;