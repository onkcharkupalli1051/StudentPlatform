import React from "react";
import AdminLayout from "../../components/AdminLayout";
import { Form, Input, message, DatePicker, TimePicker, Button } from "antd";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from "./../../redux/features/alertSlice";
import axios from 'axios';

const ScheduleSession = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (fieldsvalue) => {
    const values = {
      ...fieldsvalue,
      'date': fieldsvalue['date'].format('YYYY-MM-DD'),
      'time': fieldsvalue['time'].format('HH:mm:ss'),
    }
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/admin/schedulesession', values, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('admintoken')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
      message.error('Someting Went Wrong')
    }

    console.log(values);
  };

  return (
    <AdminLayout>
      <div className="page-container">
        <Form layout="vertical" onFinish={handleFinish} className="register-form">
          <h1>Schedule Session</h1>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input Title!",
              },
            ]}
          >
            <Input type="text" required />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                type: "object",
                required: true,
                message: "Please input Date!",
              },
            ]}
          >
            <DatePicker/>
          </Form.Item>

          <Form.Item
            name="time"
            label="Time"
            rules={[
              {
                type: 'object',
                required: true,
                message: "Please input Time!",
              },
            ]}
          >
            <TimePicker />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default ScheduleSession;
