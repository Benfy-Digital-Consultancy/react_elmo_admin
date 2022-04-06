import React, { useEffect, useCallback, useState } from "react";
import "./header.scss";
import Bell from "assets/images/bell.svg";
import UserImage from "assets/images/user.png";
import {
  getSubBrokerDetail,
  getNotificationCount,
} from "redux/action/clientFlow/DashboardAct";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDataFromStorage } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { useHistory } from "react-router-dom";
import moment from "moment";

function Header({
  getSubBrokerDetailsApiCall,
  subBrokerdetails,
  getNotificationCountApi,
  noticationCount,
}) {
  const history = useHistory();
  const parentUrl = history.location.pathname;
  const [bellActive, setBellActive] = useState(false);

  const getSubBrokerDetailsFn = useCallback(
    (userRoleData) => {
      let { SubBroker_Code } = userRoleData;
      let query = { SubBrokerCode: SubBroker_Code };
      getSubBrokerDetailsApiCall(query);
    },
    [getSubBrokerDetailsApiCall]
  );

  const getNotificationCountApiFunc = useCallback(() => {
    let userData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    let body = {
      ClientCode: userData.ClientCode,
      SubBrokerCode: userData.SubBroker_Code,
      LastDateTime: moment().format("YYYY-MM-DD"),
    };
    getNotificationCountApi(body);
  }, [getNotificationCountApi]);

  useEffect(() => {
    if (!subBrokerdetails) {
      let userRoleData = getDataFromStorage(
        endpoints.auth.USER_ROLE_kEY,
        endpoints.auth.USER_ROLE_DATA
      );
      if (userRoleData) {
        getSubBrokerDetailsFn(userRoleData);
      }
    }
    if (parentUrl === "/notifications") {
      setBellActive(true);
    } else {
      setBellActive(false);
    }
  }, [getSubBrokerDetailsFn, subBrokerdetails, parentUrl]);

  useEffect(() => {
    if (!noticationCount && noticationCount !== 0) {
      getNotificationCountApiFunc();
    }
  }, [getNotificationCountApiFunc, noticationCount]);

  const profileNameSplitter = (name) => {
    let split_key = name?.split(" ");
    if (name) {
      let initials = split_key[0][0];
      if (split_key.length >= 2 && split_key[1]) {
        initials += split_key[1][0];
      }
      return initials;
    }
  };

  return (
    <header>
      <div className="button-outer my-team-section"></div>
      <div className={` icon-section`}>
        <div
          className={`${bellActive && "bell-active"} alert cursor-pointer`}
          onClick={() => history.push("/notifications")}
        >
          <img alt="Bell" src={Bell} />
          <div className="count">{noticationCount || 0}</div>
        </div>
      </div>

      <div className="user-details">
        <div className="user-img">
          {UserImage && (
            <span className="user-profile">
              {profileNameSplitter(subBrokerdetails?.Name)}
            </span>
          )}
        </div>
        <div className="user-block">
          <div className="user-name">{subBrokerdetails?.Name} </div>
          <span> {subBrokerdetails?.Type}</span>
        </div>
      </div>
    </header>
  );
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSubBrokerDetailsApiCall: getSubBrokerDetail,
      getNotificationCountApi: getNotificationCount,
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    subBrokerdetails: state.dashboardStore.subBrokerdetails,
    noticationCount: state.dashboardStore.noticationCount,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
