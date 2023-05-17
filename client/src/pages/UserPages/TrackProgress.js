import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table,message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const TrackProgress = () => {
  const { user } = useSelector((state) => state.user);

  // const [allProgress, setAllProgress] = useState([]);
  const [allPostProgress, setAllPostProgress] = useState([]);

  // const getProgress = async () => {
  //   try {
  //     const res = await axios.get("/api/v1/user/trackprogress", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
      
  //     if (res.data.success) {
  //       console.log(res.data.data);
  //       setAllProgress(res.data.data);
  //     }
  //   } catch (error) {
      
  //     console.log(error);
  //   }
  // };

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

      

      if (res.data.success) {
        setAllPostProgress(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      
      console.log(error);
    }
  };

  useEffect(() => {
    // getProgress();
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
    {
      title: "Total Time (minutes)",
      dataIndex: "timeSpent",
    },
    {
      title: "Delete Report",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleDeleteReport(record)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteReport = async(record) => {
    try {
      
      if (window.confirm(`Do you want to delete report?`)) {
        const res = await axios.delete(
          `/api/v1/user/deletereport/${record._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        if (res.data.success) {
          message.success('Deleted Successfully');
          postProgress();
        }
      }
    } catch (error) {
      
      console.log(error);
      message.error("Something Went Wrong");
    }
  }

  return (
    <Layout>
      <div>
        <h2>User Progress</h2>
        <Table columns={columns} dataSource={allPostProgress} />

        {/* <h1>All Other User Progress</h1>

        <Table columns={columns} dataSource={allProgress} /> */}
      </div>
    </Layout>
  );
};

export default TrackProgress;
