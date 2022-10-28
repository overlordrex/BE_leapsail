const express = require('express');
const {
  login,
  register,
  verifyEmail,
  sendOTP,
  verifyMobile,
} = require('../controllers/auth');
const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.get('/send-otp', sendOTP);
router.post('/verify-otp/:id', verifyMobile);
router.post('/login', login);

module.exports = router;
