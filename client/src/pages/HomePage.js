import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setCurrentUser(res.data.data);
        const myTimeout = setTimeout(redirect, 3000);
      }
    } catch (error) {console.log(error);}
  };
  
  function redirect() {
    navigate("/userschedule");
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1>Welcome {currentUser?.name}</h1>
    </Layout>
  );
};

export default HomePage;
