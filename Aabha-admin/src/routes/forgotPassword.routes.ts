import express from 'express';
import { sendOtp, verifyOtp, resetPassword } from '../controllers/admin/forgotPassword.controller';

const router = express.Router();

// Route to send OTP
router.post('/send-otp', sendOtp);

// Route to verify OTP
router.post('/verify-otp', verifyOtp);

// Route to reset password
router.post('/reset-password', resetPassword);

export default router;