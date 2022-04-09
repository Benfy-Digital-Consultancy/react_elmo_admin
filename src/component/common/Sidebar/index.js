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
import grid from "../../../assets/icons/grid.png";
import user from "../../../assets/icons/user.png";
import settings from "../../../assets/icons/settings.png";

import { useLocation } from "react-router-dom";

import "./style.scss";

const navLink = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    iconName: grid,
  },

  {
    to: "/admin/settings",
    label: "Settings",
    iconName: settings,
  },
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
        {/* <div className="text-center  pt-4 pb-5">
          <img src={logo} alt="logo"></img>
        </div> */}
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
                        <img src={iconName} />
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
