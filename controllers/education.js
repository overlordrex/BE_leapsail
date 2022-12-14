const Education = require('../models/Education.js');
const handleError = require('../utils/error');

const addEducation = async (req, res, next) => {
  const employeeInfo = new Education(req.body);
  try {
    const employee = await employeeInfo.save();
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const getEducations = async (req, res, next) => {
  try {
    const educationsPackages = await Education.find();

    res.status(200).json(educationsPackages);
  } catch (error) {
    next(error);
  }
};

const getEducation = async (req, res, next) => {
  try {
    const educationsPackage = await Education.findOne({ _id: req.params.id });

    if (!educationsPackage) return next(handleError(404, 'data not found'));
    res.status(200).json(educationsPackage);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEducation,
  getEducations,
  addEducation,
};
