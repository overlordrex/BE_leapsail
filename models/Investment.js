import mongoose from 'mongoose';

const InvestmentSchema = new mongoose.Schema(
  {
    investment: { type: Number },
    duration: { type: String },
    payout: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model('Investment', InvestmentSchema);
