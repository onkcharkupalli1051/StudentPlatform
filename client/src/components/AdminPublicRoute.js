import React from 'react'
import { Navigate } from 'react-router-dom'

export const AdminPublicRoute = ({children}) => {
  if(localStorage.getItem('admintoken')){
    return <Navigate to="/schedulesession"/>
  }else{
    return children;
  }
}
