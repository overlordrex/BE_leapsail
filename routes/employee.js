const express = require('express');
const {
  addEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employee.js');
const router = express.Router();

router.post('/', addEmployee);

router.get('/', getEmployees);

router.get('/find/:id', getEmployee);

router.put('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

module.exports = router;
