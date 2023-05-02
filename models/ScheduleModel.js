const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Is Required"],
  },
  date: {
    type: String,
    required: [true, "Date Is Required"],
  },
  time: {
    type: String,
    required: [true, "Date Is Required"],
  },
});

const ScheduleModel = mongoose.model("schedules", ScheduleSchema);
module.exports = ScheduleModel;
