import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const params = useParams();

  const { user } = useSelector((state) => state.user);

  const [currentUser, setCurrentUser] = useState({});

  const getUserInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setCurrentUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo()
  }, [])
  
  return (
    <Layout>
      <div>
        <h1>My Profile</h1>
        <h2>Name : {currentUser?.name}</h2>
        <h2>Email : {currentUser?.email}</h2>
        <h2>Phone : {currentUser?.phonenumber}</h2>
      </div>
    </Layout>
  );
};

export default UserProfile;
