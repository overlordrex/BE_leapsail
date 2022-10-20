import User from '../models/User.js';
import { handleError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// const sendRestPasswordMail = async (name , email , token)=>{
//   try {

//   } catch (error) {
//     res.status(400).send(error)
//   }
// }

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'atuzierex0@gmail.com',
    pass: 'rroekeylxsylmzqc',
  },
});

export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  } else {
    next(handleError(403, 'You can update only your account'));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json('User has been deleted');
    } catch (error) {
      next(error);
    }
  } else {
    next(handleError(403, 'You can delete only your account'));
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const randomString = crypto.randomBytes(64).toString('hex');

      const data = await User.updateOne(
        { email: req.body.email },
        { $set: { token: randomString } }
      );

      const mail = {
        from: 'atuzierex0@gmail.com',
        to: user.email,
        subject: 'Reset Password',
        html: `<p> Hi ${user.firstname} , Click the link to reset Password <a href="https://lps-ng-app.herokuapp.com/api/user/reset-password?token=${randomString}">Reset Password</a> </p>`,
      };

      transporter.sendMail(mail, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log('Mail has been sent ', info.response);
        }
      });

      res.status(200).json('Check your email and reset password');
      // const token = jwt.sign(
      //   { email: user.email, id: user._id },
      //   process.env.JWT,
      //   { expiresIn: '15m' }
      // );

      // res.send(user);
      // const link = `https://lps-ng-app.herokuapp.com/api/user/reset-password/${user._id}/${token}`;
      // res.send(link);

      // console.log(link);
    } else {
      next(handleError(403, 'This user does not exist'));
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) return next(handleError(404, 'User does not exist.'));
  try {
    const verify = jwt.verify(token, process.env.JWT);
    res.send('Verified');
  } catch (error) {
    next(error);
  }
};
