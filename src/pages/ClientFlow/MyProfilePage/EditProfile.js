import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import EditProfile from "components/clientFlow/MyProfile/EditProfile/index";

const EditProfilePage = () => {
  return <EditProfile />;
};

export default connect(null, null)(withRouter(EditProfilePage));
