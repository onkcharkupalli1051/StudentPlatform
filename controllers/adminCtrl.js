const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const colors = require("colors");
const adminModel = require("../models/adminModel");
const ScheduleModel = require("../models/ScheduleModel");
const userModel = require("../models/userModel");
const habitReportModel = require("../models/habitReportModel");

//resgister callback
const adminRegisterController = async (req, res) => {
  try {
    const existingAdmin = await adminModel.findOne({
      $or: [{ email: req.body.email }, { adminid: req.body.adminid }],
    });
    if (existingAdmin) {
      return res
        .status(200)
        .send({ message: "Admin Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newAdmin = new adminModel(req.body);
    await newAdmin.save();
    res
      .status(201)
      .send({ message: "Admin Registration Success", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Admin Register Controller ${error.message}`,
    });
  }
};

const adminLoginController = async (req, res) => {
  try {
    const admin = await adminModel.findOne({ email: req.body.email });
    if (!admin) {
      return res
        .status(200)
        .send({ message: "Admin Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email Or Password", success: false });
    }
    if (admin.adminid !== req.body.adminid) {
      return res
        .status(200)
        .send({ message: "Invalid Admin ID", success: false });
    }

    const admintoken = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "Login Success",
      success: true,
      admintoken,
      usertype: "admin",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Admin Login Controller ${error.message}`,
    });
  }
};

const authAdminController = async (req, res) => {
  try {
    const admin = await adminModel.findOne({ _id: req.body.adminId });
    if (!admin) {
      return res.status(200).send({
        message: "Admin Not Found",
        success: false,
      });
    } else {
      admin.password = undefined;
      res.status(200).send({
        success: true,
        data: admin,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Auth Error", success: false, error });
  }
};

const scheduleSessionController = async (req, res) => {
  try {
    const newSchedule = await ScheduleModel({ ...req.body });
    await newSchedule.save();

    const user = await userModel.find();
    console.log(colors.bgCyan.white(user));
    user.map((u) => {
      const notification = u.notification;
      console.log(colors.green.white(notification));
      notification.push({
        message: `${newSchedule.title} scheduled on ${newSchedule.date} at ${newSchedule.time}`,
        onclickPath: "/userschedule",
      });
      u.save();
      console.log(colors.bgCyan.white(notification));
    });

    const admin = await adminModel.find();
    admin.map((a) => {
      const notification = a.notification;
      notification.push({
        message: `${newSchedule.title} scheduled on ${newSchedule.date} at ${newSchedule.time}`,
      });
      a.save();
    });

    res.status(201).send({
      success: true,
      message: "Schedule Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error Scheduling Session",
    });
  }
};

// POST || GEt ADMIN PROFILE INFO
const getAdminInfoController = async (req, res) => {
  try {
    const admin = adminModel.find({ _id: req.body.userId });

    res.status(200).send({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching Admin details",
      error,
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

const manageUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (!users) {
      return res.status(200).send({
        message: "Error retrieving users",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "Users Data",
        success: true,
        data: users,
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

const deleteUserController = async (req, res) => {
  try {
    let {id} = req.params;
    // console.log();
    // console.log(typeof oldid);
    // console.log(oldid);

    // const id = oldid["id"].toString().slice(1);
    // console.log();
    // console.log(typeof id);
    // console.log(id);

    // const newid = JSON.parse(`{ "id":"${id}"}`);
    // console.log();
    // console.log(typeof newid);
    // console.log(newid);

    const user = await userModel.findOne({_id: id});
    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }else {
      await user.deleteOne();
      res.status(200).send({
        message: "User Deleted",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error Deleting User",
    });
  }
};

module.exports = {
  adminLoginController,
  adminRegisterController,
  authAdminController,
  scheduleSessionController,
  getAdminInfoController,
  usertrackProgressController,
  manageUsersController,
  deleteUserController,
};
