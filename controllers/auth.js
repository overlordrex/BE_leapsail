const User = require('../models/User.js');
const handleError = require('../utils/error');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const accountSid = 'ACce89c60ee42315c20e97d347bb5564f9';
const authToken = '98db90779cb47336b805807bebe79bb5';
const serviceId = 'VA4dad51595399e49d2c0faf72be535488';

const client = require('twilio')(accountSid, authToken);

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

const register = async (req, res, next) => {
  try {
    const check = await User.findOne({ email: req.body.email });
    if (check) return next(handleError(404, 'User already exist.'));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hash,
      emailToken: crypto.randomBytes(64).toString('hex'),
    });

    const mail = {
      from: ' "Verify your email" <atuzierex@gmail.com>',
      to: user.email,
      subject: 'Leapsail Email verification',
      html: `<h2>${user.firstname}, Thanks for registering</h2>
      <h4>Please verify your email to continue</h4>
      <a href="https://lps-ng-app.herokuapp.com/leapsail/api/auth/verify-email?token=${user.emailToken}">Verify your Email</a>`,
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

const verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });

    if (!user) {
      res.redirect('https://leapsail-web.netlify.app/register');
      return next(handleError(404, 'User does not exist.'));
    } else {
      user.verified = true;
      user.emailToken = null;

      await user.save();
      res.redirect(`https://leapsail-web.netlify.app/otp/${user._id}`);
    }
  } catch (error) {
    next(error);
  }
};

const sendOTP = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(handleError(404, 'User does not exist.'));

  try {
    client.verify.v2
      .services(serviceId)
      .verifications.create({ to: '+1' + user.phoneNumber, channel: 'sms' })
      .then((verification) => {
        console.log(verification.status);
        return res.status(200).json(verification);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  } catch (error) {
    next(error);
  }
};

const verifyMobile = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(handleError(404, 'User does not exist.'));
  try {
    const code = req.body.otp;

    client.verify.v2
      .services('VA4dad51595399e49d2c0faf72be535488')
      .verificationChecks.create({
        to: '+1' + user.phoneNumber,
        code,
      })
      .then((verification_check) => {
        console.log(verification_check.status);
        return res.status(200).json(verification_check);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  } catch (error) {}
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(handleError(404, 'User does not exist.'));

    if (!user.verified) return next(handleError(404, 'This email is Invalid.'));

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

module.exports = { register, verifyEmail, sendOTP, verifyMobile, login };
