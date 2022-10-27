import express from 'express';

import {
  addEducation,
  getEducations,
  getEducation,
} from '../controllers/education.js';

const router = express.Router();

router.post('/', addEducation);
router.get('/', getEducations);
router.get('/find/:id', getEducation);

export default router;
