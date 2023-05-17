import React from "react";
import "../styles/LayoutStyles.css";
import { SidebarMenu } from "../Data/data";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, message, Popover } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfull");
    navigate("/userlogin");
    window.location.reload();
  };

  // const content = (
  //   <div>
  //     user?.notification.map((noti) => {
  //       <p>{noti.message}</p>
  //     })

  //     <p>Content</p>
  //     <p>Content</p>
  //   </div>
  // );

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
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="header">
              <div className="header-content">
                <Popover
                  content={user?.notification
                    .map((noti) => <p>{noti.message}</p>)
                    .reverse()}
                  title="Notification"
                  trigger="click"
                >
                  <Badge count={user?.notification.length}></Badge>
                  <i className="fa-solid fa-bell"></i>
                </Popover>
                <Link to="/userprofile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
