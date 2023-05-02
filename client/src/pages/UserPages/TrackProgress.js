import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { message } from "antd";

const TrackProgress = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [allProgress, setAllProgress] = useState([]);
  const [allPostProgress, setAllPostProgress] = useState([]);

  const getProgress = async () => {
    try {
      const res = await axios.get("/api/v1/user/trackprogress", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        console.log(res.data.data);
        setAllProgress(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postProgress = async () => {
    try {
      const res = await axios.post(
        "api/v1/user/postProgress",
        { userid: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        message.success("Post Success");
        setAllPostProgress(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProgress();
    postProgress();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Progress",
      dataIndex: "report",
    },
  ];

  return (
    <Layout>
      <div>
        <h1>Track Progress</h1>

        <Table columns={columns} dataSource={allProgress} />

        <h2>User Progress</h2>
        <Table columns={columns} dataSource={allPostProgress} />
      </div>
    </Layout>
  );
};

export default TrackProgress;
