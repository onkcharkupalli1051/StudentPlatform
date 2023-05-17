const userModel = require("../models/userModel");
const ScheduleModel = require("../models/ScheduleModel");
const habitReportModel = require("../models/habitReportModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const colors = require("colors");

//register callback
const userRegisterController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res
      .status(201)
      .send({ message: "User Registration Success", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `User Register Controller ${error.message}`,
    });
  }
};

const userLoginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email Or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "Login Success",
      success: true,
      token,
      usertype: "user",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `User Login Controller ${error.message}`,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });

    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    } else {
      user.password = undefined;
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Auth Error", success: false, error });
  }
};

const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.find({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      message: "Notifications Read",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Someting Went Wrong",
      success: false,
      error,
    });
  }
};

const userScheduleController = async (req, res) => {
  try {
    const schedule = await ScheduleModel.find({});
    if (!schedule) {
      return res.status(200).send({
        message: "Error retrieving schedule",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "Schedule Data",
        success: true,
        data: schedule,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Someting Went Wrong",
      success: false,
      error,
    });
  }
};

const getUserInfoController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      message: "User Data Fetch Success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching user details",
      error,
    });
  }
};

const habitReportController = async (req, res) => {
  try {
    //16 May Logic
    const exist = await habitReportModel.findOne({ date: req.body.date });
    if (!exist) {
      //saving data  to habit report collection
      const newHabitReport = new habitReportModel(req.body);
      await newHabitReport.save();

      //notifying user
      // const user = await userModel.find({_id: newHabitReport._id});
      // console.log(colors.bgCyan.white(user));
      // const notification = user.notification;
      // console.log(colors.green.white(notification));
      // notification.push({
      //   message: `Habit Report of date ${newHabitReport.date} Submitted}`,
      // });
      // user.save();
      // console.log(colors.bgCyan.white(notification));

      res.status(201).send({
        success: true,
        message: "Reporting Successfull",
      });

      console.log(req.date);
    } else {
      await exist.deleteOne();

      const newHabitReport = new habitReportModel(req.body);
      await newHabitReport.save();

      res.status(200).send({
        message: "Report Updated",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error Habit Reporting",
    });
  }
};

const usertrackProgressController = async (req, res) => {
  try {
    const progress = await habitReportModel.find({});
    if (!progress) {
      return res.status(200).send({
        message: "Error retrieving progress",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "Progress Data",
        success: true,
        data: progress,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Someting Went Wrong",
      success: false,
      error,
    });
  }
};

const userpostProgressController = async (req, res) => {
  try {
    const result = await habitReportModel.find({ userid: req.body.userid });
    if (!result) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    res.status(200).send({
      message: "User Progress Success",
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Post Progress ${error.message}`,
    });
  }
};

const deleteReportController = async (req, res) => {
  try {
    let { id } = req.params;

    const report = await habitReportModel.findOne({ _id: id });
    if (!report) {
      return res.status(200).send({
        message: "Report Not Found",
        success: false,
      });
    } else {
      await report.deleteOne();
      res.status(200).send({
        message: "Report Deleted",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error Deleting Report",
    });
  }
};

module.exports = {
  userLoginController,
  userRegisterController,
  authController,
  getAllNotificationController,
  userScheduleController,
  getUserInfoController,
  habitReportController,
  usertrackProgressController,
  userpostProgressController,
  deleteReportController,
};
