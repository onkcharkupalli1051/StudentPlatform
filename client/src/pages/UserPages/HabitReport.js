import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, message, Button } from "antd";
import { Checkbox, Divider } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import "../../styles/LayoutStyles.css";

const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  "Reading, ",
  "Listening, ",
  "Vocabulary, ",
  "Buddy Talk, ",
];
const defaultCheckedList = [
  "Reading, ",
  "Listening, ",
  "Vocabulary, ",
  "Buddy Talk, ",
];

const HabitReport = () => {
  const { user } = useSelector((state) => state.user);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [timeSpent, setTimeSpent] = useState("0");

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
      report: checkedList,
      name: user.name,
      userid: user._id,
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      timeSpent: timeSpent,
    };
    console.log(values);

    try {
      
      const res = await axios.post("/api/v1/user/habitreport", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (res.data.success) {
        message.success("Habit Report Succesfully Submitted");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      
      message.error("Someting Went Wrong");
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="habitReport__form"
        >
          <h1>Habit Report</h1>

          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
          <br /><br />
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />
          <Divider />

          <label>Total Time Spent (minutes)</label>
          <input
            type="text"
            required
            placeholder="60"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
            className="p-2"
            
            style={{ marginLeft: "10px" }}
          />
          <br />
          <Button type="primary" htmlType="submit" style={{ marginTop: "10px" }} >
            Submit
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default HabitReport;
