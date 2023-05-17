import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, Input, Space } from "antd";
import axios from "axios";
import { message } from "antd";

const ReviewProgress = () => {

  const [allProgress, setAllProgress] = useState([]);

  const [searchedText, setSearchedText] = useState("");

  // function GetSortOrder(prop) {
  //   return function (a, b) {
  //     if (a[prop] > b[prop]) {
  //       return 1;
  //     } else if (a[prop] < b[prop]) {
  //       return -1;
  //     }
  //     return 0;
  //   };
  // }

  const getProgress = async () => {
    try {
      const res = await axios.get("/api/v1/admin/trackprogress", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      });
      if (res.data.success) {
        // res.data.data.sort(GetSortOrder("name"));
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
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
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
  ];

  return (
    <AdminLayout>
      <div>
        <h1>Review Progress</h1>

        <Space.Compact>
          <Input.Search
            placeholder="Search By Name"
            style={{ marginBottom: 8 }}
            onSearch={(value) => {
              setSearchedText(value);
            }}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
          />
        </Space.Compact>
        <Table columns={columns} dataSource={allProgress} size="small"/>
      </div>
    </AdminLayout>
  );
};

export default ReviewProgress;
