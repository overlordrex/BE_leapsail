const express = require('express');

const {
  addEducation,
  getEducations,
  getEducation,
} = require('../controllers/education.js');

const router = express.Router();

router.post('/', addEducation);
router.get('/', getEducations);
router.get('/find/:id', getEducation);

module.exports = router;
