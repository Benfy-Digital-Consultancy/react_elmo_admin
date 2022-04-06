import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import ViewReport from "components/clientFlow/ViewReport/ViewReport";

const ReportPage = () => {
    return <ViewReport />;
};

export default connect(null, null)(withRouter(ReportPage));
