import Contact from '../models/Contact.js';
import { handleError } from '../utils/error.js';

export const addContact = async (req, res, next) => {
  const contactInfo = new Contact(req.body);
  try {
    const userContact = await contactInfo.save();
    res.status(200).json(userContact);
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id });

    if (!contact) return next(handleError(404, 'Contact not found'));
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  // const user = await Contact.findOne({ _id: req.params.id });

  try {
    // if (user._id === req.params.id) {
    await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json('Updated successfully');
    // res.send({ userId: user._id, params: req.params.id, user: user });
    // res.send('works like magic');
    // } else {
    //   return next(handleError(404, 'Not allowed'));
    // }
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    // const user = await Contact.findOne({ _id: req.params.id });

    // if (user._id === req.params.id) {
    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json('deleted successfully');
    // } else {
    //   return next(handleError(404, 'Not allowed'));
    // }
  } catch (error) {
    next(error);
  }
};
