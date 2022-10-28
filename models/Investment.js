const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema(
  {
    investment: { type: Number },
    duration: { type: String },
    payout: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Investment', InvestmentSchema);
