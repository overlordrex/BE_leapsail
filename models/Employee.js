const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true },
    address: { type: String },
    contact: { type: String },
    sex: { type: String },
    stateOfOrigin: { type: String },
    religion: { type: String },
    isAdmin: { type: Boolean, default: false },
    department: { type: String },
    designation: { type: String },
    nextOfKin: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', EmployeeSchema);
