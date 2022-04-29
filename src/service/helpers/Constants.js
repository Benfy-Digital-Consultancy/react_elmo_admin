import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 286;

export const mainLayoutStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      display: "none",
    },
    display: "block",
  },
  nav: {
    // paddingTop: "20px",
    "& .MuiListItemIcon-root": {
      minWidth: "41px",
      marginLeft: "10px",
    },
    "& .MuiTypography-body1": {
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "40px",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    marginTop: "65px",
    backgroundColor: "#FFFFFF;",
    width: "16%",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: "2.3rem",
    },
    paddingTop: "5rem",
    marginTop: "4rem",
  },
}));

// dashboard header
export const SchemeDetailsHeader = [
  { label: "S.No" },
  { label: "School ID" },
  { label: "School Logo" },
  { label: "School Name" },
  { label: "Board" },
  { label: "Email ID" },

];

// user on board header
export const UserOnBoardHeader = [
  { label: "S.No" },
  { label: "User Name" },
  { label: "Email ID" },
  { label: "Phone Number" },
  { label: "Status" },
  { label: "Action" },
];

// user on board header
export const NotificationHeader = [
  { label: "S.No" },
  { label: "Date" },
  { label: "Title" },
  { label: "Description" },
];

// School on board header
export const SchoolOnBoardHeader = [
  { label: "S.No" },
  { label: "School ID" },
  { label: "School Logo" },
  { label: "School Name" },
  { label: "Board" },
  { label: "Email ID" },
  { label: "Status" },
  { label: "Action" },
];

export const strings = {
  elmo: 'Arki'
}