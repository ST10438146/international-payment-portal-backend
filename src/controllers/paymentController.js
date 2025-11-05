import Payment from '../models/Payment.js';
import User from '../models/User.js';

export const createPayment = async (req, res) => {
  try {
    const {
      amount,
      currency,
      provider,
      payeeAccountNumber,
      payeeAccountName,
      payeeBankName,
      swiftCode
    } = req.body;
    
    const payment = await Payment.create({
      userId: req.user.id,
      amount,
      currency,
      provider,
      payeeAccountNumber,
      payeeAccountName,
      payeeBankName,
      swiftCode,
      status: 'pending'
    });
    
    res.status(201).json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment'
    });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.status(200).json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    console.error('Fetch payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payments'
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const payments = await Payment.find(filter)
      .populate('userId', 'fullName accountNumber')
      .populate('verifiedBy', 'fullName')
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.status(200).json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    console.error('Fetch all payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payments'
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payment = await Payment.findById(id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }
    
    if (payment.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Payment has already been processed'
      });
    }
    
    payment.status = 'verified';
    payment.verifiedBy = req.user.id;
    payment.verifiedAt = Date.now();
    
    await payment.save();
    
    res.status(200).json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment'
    });
  }
};

export const submitToSwift = async (req, res) => {
  try {
    const { paymentIds } = req.body;
    
    if (!Array.isArray(paymentIds) || paymentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No payment IDs provided'
      });
    }
    
    const payments = await Payment.find({
      _id: { $in: paymentIds },
      status: 'verified'
    });
    
    if (payments.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No verified payments found'
      });
    }
    
    // Update all payments to submitted status
    await Payment.updateMany(
      { _id: { $in: paymentIds }, status: 'verified' },
      { 
        $set: { 
          status: 'submitted',
          submittedAt: Date.now()
        } 
      }
    );
    
    // Here you would integrate with actual SWIFT API
    // For now, we just update the status
    
    res.status(200).json({
      success: true,
      message: `${payments.length} payments submitted to SWIFT`,
      count: payments.length
    });
  } catch (error) {
    console.error('Submit to SWIFT error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting payments to SWIFT'
    });
  }
};