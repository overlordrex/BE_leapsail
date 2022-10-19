import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
    department: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Employee', EmployeeSchema);
