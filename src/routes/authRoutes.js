import express from 'express';
import { login, logout, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { loginValidation } from '../middleware/validation.js';
import { authLimiter } from '../middleware/security.js';

const router = express.Router();

router.post('/login', authLimiter, loginValidation, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;