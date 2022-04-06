import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import { withRouter } from "react-router-dom";
import Ruppee from "assets/images/ruppee.svg";
import Popup from "components/Common/Popup/Popup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InvestmentGoalTab from "./GoalTab/index";
import CalculatePopup from "./CalculatePopup";
import { TabBlockheader } from "components/Common/TabBlockheader";
import { CommonAutoSearchSuggestion } from "components/Common/CommonAutoSearchSuggestion";
import { AppBack } from "components/Common/AppBack";
import {
  getInvestmentPlanDetails,
  getPreviousGoals,
  getBuyInvestHelpContent,
  getInvestmentPlan,
  buyInvestmentSearchBar,
} from "redux/action/clientFlow/BuyInvestAct";
import {
  getIpAddress,
  getDataFromStorage,
  amountWithRs,
} from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import ReactPlayer from "react-player";
import { Toast } from "service/toast";
import NumberFormat from "react-number-format";
import { PageLoader } from "components/Common/PageLoader";
import { NormalButton } from "components/Common";
import { useLang } from "hooks/useLang";

const GET_INVEST_PLAN_ACTION = "getInvestmentPlanAction";

const ClientBuyInvestmentNew = (props) => {
  const { errorText } = useLang();
  const [calculatePopup, setCalculatePopup] = useState(false);
  let [userOptions, setUserOptions] = useState([]);
  let [planRecommend, setPlanRecommend] = useState(null);
  let [inputsObj, setInputsObj] = useState(null);
  let [commonGoal, setCommonGoal] = useState(null);
  let [previousGoals, setPreviousGoals] = useState([]);
  let [seachSchemesList, setSeachSchemesList] = useState([]);
  const [searchSchemeText, setSearchSchemeText] = useState("");
  const [pageLoaderState, setPageLoaderState] = useState(true);
  const { Labels } = useLang();

  const [helpContentLink, setHelpContentLink] = useState({
    openHelpModal: false,
    contentType: "",
    contentLink: "",
    contentLabel: "",
  });
  const { error_title } = endpoints.response_error_msg;
  const { error_onefiled_msg } = errorText?.invest_page_error || {};
  const {
    history,
    getInvestmentPlanDetailsApi,
    getPreviousGoalsApi,
    getBuyInvestHelpContentApi,
    getInvestmentPlanApi,
    buyInvestmentSearchBarApi,
  } = props;
  const { USER_DETAILS, USER_DETAILS_KEY } = endpoints.auth;

  let userData = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
  let client_code = userData?.UserReferralInfo?.ClientCode;

  const handleChange = ({ target }, index) => {
    let { value } = target;
    inputsObj.DataInputList[index].Description = amountWithRs(value);
    setInputsObj({ ...inputsObj });
  };

  const getInvestmentPlanDetailsFunc = useCallback(async () => {
    let ipData = await getIpAddress();
    if (ipData && userData) {
      let uid = userData?.UserReferralInfo?.uid;
      let role_id =
        userData?.apploginRole?.length !== 0
          ? userData?.apploginRole[0].role_id
          : "";
      let body = {
        ClientCode: client_code,
        ApiName: "getInvestmentPlan",
        UserRequest: {
          UID: uid,
          LoggedInRoleId: role_id,
          IPAddress: ipData.data,
          Source: endpoints.auth.Source,
          AppOrWeb: endpoints.auth.WEB,
          deviceInfo: endpoints.auth.APIDEVICEINFO,
        },
      };
      getInvestmentPlanDetailsApi(body).then(({ UserJourneyOptions }) => {
        UserJourneyOptions && setUserOptions(UserJourneyOptions);
        let planOptions = UserJourneyOptions.find(
          (x) => x.Label === "How do you want to plan your investment?"
        );
        if (planOptions) {
          setPageLoaderState(false);
          setPlanRecommend(planOptions);
          let tempObj = planOptions.DataInput[0];
          setInputsObj(tempObj);
          setCommonGoal(
            planOptions.DataInput.splice(1, planOptions.DataInput.length)
          );
        }
      });
      getPreviousGoalsApi({ client_code }).then(({ DataObject }) => {
        setPreviousGoals(DataObject);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getInvestmentPlanDetailsApi, getPreviousGoalsApi]);

  useEffect(() => {
    getInvestmentPlanDetailsFunc();
  }, [getInvestmentPlanDetailsFunc]);

  useEffect(() => {
    searchScheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHelpContent = (type) => {
    let body = {
      Features: "InvestmentPlanner",
      Product: "Investment",
      SchemeCode: "",
      user: "",
    };
    getBuyInvestHelpContentApi(body).then(({ ObjectResponse: { Links } }) => {
      let linkData = Links.find((val) => val.Label === type);
      setHelpContentLink({
        openHelpModal: true,
        contentType: linkData.Type,
        contentLink: linkData.Link,
        contentLabel: linkData.Label,
      });
    });
  };

  //invest plan handle GO button Fn
  const handleSubmit = async (id) => {
    let ipData = await getIpAddress();
    if (ipData && userData) {
      let uid = userData?.UserReferralInfo?.uid;
      let role_id =
        userData?.apploginRole?.length !== 0
          ? userData?.apploginRole[0].role_id
          : "";
      let inputObjValidate = inputsObj.DataInputList.filter(
        (ele) => ele.Description !== ""
      );
      let ValueArray = [];
      inputObjValidate.map((ele) => {
        ValueArray.push({
          journeyID: ele.ID,
          value: ele.Description.substr(3),
        });
        return ValueArray;
      });
      if (inputObjValidate.length > 0) {
        let body = {
          ClientCode: client_code,
          ApiName: GET_INVEST_PLAN_ACTION,
          JourneyID: id,
          Value: ValueArray,
          UserRequest: {
            UID: uid,
            LoggedInRoleId: role_id,
            IPAddress: ipData.data,
            Source: endpoints.auth.Source,
            AppOrWeb: endpoints.auth.WEB,
            deviceInfo: endpoints.auth.APIDEVICEINFO,
          },
        };
        getInvestmentPlanApi(body).then(({ Goal }) => {
          history.push(
            `/planInvestmentView/${Goal?.Id}/${Goal?.NextQuestionId}/${Goal?.QuestionSurveyListId}`
          );
        });
      } else {
        Toast({ type: error_title, message: error_onefiled_msg });
      }
    }
  };
  const handleSearchScheme = ({ target: { value } }) => {
    value !== "<" && value !== ">" && setSearchSchemeText(value);
    // debounceFunction(() => searchScheme(value), 1000);
  };

  const searchScheme = (value = "") => {
    let body = {
      AMCCode: "All",
      SchemeOptions: "",
      SchemeType: "All",
      SearchText: value.toLowerCase(),
      TransactionType: "One-Time Purchase",
    };
    buyInvestmentSearchBarApi(body)
      .then(({ seachSchemesList }) => {
        let data = [];
        seachSchemesList.length > 0 &&
          seachSchemesList.map(({ SchemeCode, SchemeName }) => {
            return data.push({
              label: SchemeName,
              value: SchemeCode,
            });
          });
        setSeachSchemesList([...data]);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  const onSelectOptionValue = (value, option) => {
    setSearchSchemeText(option.children);
    // setSelectedSchemeData(option);
  };

  const { openHelpModal, contentType, contentLink } = helpContentLink;
  if (pageLoaderState) {
    return <PageLoader />;
  }
  return (
    <div className="buy-investment">
      <AppBack label={Labels.invest} onClick={() => history.goBack()} />
      <div className="help_contents">
        <label onClick={() => getHelpContent("Help Video")}>
          {Labels.helpVideo}
        </label>
        <label onClick={() => getHelpContent("Step-by-step Guide")}>
          {Labels.stepGuide}
        </label>
      </div>
      <div className="content-title">
        <div className="left">{planRecommend?.Label}</div>
        <div className="right">
          <p
            onClick={() => setCalculatePopup(true)}
            className="mb-0 text-green cursor-pointer"
          >
            {Labels.wantinvestment}
          </p>
        </div>
      </div>
      <div className="form-block">
        {inputsObj && (
          <div className="form-box">
            <TabBlockheader
              icon={inputsObj.ImagePath || Ruppee}
              label={inputsObj.Label}
              isBlueBg
            />
            <div className="form-content invest-plan">
              <div className="row">
                {inputsObj.DataInputList?.map((inputList, index) => (
                  <div className="col-9" key={index}>
                    {inputList.Datatype === endpoints.button ? (
                      <>
                        <NormalButton
                          className="primary-btn mt-3"
                          onClick={() => handleSubmit(inputList.ID)}
                          label={inputList.Label}
                        ></NormalButton>
                      </>
                    ) : (
                      <>
                        <p className="label">{inputList.Label} :</p>
                        <NumberFormat
                          className="rs-format"
                          value={inputList.Description}
                          thousandSeparator={true}
                          prefix={Labels.ruppee}
                          onChange={(e) => handleChange(e, index)}
                          label={inputList.Label}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="form-box">
          <TabBlockheader label={Labels.previousGoals} isBlueBg />
          <div className="form-content mx-3 mt-3 pt-1">
            {previousGoals.length !== 0 ? (
              previousGoals.map((list, index) => (
                <div
                  className="list me-3"
                  key={index}
                  onClick={history.push(
                    `/investmentPlan/${client_code}/${list.Surveyid}/${true}`
                  )}
                >
                  {list.SurveyName}
                </div>
              ))
            ) : (
              <p className="text-center my-3">{Labels.noPreviousGoals}</p>
            )}
          </div>
        </div>
      </div>

      <div className="auto_suggestion_search">
        <CommonAutoSearchSuggestion
          headerClassName="w-50 mr-3"
          subClassName="w-100"
          onChange={handleSearchScheme}
          placeholder={Labels.searchScheme}
          optionsList={seachSchemesList}
          value={searchSchemeText}
          onSelectOption={onSelectOptionValue}
        />
        <div className="suggestion_submit">
          <button
            className="primary-btn"
            disabled={searchSchemeText === "" && true}
          >
            {Labels.submit}
          </button>
        </div>
      </div>

      <InvestmentGoalTab userOptions={userOptions} commonGoal={commonGoal} />
      <div className="calculate-popup">
        {calculatePopup && (
          <Popup setPopup={setCalculatePopup} isOpen={calculatePopup}>
            <CalculatePopup />
          </Popup>
        )}
      </div>
      {openHelpModal && (
        <Popup
          setPopup={() =>
            setHelpContentLink({
              ...helpContentLink,
              openHelpModal: false,
            })
          }
          isOpen={openHelpModal}
        >
          {
            <div>
              {contentType === endpoints.video && (
                <ReactPlayer url={contentLink} className="w-100" />
              )}
              {contentType === endpoints.pdf && (
                <iframe
                  src="https://cms.nivesh.com/portfolio/content/help/Investment_Planner_Help.pdf"
                  width="100%"
                  height="500px"
                  title="check"
                />
              )}
            </div>
          }
        </Popup>
      )}
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getInvestmentPlanDetailsApi: getInvestmentPlanDetails,
      getPreviousGoalsApi: getPreviousGoals,
      getBuyInvestHelpContentApi: getBuyInvestHelpContent,
      getInvestmentPlanApi: getInvestmentPlan,
      buyInvestmentSearchBarApi: buyInvestmentSearchBar,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ClientBuyInvestmentNew));
