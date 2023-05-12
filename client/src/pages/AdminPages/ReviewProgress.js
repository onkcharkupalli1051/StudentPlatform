import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { message } from "antd";

const ReviewProgress = () => {
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.admin);

  const [allProgress, setAllProgress] = useState([]);

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  const getProgress = async () => {
    try {
      const res = await axios.get("/api/v1/admin/trackprogress", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      });
      if (res.data.success) {
        res.data.data.sort(GetSortOrder("name"));
        console.log(res.data.data);
        setAllProgress(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };

  useEffect(() => {
    getProgress();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name" },
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
    <AdminLayout>
      <div>
        <h1>Review Progress</h1>
        <br />
        <Table columns={columns} dataSource={allProgress} />
      </div>
    </AdminLayout>
  );
};

export default ReviewProgress;
