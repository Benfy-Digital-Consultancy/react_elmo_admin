import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TableWrapper from "components/Common/TableWrapper";
import { RiskProfileHeader } from "service/helpers/Constants";
import { getRiskProfileDetails } from "redux/action/clientFlow/MyProfileAct";
import { getDataFromStorage, date } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { PageLoader } from "components/Common/PageLoader";
import { EmptyRecord } from "components/Common/EmptyRecord";

const RiskTable = (props) => {
  const { getRiskProfileDetailsApi } = props;
  const [riskData, setRiskData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const userRoleDataValue = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    // let source = getDataFromStorage(
    //   endpoints.auth.WHITELIST_SOURCE_DATA,
    //   endpoints.auth.WHITELIST_SOURCE_KEY
    // );
    let body = {
      ClientCode: userRoleDataValue?.ClientCode,
      RoleId: userRoleDataValue?.role_id,
      Code: userRoleDataValue?.uid,
      HistoryFlag: "0",
      Source: "Nivesh.com",
      AppOrWeb: endpoints.auth.WEB,
    };
    getRiskProfileDetailsApi(body)
      .then((data) => {
        setRiskData(data?.ObjectResponse?.RiskProfile);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [getRiskProfileDetailsApi]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      {riskData?.length > 0 ? (
        <TableWrapper className="table-block" headerDetails={RiskProfileHeader}>
          {riskData?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td align="center">{item?.RiskProfileTitle}</td>
                  <td align="center">{date(item?.ReviewDate, "DD/MM/YYYY")}</td>
                  <td align="center">
                    {item?.AssetAllocation[0]?.SEBI_Category}
                  </td>
                  <td align="center">
                    {item?.AssetAllocation[0]?.Recommended}
                  </td>
                  <td align="center">{item?.AssetAllocation[0]?.Portfolio}</td>
                </tr>
                <tr>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center">
                    {item?.AssetAllocation[1]?.SEBI_Category}
                  </td>
                  <td align="center">
                    {item?.AssetAllocation[1]?.Recommended}
                  </td>
                  <td align="center">{item?.AssetAllocation[1]?.Portfolio}</td>
                </tr>
                <tr>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center">
                    {item?.AssetAllocation[2]?.SEBI_Category}
                  </td>
                  <td align="center">
                    {item?.AssetAllocation[2]?.Recommended}
                  </td>
                  <td align="center">{item?.AssetAllocation[2]?.Portfolio}</td>
                </tr>
                <tr className="empty-height" height="12" />
              </React.Fragment>
            );
          })}
        </TableWrapper>
      ) : (
        <EmptyRecord />
      )}
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getRiskProfileDetailsApi: getRiskProfileDetails,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(RiskTable));
