import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  forgetPassword,
} from '../controllers/user.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.get('/', getUsers);

router.get('/find/:id', getUser);

router.put('/:id', verifyToken, updateUser);

router.delete('/:id', verifyToken, deleteUser);

router.post('/forgot-password', forgetPassword);

// router.get('/reset-password/:id/:token', resetPassword);

export default router;
