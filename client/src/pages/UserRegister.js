import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/authenticationStyles.css";
import main from "../assets/sandeepPatil.png"
import logo from "../assets/dnalogo.png"
import "../styles/UserRegister.css"

const UserRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handlers
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/userregister', values)
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully")
        navigate('/userlogin')
      } else {
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
      <section className="userRegisterForm mt-4">
        <div className="container">
          <div className="row userRegisterRow">
            <div className="col-lg-5">
              <img src={main} alt="Main Image" className="img-fluid dna-img-register" />
            </div>
            <div className="col-lg-7 box ">
              <div className="img-title">
                {/* <img src={logo} alt="logo" className="logo" /> */}
                <h3 className="title">
                  The <span className="mainText">DNA</span>-Confidence
                  <br />
                  <h4 style={{marginLeft:"90px"}}>Student Platform</h4>
                <h4 style={{marginLeft:"83px"}} className="anchor">Register New User</h4>
                </h3>

              </div>
              <Form
                // layout="vertical"
                onFinish={onFinishHandler}
                className="register-form"
              >
                {/* <h1 className="text-center registerForm__title">User Register</h1> */}
                {/* Name */}
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input type="text" required className="p-2" placeholder="Name" />
                </Form.Item>

                {/* Email */}
                <Form.Item
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
                  <Input type="email" required className="p-2" placeholder="Email" />
                </Form.Item>

                {/* Phone Number */}
                <Form.Item
                  name="phonenumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone Number!",
                    },
                  ]}
                >
                  <PhoneInput
                    country={"in"}
                    value={inputPhoneNumber}
                    onChange={(phone) => setInputPhoneNumber(phone)}
                    
                  />
                </Form.Item>

                {/* Password */}
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon p-2" />}
                    placeholder="Password"
                  />
                </Form.Item>

                {/* Confirm Password */}
                <Form.Item
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
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon p-2" />}
                    placeholder="Confirm Password"
                  />
                </Form.Item>

                <Button type="danger" htmlType="submit" className="register-btn submit-btn">
                  Register
                </Button>
                <br /><br />
                <Form.Item>
                  <Link to="/userlogin" className="anchor">User Already Registered? Click to Login</Link>
                  <br />
                  <Link to="/adminregister" className="anchor">Click to Register New Admin</Link>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserRegister;
