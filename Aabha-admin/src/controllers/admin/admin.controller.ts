import { Request, Response } from 'express';
import { Admin, IAdmin } from '../../models/adminModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Define interface for JWT payload
interface JWTPayload {
    id: string;
}

const generateAccessToken = (adminId: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (adminId: string) => {
    if (!process.env.JWT_REFRESH_SECRET) {
        throw new Error('JWT_REFRESH_SECRET is not defined');
    }
    return jwt.sign({ id: adminId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            res.status(400).json({ message: 'Admin already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword
        });

        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin', error });
    }
};

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        // Generate tokens
        const accessToken = generateAccessToken(admin._id.toString());
        const refreshToken = generateRefreshToken(admin._id.toString());

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;

    if (!token) {
        res.status(401).json({ message: 'Refresh token is required' });
        return;
    }

    try {
        if (!process.env.JWT_REFRESH_SECRET) {
            throw new Error('JWT_REFRESH_SECRET is not defined');
        }
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JWTPayload;
        const accessToken = generateAccessToken(decoded.id);
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};
