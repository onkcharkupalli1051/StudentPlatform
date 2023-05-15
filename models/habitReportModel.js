const mongoose = require("mongoose");

const habitReportSchema = new mongoose.Schema({
  report: {
    type: Array,
    required: [true, "Report Is Required"],
  },
  date: {
    type: String,
    required: [true, "Date Is Required"],
  },
  name: {
    type: String,
    required: [true, "Name Is Required"],
  },
  userid: {
    type: String,
    required: [true, "User ID Is Required"],
  },
  timeSpent: {
    type: String,
    required: [true, "Time Spent Is Required"],
  },
});

const habitReportModel = mongoose.model("habitreports", habitReportSchema);
module.exports = habitReportModel;
