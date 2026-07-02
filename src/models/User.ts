import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    emailVerifyToken: string | null;
    emailVerifyTokenExpiry: Date | null;
    resetPasswordToken: string | null;
    resetPasswordTokenExpiry: Date | null;

    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default:"" },
    isVerified: { type: Boolean, default: false },
    emailVerifyToken: { type: String, default: null },
    emailVerifyTokenExpiry: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordTokenExpiry: { type: Date, default: null },
}, { timestamps: true });

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));
export default UserModel;