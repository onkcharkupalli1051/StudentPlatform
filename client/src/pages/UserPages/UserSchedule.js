import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Card, Space, message, Table } from "antd";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserSchedule = () => {
  const navigate = useNavigate();

  const [allschedule, setAllSchedule] = useState([]);

  const getSchedule = async () => {
    try {
      const res = await axios.get("/api/v1/user/userschedule", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        console.log(res.data.data);
        setAllSchedule(res.data.data);
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
      console.log(record.title)
    } catch (error) {
      message.error("Something went wrong");
      message.error(error);
    }
  };

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
    {
      title: "Join",
      dataIndex: "join",
      render: (text, record) => (
        <div className="d-flex">
          <button
            className={`btn btn-success`}
            onClick={() => {joinController()}}
          >
            Join Meeting
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <Layout>
      <h1>My Schedule</h1>

      <form className="register-form" onSubmit={submitTitle}>
        <label htmlFor="">Enter Room Title</label>
        <input
          type="text"
          required
          placeholder="Room Title"
          value={roomTitle}
          onChange={(e) => setRoomTitle(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>

      <Table columns={columns} dataSource={allschedule} />
    </Layout>
  );
};

export default UserSchedule;
