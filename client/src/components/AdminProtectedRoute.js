import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import {setAdmin} from '../redux/features/adminSlice';

export const AdminProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);

  //get admin
  const getAdmin = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/admin/getadmindata", 
      {
        token: localStorage.getItem("admintoken"),
      }, 
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('admintoken')}`
        }
      });
      dispatch(hideLoading());
      if(res.data.success){
        dispatch(setAdmin(res.data.data))
      }else{
        <Navigate to="/adminlogin"/>
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if(!admin){
      getAdmin()
    }
  }, [admin, getAdmin])

  if (localStorage.getItem("admintoken")) {
    return children;
  } else {
    return <Navigate to="/adminlogin" />;
  }
};
