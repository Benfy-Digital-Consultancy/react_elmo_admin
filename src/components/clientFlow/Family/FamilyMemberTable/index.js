import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import {
  amountWithoutRs,
  percentageValidatorWOP,
  setDataFromStorage,
  getDataFromStorage,
} from "service/helperFunctions";
import { getUserReferralInfo } from "redux/action/clientFlow/ClientReferAct";
import { endpoints } from "service/helpers/config";
import { FamilyMemberTableHeader } from "service/helpers/Constants";
import { EmptyRecord } from "components/Common/EmptyRecord";
import TableWrapper from "components/Common/TableWrapper";
import "../Family.scss";

const FamilyMemberTable = (props) => {
  const { familyMembersDetailsTable, getUserReferralInfoApi } = props;
  const history = useHistory();

  const handleSessionSet = useCallback(
    (data) => {
      const { USER_ROLE_kEY, USER_ROLE_DATA } = endpoints.auth;
      setDataFromStorage(data, USER_ROLE_kEY, USER_ROLE_DATA);
      history.push("/");
      sessionStorage.removeItem(endpoints?.auth?.STP_DATA);
      sessionStorage.removeItem(endpoints?.auth?.SWITCH_STP_DATA);
      sessionStorage.removeItem(endpoints?.auth?.INVEST_DATA);
      window.location.reload();
    },
    [history]
  );

  const handleUserChange = useCallback(
    (item, referData) => {
      const { USER_ROLE_kEY, USER_ROLE_DATA, USER_DETAILS, USER_DETAILS_KEY } =
        endpoints?.auth;
      let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
      let userDetailValue = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
      if (userRoleData?.ClientCode === item?.UserID) {
        history.push("/");
        return null;
      }
      if (userDetailValue) {
        let AppLoginFirstData = {
          name: item?.Name,
          role_id: userDetailValue?.apploginRole[0]?.role_id,
          rolename: userDetailValue?.apploginRole[0]?.rolename,
          code: referData?.ClientCode,
          Mobile: userDetailValue?.apploginRole[0]?.Mobile,
          SubBroker_Code: userDetailValue?.subBrokerDetails?.SubBroker_Code,
          ARN_No: userDetailValue?.subBrokerDetails?.ARN_No,
          EUIN_No: userDetailValue?.subBrokerDetails?.EUIN_No,
          Master_Broker: userDetailValue?.subBrokerDetails?.Master_Broker,
          uid: referData?.uid,
          SBCode: referData?.SBCode,
          RMCode: referData?.RMCode,
          ClientCode: referData?.ClientCode,
          FullName: referData?.FullName,
          Email: referData?.Email,
          Phone_Number: referData?.Phone_Number,
          ReferralCode: referData?.ReferralCode,
          ReferralLink: referData?.ReferralLink,
          ReferralCount: referData?.ReferralCount,
        };
        handleSessionSet(AppLoginFirstData);
      }
    },
    [history, handleSessionSet]
  );

  const referralData = useCallback(
    (item) => {
      const { USER_ROLE_kEY, USER_ROLE_DATA } = endpoints.auth;
      let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
      let data = {
        UserCode: item?.UserID,
        RoleId: userRoleData?.role_id,
      };
      getUserReferralInfoApi(data).then((data) => {
        handleUserChange(item, data?.UserInfo);
      });
    },
    [getUserReferralInfoApi, handleUserChange]
  );

  return (
    <React.Fragment>
      {familyMembersDetailsTable?.length > 0 ? (
        <TableWrapper
          className="table-block"
          headerDetails={FamilyMemberTableHeader}
        >
          {familyMembersDetailsTable?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    <div
                      className="primary-color cursor-pointer"
                      onClick={() => {
                        referralData(item);
                      }}
                    >
                      {item?.Name}
                    </div>
                  </td>
                  <td align="right">
                    {amountWithoutRs(item?.TotalInvestment)}
                  </td>
                  <td align="right">{amountWithoutRs(item?.CurrentValue)}</td>
                  <td align="right">{amountWithoutRs(item?.RealisedGain)}</td>
                  <td align="right">{amountWithoutRs(item?.UnrealisedGain)}</td>
                  <td align="right">{amountWithoutRs(item?.DividentPayout)}</td>
                  <td align="right">{amountWithoutRs(item?.TotalProfit)}</td>
                  <td align="right">
                    {percentageValidatorWOP(item?.AbsoluteReturn)}
                  </td>
                  <td align="right">{percentageValidatorWOP(item?.XIRR)}</td>
                </tr>
                {familyMembersDetailsTable?.length - 1 > index && (
                  <tr className="empty-height">
                    <td colSpan="9"></td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </TableWrapper>
      ) : (
        <EmptyRecord />
      )}
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserReferralInfoApi: getUserReferralInfo,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(FamilyMemberTable));
