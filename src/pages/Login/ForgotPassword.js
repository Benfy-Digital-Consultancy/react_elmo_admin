import React from "react";
import { withRouter } from "react-router";
import { ForgotPasswordComp } from "components/login";

const ForgotPassword = () => {
  return <ForgotPasswordComp />;
};

export default withRouter(ForgotPassword);
