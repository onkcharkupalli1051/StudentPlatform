import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import main from "../assets/sandeepPatil.png";
import logo from "../assets/dnalogo.png";
import "../styles/UserLogin.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handlers
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("api/v1/user/userlogin", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usertype", res.data.usertype);
        message.success("Login Success");
        navigate("/userschedule");
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
      <section className="userLoginForm mt-4">
        <div className="container">
          <div className="row userLoginRow">
            <div className="col-lg-5">
              <img src={main} alt="Main Image" className="img-fluid dna-img" />
            </div>
            <div className="col-lg-7 box">
              <div className="img-title">
                <img className="logo" src={logo} alt="logo" />
                <h3 className="title">
                  The <span className="mainText">DNA</span>-Confidence
                  <br />
                  <h4 style={{ marginLeft: "90px" }}>Student Platform</h4>
                  <h4 style={{ marginLeft: "120px" }} className="anchor">
                    User Login
                  </h4>
                </h3>
              </div>
              <Form
                name="normal_login"
                className="userLogin-form"
                initialValues={{ remember: true }}
                onFinish={onFinishHandler}
              >
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
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    className="p-2"
                  />
                  {/* Password */}
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={
                      <LockOutlined className="site-form-item-icon p-2" />
                    }
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="danger"
                    htmlType="submit"
                    className="login-btn submit-btn"
                  >
                    Login
                  </Button>
                </Form.Item>
                <p className="text">
                  New User?{" "}
                  <Link to="/userregister" className="anchor">
                    Register here
                  </Link>
                  <br />
                  <Link to="/adminlogin" className="anchor">
                    Click to login as Admin
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserLogin;
