import React from "react";
import { withRouter } from "react-router";
import CutOffTimes from "components/clientFlow/OrderDetails/CutOffTimes/index";

const CutOffTimesPage = () => {
  return <CutOffTimes />;
};

export default withRouter(CutOffTimesPage);
