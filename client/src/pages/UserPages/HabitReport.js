import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Input, message, Button } from "antd";
import { Checkbox, Divider } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox"; // import type ...
import { CheckboxValueType } from "antd/es/checkbox/Group"; // import type ...
import { useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../../styles/LayoutStyles.css";

const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  "Reading, ",
  "Listening, ",
  "Vocabulary, ",
  "Coordination Session, ",
  "Buddy Talk, ",
];
const defaultCheckedList = [
  "Reading, ",
  "Listening, ",
  "Vocabulary, ",
  "Coordination Session, ",
  "Buddy Talk, ",
];

const HabitReport = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user)
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleFinish = async () => {
    const date = new Date();
    const values = {
      'report' : checkedList,
      'name': user.name,
      'userid': user._id,
      'date': `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    }
    console.log(values);

    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/habitreport', values, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success('Habit Report Succesfully Submitted')
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
      message.error('Someting Went Wrong')
    }
  }

  return (
    <Layout>
      <div className="page-container">
        <Form layout="vertical"  onFinish={handleFinish} className="habitReport__form">
          <h1>Habit Report</h1>

          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
          <Divider />
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>

        </Form>
      </div>
    </Layout>
  );
};

export default HabitReport;
