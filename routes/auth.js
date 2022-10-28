import express from 'express';
import {
  login,
  register,
  verifyEmail,
  sendOTP,
  verifyMobile,
} from '../controllers/auth.js';
const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/send-otp/:id', sendOTP);
router.post('/verify-otp/:id', verifyMobile);
router.post('/login', login);

export default router;
