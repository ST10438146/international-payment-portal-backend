import { body, param, validationResult } from 'express-validator';
import { patterns } from '../utils/validation.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

export const loginValidation = [
  body('username')
    .trim()
    .matches(patterns.username)
    .withMessage('Invalid username format'),
  body('accountNumber')
    .trim()
    .matches(patterns.accountNumber)
    .withMessage('Invalid account number format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateRequest
];

export const paymentValidation = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be greater than 0'),
  body('currency')
    .matches(patterns.currency)
    .withMessage('Invalid currency'),
  body('provider')
    .equals('SWIFT')
    .withMessage('Only SWIFT provider is supported'),
  body('payeeAccountNumber')
    .trim()
    .matches(patterns.accountNumber)
    .withMessage('Invalid payee account number'),
  body('payeeAccountName')
    .trim()
    .matches(patterns.fullName)
    .withMessage('Invalid payee account name'),
  body('payeeBankName')
    .trim()
    .matches(patterns.bankName)
    .withMessage('Invalid bank name'),
  body('swiftCode')
    .trim()
    .toUpperCase()
    .matches(patterns.swiftCode)
    .withMessage('Invalid SWIFT code format'),
  validateRequest
];