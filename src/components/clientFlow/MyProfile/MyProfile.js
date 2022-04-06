import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useHistory } from "react-router-dom";
import BannerImage from "assets/images/banner.png";
import { getClientDetail } from "redux/action/clientFlow/DashboardAct";
import { endpoints } from "service/helpers/config";
import { getDataFromStorage } from "service/helperFunctions";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import { MyProfileHeaders } from "service/helpers/Constants";
import { PageLoader } from "components/Common/PageLoader";
import RiskTable from "./RiskProfile/RiskProfile";
import WorkIncome from "./WorkIncome/WorkIncome";
import Accounts from "./Accounts/Accounts";
import Bank from "./Bank/Bank";
import { useLang } from "hooks/useLang";
import "./MyProfile.scss";

const MyProfile = (props) => {
  const { Labels } = useLang();
  const { getClientDetailApi, clientDetails } = props;
  const [activeTab, setActiveTab] = useState(Labels?.accounts);
  const history = useHistory();

  const fetchUsersList = useCallback(() => {
    setActiveTab(Labels?.accounts);
    const {
      USER_ROLE_kEY,
      USER_ROLE_DATA,
      WHITELIST_SOURCE_KEY,
      WHITELIST_SOURCE_DATA,
    } = endpoints.auth;
    let source = getDataFromStorage(
      WHITELIST_SOURCE_DATA,
      WHITELIST_SOURCE_KEY
    );
    let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
    if (userRoleData) {
      let ip = sessionStorage.getItem(endpoints.auth.IP);
      let body = {
        AppOrWeb: endpoints.auth.WEB,
        client_code: userRoleData?.ClientCode,
        sub_broker_code: userRoleData?.SubBroker_Code,
        UserRequest: {
          AppOrWeb: endpoints?.auth.WEB,
          deviceInfo: endpoints?.APIDEVICEINFO,
          IPAddress: ip,
          LoggedInRoleId: userRoleData?.role_id,
          Source: source,
          UID: userRoleData?.uid,
        },
      };
      if (!clientDetails) {
        getClientDetailApi(body);
      }
    }
  }, [getClientDetailApi, clientDetails, Labels?.accounts]);

  const { ObjectResponse } = clientDetails ? clientDetails : {};

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  if (!clientDetails) {
    return <PageLoader />;
  }

  return (
    <div className="view-profile-page-rm">
      <img src={BannerImage} className="banner" alt="Banner" />
      <div className="profile-section">
        <PersonalInformation personalData={ObjectResponse} />
        <div className="tab-bar">
          {MyProfileHeaders.map((item, index) => {
            return (
              <div
                key={index}
                className={"tab " + (activeTab === item?.title ? "active" : "")}
                onClick={() => setActiveTab(item?.title)}
              >
                {item?.title}
              </div>
            );
          })}
        </div>
        <div className="tab-content ">
          {activeTab === Labels?.accounts && (
            <Accounts accountData={ObjectResponse} />
          )}
          {activeTab === Labels?.bank && <Bank bankData={ObjectResponse} />}
          {activeTab === Labels?.workIncome && (
            <WorkIncome personalData={ObjectResponse} />
          )}
          {activeTab === Labels?.riskProfile && (
            <>
              <RiskTable />
              <div className="text-end link-text">
                <Link
                  href="!"
                  className="link-text"
                  onClick={() => history.push("/my-profile/risk-history")}
                >
                  {Labels?.history}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getClientDetailApi: getClientDetail,
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    clientDetails: state.dashboardStore.ClientDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
