import React from "react";
import { Form, Input, Button, message } from "antd";
import "../styles/authenticationStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import main from "../assets/sandeepPatil.png";
import logo from "../assets/dnalogo.png";

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
        navigate("/schedulesession");
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
      <section className="adminLoginForm mx-5 mt-4">
        <div className="container">
          <div
            className="row adminLoginRow"
            style={{
              backgroundColor: "#000",
              borderRadius: "30px",
              boxShadow: "12px 12px 22px rgb(60, 59, 59)",
            }}
          >
            <div className="col-lg-5">
              <img src={main} alt="Main Image" className="img-fluid dna-img" />
            </div>

            <div className="col-lg-7 box px-5 py-5">
              <div className="img-title">
                <img src={logo} alt="logo" className="logo" />
                <h3 className="title">
                  The <span className="mainText">DNA</span>-Confidence
                  <br />
                  <h4 style={{ marginLeft: "90px" }}>Student Platform</h4>
                  <h4 style={{ marginLeft: "110px" }} className="anchor">
                    Admin Login
                  </h4>
                </h3>
              </div>
              <Form
                layout="vertical"
                onFinish={onFinishHandler}
                className="login-form"
                style={{ width: "60%" }}
              >
                {/* <h1 className="text-center">Admin Login</h1> */}

                {/* Email */}
                <Form.Item
                  // label="Email"
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
                  <Input
                    type="email"
                    required
                    placeholder="Email"
                    className="p-2"
                  />
                </Form.Item>

                {/* Admin ID */}
                <Form.Item
                  // label="adminID"
                  name="adminid"
                  rules={[
                    {
                      required: true,
                      message: "Please input provided Admin ID!",
                    },
                  ]}
                >
                  <Input
                    type="password"
                    required
                    placeholder="Enter your Id"
                    className="p-2"
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
                >
                  <Input
                    type="password"
                    required
                    placeholder="Password"
                    className="p-2"
                  />
                </Form.Item>

                <Button htmlType="submit" className="login-btn submit-btn">
                  Login
                </Button>
                <br />
                <br />
                <Form.Item>
                  <Link to="/adminregister" className="anchor">
                    Admin Not Registered? Click to Register
                  </Link>
                  <br />
                  <Link to="/userlogin" className="anchor">
                    Click to login as user
                  </Link>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
