import React from "react";
import { Form, Input, Button, message } from "antd";
import "../styles/authenticationStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import main from "../assets/sandeepPatil.png"
// import logo from "../assets/dnalogo.png"

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
      <section className="adminRegisterForm mt-4">
        <div className="container">
          <div className="row adminRegisterRow" style={{ backgroundColor: '#000', borderRadius: '30px', boxShadow: '12px 12px 22px rgb(60, 59, 59)' }}>
            <div className="col-lg-5">
              <img src={main} alt="Main Image" className="img-fluid dna-img-register" />
            </div>
            <div className="col-lg-7 box">
              <div className="img-title">
                {/* <img src={logo} alt="logo" className="logo" /> */}
                <h3 className="title">
                  The <span className="mainText">DNA</span>-Confidence
                  <br />
                  <h4 style={{marginLeft:"90px"}} >Student Platform</h4>
                <h4 style={{marginLeft:"95px"}} className="anchor">Admin Register</h4>
                </h3>
                

              </div>
              <Form
                layout="vertical"
                onFinish={onFinishHandler}
                className="register-form"
                style={{width:'60%'}}
              >
                {/* <h1 className="text-center">Admin Register</h1> */}
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
                  <Input type="text" required placeholder="Enter your Name" className="p-2" />
                </Form.Item>

                {/* Email */}
                <Form.Item
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
                  <Input type="email" required placeholder="Email" className="p-2" />
                </Form.Item>

                {/* Admin ID */}
                <Form.Item
                  name="adminid"
                  rules={[
                    {
                      required: true,
                      message: "Please input provided Admin ID!",
                    },
                  ]}
                >
                  <Input type="password" required placeholder="Admin Id" className="p-2" />
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
                >
                  <Input type="password" required placeholder="Password" className="p-2" />
                </Form.Item>

                {/* Confirm Password */}
                <Form.Item
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
                  <Input type="password" required placeholder="Confirm Password" className="p-2" />
                </Form.Item>

                <Button className="register-btn submit-btn" htmlType="submit">
                  Register
                </Button>
                <br /><br />
                <Form.Item>
                  <Link to="/adminLogin" className="anchor">
                    Admin Already Registered? Click to Login
                  </Link>
                  <br />
                  <Link to="/userlogin" className="anchor">Click to login as user</Link>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminRegister;
