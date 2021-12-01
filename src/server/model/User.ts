import { User } from '@/src/types/User';
import mongoose, { PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerifiedAt: {
      type: Date,
      nullable: true,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

export const UserModel: PaginateModel<User> =
  (mongoose.models.User as PaginateModel<User>) ||
  (mongoose.model<User & mongoose.Document>(
    'User',
    UserSchema
  ) as PaginateModel<User>);
