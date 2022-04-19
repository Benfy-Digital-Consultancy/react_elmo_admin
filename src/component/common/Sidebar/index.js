import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import settings from "../../../assets/icons/settings.png";
import { HiOutlineUsers } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { BsGrid1X2 } from "react-icons/bs";
import { FaSchool } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import active_dashboard from "assets/images/active_dashboard.svg"
import active_profile from "assets/images/active_profile.svg"
import active_school from "assets/images/active_school.png"
import active_user from "assets/images/active_user.svg"


import inactive_dashboard from "assets/images/inactive_dashboard.svg"
import inactive_profile from "assets/images/inactive_profile.png"
import inactive_school from "assets/images/inactive_school.png"
import inactive_user from "assets/images/inactive_user.png"

import "./style.scss";

const navLink = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    activeImg:active_dashboard,
    inactiveImg:inactive_dashboard
  },
  {
    to: "/admin/user-onboard",
    label: "Co-Admin Onboard",
    activeImg:active_user,
    inactiveImg:inactive_user
  },
  {
    to: "/admin/school-onboard",
    label: "School Onboard",
    activeImg:active_school,
    inactiveImg:inactive_school
  },
  {
    to: "/admin/profile",
    label: "Profile Settings",
    activeImg:active_profile,
    inactiveImg:inactive_profile
  },
];
const logout = [
  {
    to: "/auth/login",
    label: "Log out",
    iconName: <HiOutlineLogout size={25} />
  }
];

function Sidebar({ classes, window }) {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const location = useLocation();
  console.log(location.pathname);
  const drawer = (
    <div>
      <div className={classes.toolbar}>
      </div>
      <List className={classes.nav} style={{ textDecoration: "none" }}>
        {navLink.map(
          ({ to, label, activeImg,inactiveImg, iconTransparent, nestedChild }, index) => (
            <>
              <NavLink
                key={index}
                to={to}
                onClick={to !== "/something" ? () => setActiveIndex(index) : ""}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  button
                  className={
                    location.pathname === to ? "active-div" : "inActive-div"
                  }
                >
                  <div>
                    <ListItemText>
                      <span className={
                        location.pathname === to ? "activeBarImg" : "inactiveBarImg"
                      }>
                        {/* {iconName} */}
                        <img
                        className={
                          location.pathname === to ? "activebar-icon" : "inactivebar-icon"
                        }
                          src={location.pathname === to ? activeImg : inactiveImg}/>
                      </span>

                      <span
                        className={
                          location.pathname === to ? "activeBar" : "inActiveBar"
                        }
                        style={{
                          fontSize: ( location.pathname === to &&  label.length > 10)  ? 12 : 14
                        }}
                      >
                        {label}
                      </span>
                    </ListItemText>
                  </div>
                </ListItem>
              </NavLink>
            </>
          )
        )}
      </List>
      <div className="logout_list">
        <List className={classes.nav} style={{ textDecoration: "none" }}>
          {logout.map(
            ({ to, label, iconName, iconTransparent, nestedChild }, index) => (
              <>
                <NavLink
                  key={index}
                  to={to}
                  onClick={to !== "/something" ? () => setActiveIndex(index) : ""}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    button
                    className={
                      location.pathname === to ? "active-div" : "inActive-div"
                    }
                  >
                    <div>
                      <ListItemText>
                        <span className={
                          location.pathname === to ? "activeBarImg" : "inactiveBarImg"
                        }>
                          {iconName}
                        </span>

                        <span
                          className={
                            location.pathname === to ? "activeBar" : "inActiveBar"
                          }
                          style={{
                          }}
                        >
                          {label}
                        </span>
                      </ListItemText>
                    </div>
                  </ListItem>
                </NavLink>
              </>
            )
          )}
        </List>
      </div>

    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <div className="menu_adjust">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </div>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}

export default Sidebar;
