import React from "react";
import { Form, Input, Button,message } from "antd";
import "../styles/authenticationStyles.css";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../redux/features/alertSlice";

const UserLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    //form handlers
    const onFinishHandler = async (values) => {
      try {
        dispatch(showLoading());
        const res = await axios.post('api/v1/user/userlogin', values)
        dispatch(hideLoading());
        if(res.data.success){
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("usertype", res.data.usertype);
          message.success('Login Success')
          navigate('/')
        }else{
          message.error(res.data.message)
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error)
        message.error('Something went wrong')
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
            <h1 className="text-center">User Login</h1>
          
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
              <Link to="/userregister">User Not Registered? Click to Register</Link>
              <br />
              <Link to="/adminlogin">Click to login as Admin</Link>
            </Form.Item>
          </Form>
        </div>
      </>
    );
};

export default UserLogin;
