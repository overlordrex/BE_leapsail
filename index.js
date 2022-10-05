import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoute from './routes/auth.js';

const app = express();
dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('DB connected'))
    .catch((err) => console.error(err));
};

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log('Server connected');
});
