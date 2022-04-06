import React, { useEffect, useCallback } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMutualFundDetails } from "redux/action/clientFlow/MutualFundAct";
import { getDataFromStorage, date } from "service/helperFunctions";
import { PageLoader } from "components/Common/PageLoader";
import { endpoints } from "service/helpers/config";
import InvestmentData from "./InvestmentData/index";
import TabBarMain from "./TabBarMain/index";
import { useLang } from "hooks/useLang";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import "./MutualFund.scss";

const MutualFund = (props) => {
  const { Labels } = useLang();
  const { getMutualFundDetailsApi, mutualFundDetails, history } = props;
  const today = date(mutualFundDetails?.investmentSummary?.returnsDate);
  const { investmentSummary, investmentSummaryV4list } = mutualFundDetails
    ? mutualFundDetails
    : {};

  const mutualFund = useCallback(() => {
    const userRoleDataValue = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    let source = getDataFromStorage(
      endpoints.auth.WHITELIST_SOURCE_DATA,
      endpoints.auth.WHITELIST_SOURCE_KEY
    );
    if (userRoleDataValue) {
      let body = {
        ClientCode: userRoleDataValue?.ClientCode,
        PAN: "",
        FolioNo: "",
        RTASchemeCode: "",
        GoalID: "",
        UserRequest: {
          UID: userRoleDataValue?.uid,
          LoggedInRoleId: userRoleDataValue?.role_id,
          IPAddress: sessionStorage.getItem(endpoints.auth.IP),
          Source: source,
          AppOrWeb: endpoints.auth.WEB,
          deviceInfo: endpoints.auth.APIDEVICEINFO,
        },
      };
      if (!mutualFundDetails) {
        getMutualFundDetailsApi(body);
      }
    }
  }, [mutualFundDetails, getMutualFundDetailsApi]);

  const breadCrumbsList = [
    {
      redirection: () => history.push("/dashboard"),
      label: Labels.dashboard,
    },
    {
      label: Labels.mutualFundTitle,
    },
  ];

  useEffect(() => {
    mutualFund();
  }, [mutualFund]);

  // initalBuyInvestMentLocalStorageClear
  useEffect(() => {
    sessionStorage.removeItem(endpoints?.auth?.BUY_INVESTMENT_DATA);
    sessionStorage.removeItem(endpoints?.auth?.BUY_FORMDATA_DATA);
    sessionStorage.removeItem(endpoints?.auth?.BUY_INVEST_DATA);
  }, []);

  if (!mutualFundDetails) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <div className="mutual-fund">
        <div className="current-page-title">
          <h1 className="page-name">
            <BreadCrumbs breadCrumbsList={breadCrumbsList} />
          </h1>
          <div className="right">
            {Labels.updatedDate} : {today}
          </div>
        </div>
        <div className="page-content">
          <InvestmentData investmentSummary={investmentSummary} />
          <TabBarMain investmentSummaryV4list={investmentSummaryV4list} />
        </div>
      </div>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getMutualFundDetailsApi: getMutualFundDetails,
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    mutualFundDetails: state.mutualFundStore.mutualFundDetails,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MutualFund));
