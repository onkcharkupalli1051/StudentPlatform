import React, { useEffect, useState } from "react";
import AdminLayout from "./../../components/AdminLayout";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AdminProfile = () => {
  const params = useParams();

  const { user } = useSelector((state) => state.admin);
  
  const [admin, setAdmin] = useState({});

  const getAdminInfo = async () => {
    try {
      // const res = await axios.post(
      //   "/api/v1/admin/getadmininfo",
      //   { userId: user._id },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
      //     },
      //   }
      // );
      // if (res.data.success) {
      //   setAdmin(res.data.data);
      // }

      const res = await axios.post("/api/v1/admin/getadmindata", 
      {
        token: localStorage.getItem("admintoken"),
      }, 
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('admintoken')}`
        }
      });
      
      if(res.data.success){
        setAdmin(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminInfo();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1>Admin Profile</h1>
        
        <h2>Name : {admin?.name}</h2>
        <h2>Email : {admin?.email}</h2>
        <h2>Admin ID : {admin?.adminid}</h2>
        
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
