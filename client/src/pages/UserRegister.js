import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form, Input, Button, message } from "antd";
import "../styles/authenticationStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../redux/features/alertSlice";

const UserRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handlers
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/userregister', values)
      dispatch(hideLoading());
      if(res.data.success){
        message.success("Registered Successfully")
        navigate('/userlogin')
      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Someting Went Wrong");
    }
  };
  const [inputPhoneNumber, setInputPhoneNumber] = useState("")

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h1 className="text-center">User Register</h1>
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
                type: 'email',
                message: 'The input is not valid E-mail!',
              },    
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" required />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phonenumber"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <PhoneInput
              country={"us"}
              value={inputPhoneNumber}
              onChange={(phone) => setInputPhoneNumber(phone)}
            />
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
            hasFeedback
          >
            <Input type="password" required />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please Confirm Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
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
            <Link to="/userlogin">User Already Registered? Click to Login</Link>
            <br />
            <Link to="/adminregister">Click to Register New Admin</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UserRegister;
