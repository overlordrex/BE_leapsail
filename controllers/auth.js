import User from '../models/User.js';
import { handleError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: 'atuzierex0@gmail.com',
    pass: 'rroekeylxsylmzqc',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const register = async (req, res, next) => {
  try {
    const check = await User.findOne({ email: req.body.email });
    if (check) return next(handleError(404, 'User already exist.'));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password: hash,
      emailToken: crypto.randomBytes(64).toString('hex'),
    });

    const mail = {
      from: ' "Verify your email" <atuzierex@gmail.com>',
      to: user.email,
      subject: 'Leapsail Email verification',
      html: `<h2>${user.firstname}, Thanks for registering</h2>
      <h4>Please verify your email to continue</h4>
      <a href="https://lps-ng-app.herokuapp.com/api/auth/verify-email?token=${user.emailToken}">Verify your Email</a>`,
    };

    await user.save();

    transporter.sendMail(mail, (err, info, next) => {
      if (err) {
        res.send(err);
        return next(handleError(404, 'Email does not exist.'));
      } else {
        res.status(200).json(info);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token;
    res.semd(token);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(handleError(404, 'User does not exist.'));
    } else {
      user.verified = true;
      user.emailToken = null;

      await user.save();
    }

    const confirmPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!confirmPassword) return next(handleError(400, 'Password incorrect.'));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...others } = user._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};
