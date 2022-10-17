import express from 'express';
import { getUsers, login, register } from '../controllers/auth.js';
const router = express.Router();

console.log('local');

router.get('/', getUsers);
router.post('/register', register);
router.get('/verify-email', register);
router.post('/login', login);

export default router;
