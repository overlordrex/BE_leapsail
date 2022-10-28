const Employee = require('../models/Employee.js');
const handleError = require('../utils/error');

const addEmployee = async (req, res, next) => {
  const employeeInfo = new Employee(req.body);
  try {
    const employee = await employeeInfo.save();
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });

    if (!employee) return next(handleError(404, 'data not found'));
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json('Updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json('deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  addEmployee,
};
