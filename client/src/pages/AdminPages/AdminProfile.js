import React, { useEffect, useState } from "react";
import AdminLayout from "./../../components/AdminLayout";
import axios from "axios";
import "../../styles/Profile.css"

const AdminProfile = () => {

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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admintoken')}`
          }
        });

      if (res.data.success) {
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
      <div className="__profile">
        <div className="background"></div>
        <img src="https://www.kindpng.com/picc/m/24-248325_profile-picture-circle-png-transparent-png.png" alt="img" className="user__img" />
        {/* <h1>Admin Profile</h1> */}
        <div className="__details">
          <h2 className="admin__name">{admin?.name}</h2>
          <h5>Contact Details</h5>
          <div className="contact__details">
            <p>{admin?.email}</p>
            <hr />
            <p>Id : {admin?.adminid}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
