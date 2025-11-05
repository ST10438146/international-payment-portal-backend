import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: ['USD', 'EUR', 'GBP', 'ZAR', 'JPY', 'AUD', 'CAD', 'CHF'],
    uppercase: true
  },
  provider: {
    type: String,
    required: [true, 'Provider is required'],
    enum: ['SWIFT'],
    default: 'SWIFT'
  },
  payeeAccountNumber: {
    type: String,
    required: [true, 'Payee account number is required'],
    trim: true
  },
  payeeAccountName: {
    type: String,
    required: [true, 'Payee account name is required'],
    trim: true
  },
  payeeBankName: {
    type: String,
    required: [true, 'Payee bank name is required'],
    trim: true
  },
  swiftCode: {
    type: String,
    required: [true, 'SWIFT code is required'],
    uppercase: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'submitted', 'completed', 'rejected'],
    default: 'pending'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  submittedAt: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Index for efficient queries
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ status: 1, createdAt: -1 });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;