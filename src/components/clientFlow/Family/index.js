import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getFamilyDetailsSummary,
  getFamilyDetailsMember,
  getFamilyDetailsGrid,
} from "redux/action/clientFlow/FamilyAct";
import { getDataFromStorage } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { FamilyTitles } from "service/helpers/Constants";
import { PageLoader } from "components/Common/PageLoader";
import InvestedSummary from "../clientDashboard/investmentSummary";
import FamilyMemberTable from "./FamilyMemberTable";
import FamilySchemeTable from "./FamilySchemeTable";
import "./Family.scss";

const Family = (props) => {
  const {
    getFamilyDetailsSummaryApi,
    getFamilyDetailsMemberApi,
    getFamilyDetailsGridApi,
    familySummaryDetails,
    familyMemberDetails,
    familyGridDetails,
  } = props;
  const [activeTab, setActiveTab] = useState("Member wise");

  const userRoleDataValue = getDataFromStorage(
    endpoints.auth.USER_ROLE_kEY,
    endpoints.auth.USER_ROLE_DATA
  );
  const clientCode = userRoleDataValue?.ClientCode;

  const getFamilyDetailsSummaryFunc = useCallback(() => {
    let body = { Operation: "1", SchemeCode: "", UserId: clientCode };
    if (!familySummaryDetails) {
      getFamilyDetailsSummaryApi(body);
    }
  }, [getFamilyDetailsSummaryApi, clientCode, familySummaryDetails]);

  const getFamilyDetailsMemberFunc = useCallback(() => {
    let body = { Operation: "1", SchemeCode: "", UserId: clientCode };
    if (!familyMemberDetails) {
      getFamilyDetailsMemberApi(body);
    }
  }, [getFamilyDetailsMemberApi, clientCode, familyMemberDetails]);

  const getFamilyDetailsSchemeGridFunc = useCallback(() => {
    let body = { Operation: "1", SchemeCode: "", UserId: clientCode };
    if (!familyGridDetails) {
      getFamilyDetailsGridApi(body);
    }
  }, [getFamilyDetailsGridApi, clientCode, familyGridDetails]);

  useEffect(() => {
    getFamilyDetailsSummaryFunc();
  }, [getFamilyDetailsSummaryFunc]);

  useEffect(() => {
    getFamilyDetailsSchemeGridFunc();
  }, [getFamilyDetailsSchemeGridFunc]);

  useEffect(() => {
    getFamilyDetailsMemberFunc();
  }, [getFamilyDetailsMemberFunc]);

  if (!familySummaryDetails && !familyMemberDetails && !familyGridDetails) {
    return <PageLoader />;
  }

  return (
    <div className="family-page">
      {/* <div className="button-section">
        <button
          onClick={() => history.push("/family/create-family")}
          className="primary-btn bordered green"
        >
          Create family members
        </button>
      </div> */}
      <InvestedSummary
        family={true}
        familySummaryDetails={familySummaryDetails}
      />
      <div className="bottom-section">
        <div className="tab-bar bg-color">
          {FamilyTitles.map((item, index) => {
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
        <div className="tab-content">
          {activeTab === "Member wise" && (
            <FamilyMemberTable
              familyMembersDetailsTable={familyMemberDetails}
              getFamilyDetailsMemberApi={getFamilyDetailsMemberApi}
            />
          )}
          {activeTab === "Scheme wise" && (
            <FamilySchemeTable
              familySchemeDetailsTable={familyGridDetails}
              getFamilyDetailsGridApi={getFamilyDetailsGridApi}
            />
          )}
        </div>
      </div>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getFamilyDetailsSummaryApi: getFamilyDetailsSummary,
      getFamilyDetailsMemberApi: getFamilyDetailsMember,
      getFamilyDetailsGridApi: getFamilyDetailsGrid,
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    familySummaryDetails: state.familyStore.familySummaryDetails,
    familyMemberDetails: state.familyStore.familyMemberDetails,
    familyGridDetails: state.familyStore.familyGridDetails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Family));
