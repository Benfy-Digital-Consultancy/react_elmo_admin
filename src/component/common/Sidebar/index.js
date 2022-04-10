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





import "./style.scss";

const navLink = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    iconName: <BsGrid1X2 size={25} />,
  },
  {
    to: "/admin/user-onboard",
    label: "User Onboard",
    iconName: <HiOutlineUsers size={25} />,
  },
  {
    to: "/admin/school-onboard",
    label: "School Onboard",
    iconName: <FaSchool size={25} />,
  },
  {
    to: "/admin/profile",
    label: "Profile Settings",
    iconName: <IoSettingsOutline size={25} />,
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
