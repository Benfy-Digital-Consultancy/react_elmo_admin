import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { logout } from "service/utilities";
import logo from "assets/images/elmo_title.png";
import user from "assets/images/menOne.jpg";
import bell from "assets/icons/bell.png";
import "component/common/Header/header.scss";
import search from "assets/icons/search.svg";

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
const Header = () => {
  const { header } = useStyles();
  const [searchBox, setsearchBox] = useState("");
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
                <div className="mr-3">
                  <span className="notificationBadge">3</span>
                  <img src={bell} />
                </div>
                <div className="imageDiv mr-3">
                  <Avatar src={user} />
                </div>
                <div className="userName">Dan Sanchez</div>
              </div>
              {/* <div
                className="logoutButton cursor-pointer"
                onClick={() => logout()}
              >
                Logout
                <span className="ml-2">
                  <img src={logOut} />
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </Toolbar>
    );
  };
  const femmecubatorLogo = (
    <Typography variant="h6" component="h1">
      Femmecubator
    </Typography>
  );
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
