import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
    username: string;
    email: string;
    password: string;
    otp?: string;
    otpExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
    _id: mongoose.Types.ObjectId;  // Explicitly define _id
}

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);