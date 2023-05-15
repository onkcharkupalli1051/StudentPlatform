const express = require("express");
const {
  adminLoginController,
  adminRegisterController,
  authAdminController,
  scheduleSessionController,
  getAdminInfoController,
  usertrackProgressController,
  manageUsersController,
  deleteUserController
} = require("../controllers/adminCtrl");
const authAdminMiddleware = require('../middlewares/authAdminMiddleware')

//router object
const adminrouter = express.Router();

//routes
//LOGIN || POST
adminrouter.post("/adminlogin", adminLoginController);

//REGISTER || POST
adminrouter.post("/adminregister", adminRegisterController);

//Auth ||POST
adminrouter.post("/getadmindata", authAdminMiddleware, authAdminController)

//Add Schedule ||POST
adminrouter.post("/schedulesession", authAdminMiddleware, scheduleSessionController)

//Get Admin INfo ||Post
adminrouter.post("/getadmininfo", authAdminMiddleware, getAdminInfoController)

//Activity || REPORT || Get
adminrouter.get('/trackprogress', authAdminMiddleware, usertrackProgressController)

//Activity || REPORT || Get
adminrouter.get('/manageusers', authAdminMiddleware, manageUsersController)

//Delete User
adminrouter.delete("/deleteuser/:id", authAdminMiddleware, deleteUserController)

module.exports = adminrouter;
