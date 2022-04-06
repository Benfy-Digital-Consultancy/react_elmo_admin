import React from "react";
import { withRouter } from "react-router";
import { LoginComp } from "../../components/login";
import "./style.scss";

const Login = () => {
  return <LoginComp />;
};

export default withRouter(Login);
