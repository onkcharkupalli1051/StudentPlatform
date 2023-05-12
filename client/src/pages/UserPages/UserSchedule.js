import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Card, Space, message, Table, Input, Button } from "antd";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserSchedule = () => {
  const navigate = useNavigate();

  const [allschedule, setAllSchedule] = useState([]);

  const [today, setToday] = useState([]);

  const getSchedule = async () => {
    try {
      const res = await axios.get("/api/v1/user/userschedule", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        console.log(res.data.data);

        const date = new Date();
        const datestring =
          date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const monthstring =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        const todayDateString = `${datestring}-${monthstring}-${date.getFullYear()}`;

        setToday(
          res.data.data.filter(function (el) {
            return el.date == todayDateString;
          })
        );
        console.log(`Today : ${todayDateString} :${today}`);

        setAllSchedule(
          res.data.data.filter(function (el) {
            const date1 = new Date(el.date);
            const date2 = new Date(todayDateString);
            return date1 > date2;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [roomTitle, setRoomTitle] = useState("");

  const submitTitle = (e) => {
    e.preventDefault();
    navigate(`/room/${roomTitle}`);
  };

  const joinController = async (record, status) => {
    try {
      console.log(record.title);
    } catch (error) {
      message.error("Something went wrong");
      message.error(error);
    }
  };

  const todaycolumns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
  ];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
  ];

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <Layout>
      <form className="register-form" onSubmit={submitTitle}>

        <input
          type="text"
          required
          placeholder="Enter Schedule Title"
          value={roomTitle}
          onChange={(e) => setRoomTitle(e.target.value)}
          style={{ padding: '5px' }}
        />
        <button 
          type="submit" 
          className="btn btn-primary"
          style={{marginLeft: '10px'}}
          >
          Join
        </button>
      </form>

      <hr />

      <h3>Today's Schedule</h3>
      <Table columns={todaycolumns} dataSource={today} />

      <hr />

      <h3>Upcoming Schedule</h3>
      <Table columns={columns} dataSource={allschedule} />
    </Layout>
  );
};

export default UserSchedule;
