import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    email: { type: String, unique: true },
    phoneNumber: { type: String },
    productType: { type: String },
    enquiryType: { type: String },
    others: { type: String, default: '' },
    duration: { type: String, default: '' },
    payout: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model('Contact', ContactSchema);
