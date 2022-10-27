import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import contactRoute from './routes/contact.js';
import employeeRoute from './routes/employee.js';
import educationRoute from './routes/education.js';

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
app.use(cookieParser());

app.use('/leapsail/api/auth', authRoute);
app.use('/leapsail/api/user', userRoute);
app.use('/leapsail/api/contact', contactRoute);
app.use('/leapsail/api/employee', employeeRoute);
app.use('/leapsail/api/education', educationRoute);

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
