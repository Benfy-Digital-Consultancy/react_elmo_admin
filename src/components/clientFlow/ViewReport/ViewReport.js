import React, { useEffect, useCallback } from "react";
import "./ViewReport.scss";
import ReportIcon from "assets/images/report.svg";
import ReportBlueIcon from "assets/images/report-blue.svg";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PageLoader } from "components/Common/PageLoader";
import { endpoints } from "service/helpers/config";
import { getDataFromStorage } from "service/helperFunctions";
import {
  getReportDetails
} from "redux/action/clientFlow/ReportAct";
import { useHistory } from "react-router-dom";

const ViewReport = (props) => {
  const { getReportDetailsApi, reportDetailedList } = props;
  let history = useHistory();

  const reportDetailedFunction = useCallback(() => {
    const { USER_ROLE_DATA, USER_ROLE_kEY } = endpoints.auth;
    let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
    let body = {
      RoleId: userRoleData?.role_id,
    };

    if (!reportDetailedList) {
      getReportDetailsApi(body);
    }
  }, [getReportDetailsApi, reportDetailedList]);




  useEffect(() => {
    reportDetailedFunction();
  }, [reportDetailedFunction]);

  if (!reportDetailedList) {
    return <PageLoader />;
  }

  return (
    <div className="view-report-page">
      {reportDetailedList?.map((item, index) => (
        <div className="list" key={index}>
          <div className="box" onClick={() => {
            history.push(`/report/view-report/${item.ReportId}/${item.ReportName}`)
          }}>
            <img src={ReportIcon} alt="inActive" className="non-active" />
            <img src={ReportBlueIcon} alt="active" className="for-active" />
            <div className="current-title">{item.ReportName}</div>
            <div className="description">{item.Description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getReportDetailsApi: getReportDetails,
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    reportDetailedList: state.reportStore.reportDetailedList,

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewReport));
