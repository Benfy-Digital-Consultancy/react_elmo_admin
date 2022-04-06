import React from "react";
import "./style.scss";
import RetirementIcon from "assets/images/retirement.svg";
import ReportIcon from "assets/images/report-white.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { FeatureCard } from "components/Common/FeatureCard";
import { TabBlockheader } from "components/Common/TabBlockheader";
import { endpoints } from "service/helpers/config";
import { getDataFromStorage } from "service/helperFunctions";
import { getInvestmentPlanAction } from "redux/action/clientFlow/BuyInvestAct";

const RecommendTab = ({ userOptions = [], getInvestmentPlanActionApi }) => {
  const history = useHistory();

  // handleCreateMandate
  const getInvestmentPlanAction = (inputList, list) => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    const { ClientCode, uid, role_id } = userRoleData;
    let payload = {
      ClientCode: ClientCode,
      ApiName: "getInvestmentPlanAction",
      JourneyID: inputList.ID,
      Value: "",
      UserRequest: {
        UID: uid,
        LoggedInRoleId: role_id,
        IPAddress: sessionStorage.getItem(endpoints.auth.IP),
        Source: endpoints.auth.Source,
        AppOrWeb: endpoints.auth.WEB,
        deviceInfo: endpoints.auth.APIDEVICEINFO,
      },
    };
    getInvestmentPlanActionApi(payload).then((data) => {
      if (data) {
        const { ActionName, Product } = data;

        if (
          ActionName === "FixedDepositBuySchemesActivity" ||
          ActionName === "BuyDigitalGoldActivity" ||
          ActionName === "BuildWealthActivity"
        ) {
          history.push(
            `/scheme-details/${list.Label}?schemeTitle=${inputList?.Label}&productId=${Product?.Product_Id}`
          );
        }else if(ActionName === "QuestionaireActivity"){
          alert(ActionName);
          // history.push(
          //   `/planInvestmentView/${list?.Goal?.Id}/${list?.Goal?.NextQuestionId}/${list?.Goal?.Id}`
          // );
        }else{
          alert(ActionName);
        }
      }
    });
  };

  return (
    <>
      {userOptions
        .filter((x) => x.Label === "Recommended Schemes")
        .map(({ DataInput }) =>
          DataInput.map((list, listIndex) => (
            <div className="tab-block" key={listIndex}>
              <TabBlockheader icon={ReportIcon} label={list.Label} />
              <div className="tab-block-content">
                {list.DataInputList.map((inputList, index) => (
                  <FeatureCard
                    icon={inputList.ImagePath || RetirementIcon}
                    label={inputList.Label}
                    key={index}
                    onClick={() => {
                      getInvestmentPlanAction(inputList, list);
                    }}
                  />
                ))}
              </div>
            </div>
          ))
        )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getInvestmentPlanActionApi: getInvestmentPlanAction,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(RecommendTab);
