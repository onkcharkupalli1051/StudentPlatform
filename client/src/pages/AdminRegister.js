import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "../styles/authenticationStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const AdminRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handlers
  const onFinishHandler = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/admin/adminregister", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully");
        navigate("/adminlogin");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Someting Went Wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h1 className="text-center">Admin Register</h1>
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input type="text" required />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" required />
          </Form.Item>

          {/* Admin ID */}
          <Form.Item
            label="adminID"
            name="adminid"
            rules={[
              {
                required: true,
                message: "Please input provided Admin ID!",
              },
            ]}
          >
            <Input type="number" required />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input type="password" required />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please Confirm Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input type="password" required />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Form.Item>
            <Link to="/adminLogin">
              Admin Already Registered? Click to Login
            </Link>
            <br />
            <Link to="/userlogin">Click to login as user</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AdminRegister;
