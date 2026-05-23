

import Employee from "../models/Employee.js";

// POST /api/employees
export const createEmployee = async (req, res) => {
  try {
    const { name, empId, phone, presentAddress, gender, email, password } = req.body;

    if (!name || !empId || !phone || !presentAddress || !gender || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingEmployee = await Employee.findOne({
      $or: [{ empId }, { email }],
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee ID or email already exists",
      });
    }

    const employee = await Employee.create({
      name,
      empId,
      phone,
      presentAddress,
      gender,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET /api/employees/:id
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};