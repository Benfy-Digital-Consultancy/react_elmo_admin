import { Avatar } from "@material-ui/core";
import React, { useEffect,forwardRef, useState } from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { logout } from "service/utilities";
import logo from "assets/images/elmo_title.png";
import notificationBadge from "assets/images/notification_badge.png";
import user from "assets/images/menOne.jpg";
import bell from "assets/icons/bell.png";
import "component/common/Header/header.scss";
import search from "assets/icons/search.svg";
import { Link } from "react-router-dom";
import profile_placeholder from "../../../assets/images/profile_placeholder.png";
import { request } from "service";
import endponts from "service/endponts";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#FFFEFE",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
}));
const Header=()=>{
  const { header } = useStyles();
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [notificationCount, setNotificationCount] = useState('');

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userData'));
    setUserName(userData?.firstName + " " + userData?.lastName);
    setProfilePic(userData?.profilePicture);
    getNotificationCount()

    document.body.addEventListener('change_profile',handleChange)

    return()=>{
      document.body.removeEventListener('change_profile',handleChange)
    };
  }, []);


  const getNotificationCount=()=>{
    request({
      url: endponts.Endpoints.notificationCount,
      method: endponts.APIMethods.GET,
      isLoader:false
    }).then(res => {
      setNotificationCount(res?.data?.data?.count)
    });
  }


  const handleChange = (event)=>{
    let userData = JSON.parse(localStorage.getItem('userData'));
    setUserName(userData?.firstName + " " + userData?.lastName);
    setProfilePic(userData?.profilePicture);
  }


  const displayDesktop = () => {
    return (
      <Toolbar style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.06)" }}>
        <div className="container-fluid ">
          <div className="row ">
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <img src={logo} width="100px" />
              </div>
            </div>
            <div className="col-md-8 d-flex justify-content-end">
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/admin/notification">
                  <div className="mr-4">
                    <img src={notificationBadge} className="notificationBadge" />
                    <span className="notification-count">{notificationCount}</span>
                    <img src={bell} />
                  </div>
                </Link>
                <div className="imageDiv mr-4">
                  <img
                    className="profile_pic1"
                    ref={ref => localStorage.setItem('header_image',ref)}
                    onError={()=>{
                      setProfilePic(profile_placeholder)
                    }}
                    src={profilePic} />
              </div>
              <div className="userName">{userName}</div>
            </div>
          </div>
        </div>
      </div>
      </Toolbar >
    );
  };

return (
  <div className="header">
    <header>
      <AppBar style={{ boxShadow: "none", backgroundColor: "white" }}>
        {displayDesktop()}
      </AppBar>
    </header>
  </div>
);
};

export default Header;
