import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import MyProfile from "components/clientFlow/MyProfile/MyProfile";

const MyProfilePage = () => {
  return <MyProfile />;
};

export default connect(null, null)(withRouter(MyProfilePage));
