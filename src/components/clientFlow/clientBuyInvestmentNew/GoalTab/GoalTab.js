import React from "react";
import "./style.scss";
import RetirementIcon from "assets/images/retirement.svg";
import ReportIcon from "assets/images/report-white.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FeatureCard } from "components/Common/FeatureCard";
import { TabBlockheader } from "components/Common/TabBlockheader";
import { getInvestmentPlan } from "redux/action/clientFlow/BuyInvestAct";
import { getIpAddress, getDataFromStorage } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { Toast } from "service/toast";
import { useHistory } from "react-router-dom";
import { useLang } from "hooks/useLang";

const GoalTab = ({ commonGoal = [], getInvestmentPlanApi }) => {
  const { errorText } = useLang();
  const history = useHistory();
  const { USER_DETAILS, USER_DETAILS_KEY } = endpoints.auth;
  let userData = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
  let client_code = userData?.UserReferralInfo?.ClientCode;
  const { error_title } = endpoints.response_error_msg;
  const { error_onefiled_msg } = errorText?.invest_page_error || {};

  const handleSubmit = async (id) => {
    let ipData = await getIpAddress();
    if (ipData && userData) {
      let uid = userData?.UserReferralInfo?.uid;
      let role_id =
        userData?.apploginRole?.length !== 0
          ? userData?.apploginRole[0].role_id
          : "";
      if (id) {
        let body = {
          ClientCode: client_code,
          ApiName: "getInvestmentPlanAction",
          JourneyID: id,
          Value: "",
          UserRequest: {
            UID: uid,
            LoggedInRoleId: role_id,
            IPAddress: ipData.data,
            Source: endpoints.auth.Source,
            AppOrWeb: endpoints.auth.WEB,
            deviceInfo: endpoints.auth.APIDEVICEINFO,
          },
        };
        getInvestmentPlanApi(body).then((data) => {
          if (data) {
            history.push(
              `/planInvestmentView/${data?.Goal?.Id}/${data?.Goal?.NextQuestionId}/${data?.Goal?.Id}`
            );
          }
        });
      } else {
        Toast({ type: error_title, message: error_onefiled_msg });
      }
    }
  };

  return (
    <>
      {commonGoal?.map(
        ({ DataInputList = [], Label, ImagePath }, listIndex) => (
          <div className="tab-block" key={listIndex}>
            <TabBlockheader icon={ImagePath || ReportIcon} label={Label} />
            <div className="tab-block-content">
              {DataInputList.map((inputList, index) => (
                <FeatureCard
                  onClick={() => handleSubmit(inputList.ID)}
                  icon={inputList.ImagePath || RetirementIcon}
                  label={inputList.Label}
                  key={index}
                />
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getInvestmentPlanApi: getInvestmentPlan,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(GoalTab);
