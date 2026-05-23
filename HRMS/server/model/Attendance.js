// models/Attendance.js

import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    // Employee collection ke empId se connected
    empId: {
      type: String,
      required: true,
      ref: "Employee",
    },

    date: {
      type: String,
      required: true,
    },

    loginTime: {
      type: String,
      required: true,
    },

    logoutTime: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;