const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  forgetPassword,
  resetPassword,
  resetPassword2,
} = require('../controllers/user.js');

const verifyToken = require('../utils/verifyToken.js');

const router = express.Router();

router.get('/', getUsers);

router.get('/find/:id', getUser);

router.put('/:id', verifyToken, updateUser);

router.delete('/:id', verifyToken, deleteUser);

router.post('/forgot-password', forgetPassword);

router.get('/reset-password/:id/:token', resetPassword);

router.put('/reset-password/:id', resetPassword2);

module.exports = router;
