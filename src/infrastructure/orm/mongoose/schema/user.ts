import mongoose, { Schema, Document } from 'mongoose';

import { User } from '../../../../domain/entities/user';

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<User & Document>('User', UserSchema);
