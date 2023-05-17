const express = require("express");
const {
  userLoginController,
  userRegisterController,
  authController,
  getAllNotificationController,
  userScheduleController,
  getUserInfoController,
  habitReportController,
  usertrackProgressController,
  userpostProgressController,
  deleteReportController
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware")

//router object
const userrouter = express.Router();

//routes
//LOGIN || POST
userrouter.post('/userlogin', userLoginController);

//REGISTER || POST
userrouter.post('/userregister', userRegisterController);

//Notification || POST
userrouter.post('/get-all-notification', authMiddleware, getAllNotificationController)

//Schedule || Get
userrouter.get('/userschedule', authMiddleware, userScheduleController)

// POST || User Profile for display
userrouter.post('/getUserInfo', authMiddleware, getUserInfoController)

//AUTH || POST
userrouter.post('/getUserData', authMiddleware, authController)

//Habit REPORT
userrouter.post("/habitreport", authMiddleware, habitReportController)

//Activity || REPORT || Get
userrouter.get('/trackprogress', authMiddleware, usertrackProgressController)

//post progress
userrouter.post('/postprogress', authMiddleware, userpostProgressController)

//Delete report
userrouter.delete("/deletereport/:id", authMiddleware, deleteReportController);
module.exports = userrouter;
