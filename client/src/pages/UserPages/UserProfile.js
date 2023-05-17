import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import "../../styles/Profile.css";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

const UserProfile = () => {
  // const params = useParams();

  // const { user } = useSelector((state) => state.user);

  const [currentUser, setCurrentUser] = useState({});

  const getUserInfo = async () => {
    try {
      // const res = await axios.post(
      //   "/api/v1/user/getUserInfo",
      //   { userId: params.id },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      // );
      // if (res.data.success) {
      //   setCurrentUser(res.data.data);
      // }
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {
          token: localStorage.getItem("token"),
        },
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
    getUserInfo();
  }, []);

  return (
    <Layout>
      <div className="__profile">
        <div className="background"></div>
        <img
          src="https://www.kindpng.com/picc/m/24-248325_profile-picture-circle-png-transparent-png.png"
          alt="user profile"
          className="user__img"
        />
        {/* <h1>My Profile</h1> */}
        <div className="__details">
          <h2>{currentUser?.name}</h2>
          <h5>Contact Details</h5>
          <div className="contact__details">
            <p>{currentUser?.email}</p>
            <hr />
            <p>{currentUser?.phonenumber}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
