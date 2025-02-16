import { Request, Response } from 'express';
import { Admin } from '../../models/adminModel';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
            return;
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Save OTP to admin document (you might want to hash it for security)
        admin.otp = otp;
        admin.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
        await admin.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Password Reset',
            text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP', error });
    }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
            return;
        }

        // Check if OTP is valid
        if (admin.otp !== otp || !admin.otpExpires || admin.otpExpires < new Date()) {
            res.status(400).json({ message: 'Invalid or expired OTP' });
            return;
        }

        // OTP is valid, proceed with password reset
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { email, otp, newPassword } = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
            return;
        }

        // Check if OTP is valid
        if (admin.otp !== otp || !admin.otpExpires || admin.otpExpires < new Date()) {
            res.status(400).json({ message: 'Invalid or expired OTP' });
            return;
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the admin's password
        admin.password = hashedPassword;
        admin.otp = undefined;
        admin.otpExpires = undefined;
        await admin.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
};