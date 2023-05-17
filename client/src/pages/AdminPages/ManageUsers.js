import React, { useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Space, Input, Table, message } from "antd";
// import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  // const { admin } = useSelector((state) => state.admin);

  const [allUsers, setAllUsers] = useState([]);

  const [searchedText, setSearchedText] = useState("");

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

  const manageUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/manageusers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      });
      if (res.data.success) {
        res.data.data.sort(GetSortOrder("name"));
        console.log(res.data.data);
        setAllUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };

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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phonenumber",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleUsers(record)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    manageUsers();
  }, []);

  const handleUsers = async (record) => {
    try {
      if (window.confirm(`Do you want to delete user ${record.name}?`)) {
        const name = record.name;
        const res = await axios.delete(
          `/api/v1/admin/deleteuser/${record._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
            },
          }
        );
        if (res.data.success) {
          message.success(name + ' Deleted Successfully');
          manageUsers();
        }
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1>Manage Users</h1>

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
        <Table columns={columns} dataSource={allUsers} size="small" />
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
