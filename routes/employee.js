import express from 'express';
import {
  addEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.js';
const router = express.Router();

router.post('/', addEmployee);

router.get('/', getEmployees);

router.get('/find/:id', getEmployee);

router.put('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

export default router;
