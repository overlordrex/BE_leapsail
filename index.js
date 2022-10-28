const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const contactRoute = require('./routes/contact.js');
const employeeRoute = require('./routes/employee.js');
const educationRoute = require('./routes/education.js');

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
