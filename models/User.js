import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
