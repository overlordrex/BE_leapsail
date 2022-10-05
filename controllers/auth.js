import User from '../models/User.js';
import { handleError } from '../utils/error.js';

export const register = async (req, res, next) => {
  const user = new User({
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(handleError(404, 'User does not exist.'));

    if (req.body.password !== user.password)
      return next(handleError(400, 'Wrong credentials'));

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const products = await User.find();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
