import React from "react";
import { Form, Input, Button, message } from "antd";
import "../styles/authenticationStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handlers
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("api/v1/admin/adminlogin", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("admintoken", res.data.admintoken);
        localStorage.setItem("usertype", res.data.usertype);
        message.success("Login Success");
        navigate("/adminhomepage");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
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
          <h1 className="text-center">Admin Login</h1>

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

          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Form.Item>
            <Link to="/adminregister">Not Registered? Click to Register</Link>
            <br />
            <Link to="/userlogin">Click to login as user</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AdminLogin;
