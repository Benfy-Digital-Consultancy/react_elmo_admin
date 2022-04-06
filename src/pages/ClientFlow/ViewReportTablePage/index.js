import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import View from "components/clientFlow/ViewReport/View/View";

const ViewReportTablePage = () => {
    return <View />;
};

export default connect(null, null)(withRouter(ViewReportTablePage));
