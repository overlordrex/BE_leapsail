import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema(
  {
    currentCountry: { type: String },
    destination: { type: String },
    duration: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Education', EducationSchema);
