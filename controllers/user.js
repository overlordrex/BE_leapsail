import User from '../models/User.js';
import { handleError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT,
        { expiresIn: '5m' }
      );

      res.send(user);
      const link = `https://lps-ng-app.herokuapp.com/api/user/reset-password/${user._id}/${token}`;

      console.log(link);
    } else {
      next(handleError(403, 'This user does not exist'));
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    res.send({ id, token });
    console.log(id, token);
    res.send('DONE');
  } catch (error) {
    next(error);
  }
};
