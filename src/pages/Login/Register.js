import React from "react";
import { withRouter } from "react-router";
import { RegisterComp } from "../../components/login";
import "./style.scss";

const Register = () => {
  return <RegisterComp />;
};

export default withRouter(Register);
