const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema(
  {
    currentCountry: { type: String },
    destination: { type: String },
    duration: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', EducationSchema);
