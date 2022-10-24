import express from 'express';
import {
  addContact,
  getContact,
  getContacts,
  updateContact,
  deleteContact,
} from '../controllers/contact.js';
const router = express.Router();

router.post('/', addContact);

router.get('/', getContacts);

router.get('/find/:id', getContact);

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);

export default router;
