const mongoose = require('mongoose');
const Employee = require('../models/Employee');

// Email regex pattern for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// @desc    Get all employees (with optional search and department filter)
// @route   GET /api/employees
// @access  Public
const getAllEmployees = async (req, res, next) => {
  try {
    const { search, department, sort } = req.query;
    const filter = {};

    // Search by name or email
    if (search && search.trim() !== '') {
      const sanitizedSearch = search.trim();
      filter.$or = [
        { name: { $regex: sanitizedSearch, $options: 'i' } },
        { email: { $regex: sanitizedSearch, $options: 'i' } },
      ];
    }

    // Filter by department (ignore 'All' or empty)
    if (department && department.trim() !== '' && department.trim().toLowerCase() !== 'all') {
      filter.department = { $regex: new RegExp(`^${department.trim()}$`, 'i') };
    }

    // Sort option — default: newest first
    let sortOption = { createdAt: -1 };
    if (sort === 'oldest')    sortOption = { createdAt: 1 };
    else if (sort === 'name_asc')  sortOption = { name: 1 };
    else if (sort === 'name_desc') sortOption = { name: -1 };

    const employees = await Employee.find(filter).sort(sortOption);

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee by ID
// @route   GET /api/employees/:id
// @access  Public
const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid employee ID format: ${id}`,
      });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Public
const createEmployee = async (req, res, next) => {
  try {
    const { name, email, department, designation } = req.body;

    // Explicit validation before hit
    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push('Name is required and must be at least 2 characters long');
    }
    if (!email || !emailRegex.test(email.trim())) {
      errors.push('A valid email address is required');
    }
    if (!department || department.trim() === '') {
      errors.push('Department is required');
    }
    if (!designation || designation.trim() === '') {
      errors.push('Designation is required');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(', '),
      });
    }

    // Check duplicate email explicitly for immediate clean error message
    const existingEmployee = await Employee.findOne({
      email: email.trim().toLowerCase(),
    });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: `An employee with email '${email.trim()}' already exists`,
      });
    }

    const employee = await Employee.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      department: department.trim(),
      designation: designation.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Public
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, department, designation } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid employee ID format: ${id}`,
      });
    }

    // Explicit validation
    const errors = [];
    if (name !== undefined && (!name || name.trim().length < 2)) {
      errors.push('Name must be at least 2 characters long');
    }
    if (email !== undefined && (!email || !emailRegex.test(email.trim()))) {
      errors.push('A valid email address is required');
    }
    if (department !== undefined && (!department || department.trim() === '')) {
      errors.push('Department cannot be empty');
    }
    if (designation !== undefined && (!designation || designation.trim() === '')) {
      errors.push('Designation cannot be empty');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(', '),
      });
    }

    // Check if email is being updated to an existing one by another employee
    if (email) {
      const duplicateEmail = await Employee.findOne({
        _id: { $ne: id },
        email: email.trim().toLowerCase(),
      });
      if (duplicateEmail) {
        return res.status(400).json({
          success: false,
          message: `An employee with email '${email.trim()}' already exists`,
        });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (email !== undefined) updateData.email = email.trim().toLowerCase();
    if (department !== undefined) updateData.department = department.trim();
    if (designation !== undefined) updateData.designation = designation.trim();

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Public
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid employee ID format: ${id}`,
      });
    }

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data: { id: employee._id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
