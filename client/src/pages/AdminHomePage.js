import React,{useEffect} from "react";
import axios from 'axios';
import AdminLayout from "../components/AdminLayout";

const AdminHomePage = () => {
  
  //login admin data
  const getAdminData = async() => {
    try {
      const res = await axios.post('/api/v1/admin/getAdminData',{},{
        headers:{
          Authorization: "Bearer " + localStorage.getItem('admintoken'),
        },
      })      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAdminData();
  }, [])
  
  return (
    <AdminLayout>
      <h1>Admin HomePage</h1>
    </AdminLayout>
  );
};

export default AdminHomePage;
