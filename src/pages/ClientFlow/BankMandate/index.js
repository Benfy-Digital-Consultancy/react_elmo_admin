import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import BankMandate from "components/clientFlow/BankMandate";

const BankMandatePage = () => {
  return <BankMandate />;
};

export default connect(null, null)(withRouter(BankMandatePage));
