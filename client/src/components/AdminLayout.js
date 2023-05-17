import React from "react";
import "../styles/LayoutStyles.css";
import { SidebarMenu } from "./../Data/Admindata";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge, Popover } from "antd";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const { admin } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfull");
    navigate("/adminlogin");
    window.location.reload();
  };

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="title">
              <h3>Student Platform</h3>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`} >
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}

              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/adminlogin">Logout</Link>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="header">
              <div className="header-content">
                
                <Popover
                  content={admin?.notification
                    .map((noti) => <p>{noti.message}</p>)
                    .reverse()}
                  title="Notification"
                  trigger="click"
                >
                <Badge count={admin?.notification.length}></Badge>
                <i className="fa-solid fa-bell"></i>
                </Popover>
                <Link to="/adminprofile">{admin?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
