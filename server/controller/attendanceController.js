// controllers/attendanceController.js

import Attendance from "../models/Attendance.js";



// ======================================================
// 1. GET ATTENDANCE BY DATE + EMPLOYEE ID
// ======================================================
// Input:
// {
//    empId: "EMP001",
//    date: "01-04-2024"
// }

export const getAttendanceByDate = async (req, res) => {
  try {
    const { empId, date } = req.body;

    // Validation
    if (!empId || !date) {
      return res.status(400).json({
        success: false,
        message: "empId and date are required",
      });
    }

    // Find attendance
    const attendance = await Attendance.findOne({
      empId,
      date,
    });

    // If not found
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    // Response
    return res.status(200).json({
      success: true,
      data: {
        empId: attendance.empId,
        date: attendance.date,
        loginTime: attendance.loginTime,
        logoutTime: attendance.logoutTime,
      },
    });
  } catch (error) {
    console.log("Get Attendance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// ======================================================
// 2. GET MONTHLY ATTENDANCE
// ======================================================
// Input:
// {
//    empId: "EMP001",
//    month: "04",
//    year: "2024"
// }

export const getMonthlyAttendance = async (req, res) => {
  try {
    const { empId, month, year } = req.body;

    // Validation
    if (!empId || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "empId, month and year are required",
      });
    }

    // Regex format:
    // 01-04-2024
    // 02-04-2024
    // etc.

    const regexDate = new RegExp(`^\\d{2}-${month}-${year}$`);

    // Find all attendance
    const attendances = await Attendance.find({
      empId,
      date: { $regex: regexDate },
    }).sort({ date: 1 });

    // If no data found
    if (attendances.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No attendance found",
      });
    }

    // Create custom response object
    const formattedData = {};

    attendances.forEach((item) => {
      formattedData[item.date] = {
        Login: item.loginTime,
        Logout: item.logoutTime,
      };
    });

    // Final response
    return res.status(200).json({
      success: true,
      empId,
      month,
      year,
      attendance: formattedData,
    });
  } catch (error) {
    console.log("Monthly Attendance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};