import Employee from '../models/Employee.js';
import { handleError } from '../utils/error.js';

export const addEmployee = async (req, res, next) => {
  const employeeInfo = new Employee(req.body);
  try {
    const employee = await employeeInfo.save();
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });

    if (!employee) return next(handleError(404, 'data not found'));
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  // const user = await Contact.findOne({ _id: req.params.id });

  try {
    // if (user._id === req.params.id) {
    await Employee.findByIdAndUpdate(
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

export const deleteEmployee = async (req, res, next) => {
  try {
    // const user = await Contact.findOne({ _id: req.params.id });

    // if (user._id === req.params.id) {
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json('deleted successfully');
    // } else {
    //   return next(handleError(404, 'Not allowed'));
    // }
  } catch (error) {
    next(error);
  }
};

// export const department = async (req, res, next) => {
//   try {
//     const department = await Employee.find().sort({ department: 1 });
//     if () return next(handleError(404, 'Not found'));
//     res.status(200).json(video);
//   } catch (err) {
//     next(err);
//   }
// };
