import express from 'express';
import {
  createPayment,
  getMyPayments,
  getAllPayments,
  verifyPayment,
  submitToSwift
} from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { paymentValidation } from '../middleware/validation.js';

const router = express.Router();

// Customer routes
router.post('/', protect, authorize('customer'), paymentValidation, createPayment);
router.get('/my-payments', protect, authorize('customer'), getMyPayments);

// Employee routes
router.get('/all', protect, authorize('employee'), getAllPayments);
router.put('/:id/verify', protect, authorize('employee'), verifyPayment);
router.post('/submit-swift', protect, authorize('employee'), submitToSwift);

export default router;