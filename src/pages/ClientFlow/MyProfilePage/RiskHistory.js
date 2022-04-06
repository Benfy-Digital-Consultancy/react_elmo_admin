import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import RiskHistory from "components/clientFlow/MyProfile/RiskHistory/index";

const RiskHistoryPage = () => {
  return <RiskHistory />;
};

export default connect(null, null)(withRouter(RiskHistoryPage));
