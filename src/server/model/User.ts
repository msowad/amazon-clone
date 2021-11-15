import { User } from '@/src/types/User';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User ||
  mongoose.model<User & mongoose.Document>('User', UserSchema);
