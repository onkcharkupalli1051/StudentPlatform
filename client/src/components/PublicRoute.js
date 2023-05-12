import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({children}) => {
  if(localStorage.getItem('token')){
    return <Navigate to="/userschedule"/>
  }else{
    return children;
  }
}
