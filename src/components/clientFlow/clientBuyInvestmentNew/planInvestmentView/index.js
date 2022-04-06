import React, { useState, useEffect, useCallback } from "react";
import { withRouter, useParams } from "react-router-dom";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  GetQuestion,
  SaveQuestionSurveyList,
} from "redux/action/clientFlow/BuyInvestAct";
import { PageLoader } from "components/Common/PageLoader";
import { Steps } from "antd";
import { endpoints } from "service/helpers/config";
import { getDataFromStorage } from "service/helperFunctions";
import moment from "moment";
import { ImageBaseUrl } from "service/helpers/Constants";
import { Slider, InputNumber } from "antd";
import { NormalButton } from "components/Common";
import { EditOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Toast } from "service/toast";
import { useLang } from "hooks/useLang";
import "./View.scss";

const { Step } = Steps;

//API CONDITION KEY
const SLIDER_TEXT_BOX = endpoints.SliderTextBox;
const RADIO_BUTTON_LIST = endpoints.RadioButtonList;
const FREE_TEXT_BOX = endpoints.FreeTextBox;
const YEARS = endpoints.Years;
const AMOUNT = endpoints.amount;

const PlanInvestmentView = (props) => {
  const { errorText, Labels } = useLang();
  let { history, GetQuestionApi, SaveQuestionSurveyListApi } = props;
  const breadCrumbsList = [
    {
      redirection: () => history.push("/buy-investment"),
      label: Labels.invest,
    },
    {
      label: Labels.Howdoinvestment,
    },
  ];
  const RUPEES_SYMBOL = Labels.ruppee;
  const { Id, NextQuestionId, QuestionSurveyListId } = useParams();
  let questionParam = { QuestionId: NextQuestionId, QuestionSurveyListId, Id };

  const [pageLoaderState, setPageLoaderState] = useState(true);

  //STEPPER ARRAY LIST
  let [isStep, setIsStep] = useState([]);

  ///CURRENT STEP VALUES & QUESTION
  let [currentStep, setCurrentStep] = useState(0);
  let [nextQnId, setNextQnId] = useState(null);
  let [currentQnId, setCurrentQnId] = useState(null);
  // DYNAMIC STATE
  const [sliderFields, setSliderFields] = useState({});
  const [childText, setChildText] = useState("");
  const { error_title } = endpoints.response_error_msg;
  const { error_child_msg } = errorText?.invest_page_error || {};

  const getAllProductInvestFn = useCallback(() => {
    commonGetQuestionFn(questionParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GetQuestionApi, Id, NextQuestionId, QuestionSurveyListId]);

  useEffect(() => {
    getAllProductInvestFn();
  }, [getAllProductInvestFn]);

  const commonGetQuestionFn = (body) => {
    GetQuestionApi(body).then((data) => {
      if (data) {
        setPageLoaderState(false);
        let { ObjectResponse = {} } = data;
        let { Responses = [] } = ObjectResponse;
        if (Responses) {
          let { NextQuestionId, QuestionId } = Responses[0];

          setNextQnId(NextQuestionId);
          setCurrentQnId(QuestionId);

          let dataList = [...isStep];
          dataList.push({
            ObjectResponse,
          });
          setIsStep(dataList);
          setCurrentStep(currentStep + 1);
        }
      }
    });
  };

  ///STEPPER HANDLE FUNCTION
  const handleSteper = (e) => {
    let filteredStep = isStep.filter((ele, index) => e >= index);
    setIsStep(filteredStep);
    setCurrentStep(filteredStep.length);
    let currentqn = isStep.filter((ele, index) => e === index);
    setCurrentQnId(currentqn[0]?.ObjectResponse?.Responses[0]?.QuestionId);
    setNextQnId(currentqn[0]?.ObjectResponse?.Responses[0]?.NextQuestionId);
  };

  ///GET CURRENT STEPER DATA'S
  let currentStepperName =
    isStep[currentStep - 1]?.ObjectResponse?.ConntrolName;
  let currentStepperData = isStep[currentStep - 1]?.ObjectResponse;
  if (currentStepperData) {
    var { MaxValue, MinValue, Description, DefaultValue } =
      currentStepperData?.Responses[0];
  }

  const handleInput = (e, nameKey, id) => {
    let {
      target: { value },
    } = e;
    let fieldName = nameKey.concat(id);
    setSliderFields({ ...sliderFields, [fieldName]: value });
  };

  const handleChange = (value, name, id) => {
    let fieldName = name.concat(id);
    setSliderFields({ ...sliderFields, [fieldName]: value });
  };

  const handleSubmit = (
    currentStepperName,
    isData,
    currentFieldName,
    defaultValue,
    currentId
  ) => {
    let redirect = isData?.Responses?.filter(
      (item) => item.NextQuestionId !== null || item.QuestionId
    );
    let sliderText;
    if (currentStepperName === SLIDER_TEXT_BOX) {
      sliderText = sliderFields[currentFieldName];
    } else if (currentStepperName === RADIO_BUTTON_LIST) {
      let getSelectedText = isData?.Responses.filter(
        (item) => item.Id === sliderFields[currentFieldName]
      )[0]?.DisplayText;
      sliderText = getSelectedText;
    } else if (currentStepperName === FREE_TEXT_BOX) {
      sliderText = sliderFields[currentFieldName];
    }
    if (redirect.length > 0) {
      const { USER_DETAILS, USER_DETAILS_KEY } = endpoints.auth;
      let userData = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
      let uid = userData?.UserReferralInfo?.uid;
      let currentDate = moment().format(endpoints.dateFormat);
      let body = {
        Id: QuestionSurveyListId,
        uid: uid,
        SurveyName: sliderText ? sliderText : defaultValue,
        QuestionResponseList: [
          {
            Id: QuestionSurveyListId,
            QuestionSurveyListId: QuestionSurveyListId,
            QuestionId: currentQnId,
            ResponseId: currentQnId,
            ValueText: sliderText ? sliderText : defaultValue,
            created_date: currentDate,
          },
        ],
        created_date: currentDate,
      };
      if (currentId === 15) {
        let valText = sliderFields[currentFieldName]
          ? sliderFields[currentFieldName]
          : defaultValue;
        body.SurveyName = endpoints.childEducation;
        body.QuestionResponseList[0].ValueText = `${childText} - ${valText}`;
      }
      if (childText === "" && currentId === 15) {
        Toast({ type: error_title, message: error_child_msg });
      } else {
        SaveQuestionSurveyListApi(body).then((data) => {
          if (nextQnId) {
            questionParam.QuestionId = nextQnId;
            commonGetQuestionFn(questionParam);
          } else {
            let userRoleData = getDataFromStorage(
              endpoints.auth.USER_ROLE_kEY,
              endpoints.auth.USER_ROLE_DATA
            );
            const { ClientCode } = userRoleData;
            history.push(
              `/investmentPlan/${ClientCode}/${QuestionSurveyListId}/${false}`
            );
          }
        });
      }
    }
  };

  let defaultValue = parseInt(DefaultValue);
  let currentFieldName = currentStepperData?.ConntrolName.concat(
    currentStepperData?.Id
  );
  let currentControlName = currentStepperData?.ConntrolName;
  let currentId = currentStepperData?.Id;

  if (pageLoaderState) {
    return <PageLoader />;
  }

  return (
    <div className="buy-investment-view">
      <div className="with-overlay">
        <div className="overlay"></div>
        <div className="overlay-content">
          <div className="mb-4 py-3 px-3 pb-1 mx-1">
            <BreadCrumbs breadCrumbsList={breadCrumbsList} />
          </div>
          <div className="page-content">
            <div className="stepper mb-2">
              <Steps current={currentStep} onChange={handleSteper}>
                {isStep?.map((item, index) => {
                  return (
                    <Step
                      key={index}
                      icon={<EditOutlined />}
                      description={item?.ObjectResponse?.ShortText}
                    />
                  );
                })}
              </Steps>
            </div>
            <div className="slider-block">
              <div className="slider-box-outer">
                {currentStep === isStep.length && (
                  <>
                    {currentStepperName === SLIDER_TEXT_BOX ? (
                      <div className="slider-box">
                        {currentStepperData?.PrevResponse && (
                          <div className="slider-box-header free-text extra">
                            {currentStepperData?.PrevResponse}
                          </div>
                        )}
                        <div className="slider-box-header">
                          {currentStepperData?.Text}
                          {currentId === 15 && (
                            <>
                              <Input
                                className="antd-child-text"
                                placeholder={`${Labels.EnterYour} ${currentStepperData?.ShortText}`}
                                label={`${Labels.EnterYour} ${currentStepperData?.ShortText}`}
                                onChange={(e) => {
                                  setChildText(e.target.value);
                                }}
                                value={childText ? childText : ""}
                              />
                            </>
                          )}
                        </div>
                        <div className="slider-body">
                          {defaultValue && (
                            <>
                              <Slider
                                marks={{
                                  [MinValue]: `${
                                    Description === AMOUNT || endpoints.enter
                                      ? RUPEES_SYMBOL
                                      : ""
                                  } ${MinValue} ${
                                    Description === YEARS ? YEARS : ""
                                  }`,
                                  [MaxValue]: `${
                                    Description === AMOUNT || endpoints.enter
                                      ? RUPEES_SYMBOL
                                      : ""
                                  } ${MaxValue} ${
                                    Description === YEARS ? YEARS : ""
                                  }`,
                                }}
                                min={MinValue}
                                max={MaxValue}
                                defaultValue={defaultValue}
                                onChange={(e) => {
                                  handleChange(
                                    e,
                                    currentControlName,
                                    currentId
                                  );
                                }}
                                value={
                                  typeof sliderFields[currentFieldName] ===
                                  endpoints.number
                                    ? sliderFields[currentFieldName]
                                    : defaultValue
                                }
                              />
                              <div className="slider-input">
                                <div className="position-relative">
                                  <InputNumber
                                    min={MinValue}
                                    max={MaxValue}
                                    value={`${
                                      sliderFields[currentFieldName]
                                        ? sliderFields[currentFieldName]
                                        : defaultValue
                                    }`}
                                    onChange={(e) => {
                                      handleChange(
                                        e,
                                        currentControlName,
                                        currentId
                                      );
                                    }}
                                  />
                                  <span
                                    className={`${
                                      Description === YEARS
                                        ? Labels.isYears
                                        : Labels.amount
                                    } slider-input-text`}
                                  >
                                    {Description === YEARS
                                      ? YEARS
                                      : RUPEES_SYMBOL}
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ) : currentStepperName === RADIO_BUTTON_LIST ? (
                      <div className="slider-box">
                        {currentStepperData?.PrevResponse && (
                          <div className="slider-box-header free-text extra">
                            {currentStepperData?.PrevResponse}
                          </div>
                        )}
                        <div className="slider-box-header risk-header">
                          {currentStepperData?.Text}
                        </div>
                        <div className="row justify-content-center">
                          {currentStepperData?.Responses?.map((ele, index) => (
                            <div className="col-3" key={index}>
                              <img
                                src={`${`${ImageBaseUrl}` + ele.DisplayImage}`}
                                alt={index}
                                className={`${
                                  ele.Id === sliderFields[currentFieldName] &&
                                  "active"
                                } risk_image`}
                                onClick={() => {
                                  handleChange(
                                    ele.Id,
                                    currentControlName,
                                    currentId
                                  );
                                }}
                              ></img>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : currentStepperName === FREE_TEXT_BOX ? (
                      <div className="slider-box">
                        {currentStepperData?.PrevResponse && (
                          <div className="slider-box-header free-text extra">
                            {currentStepperData?.PrevResponse}
                          </div>
                        )}
                        <div className="slider-box-header free-text">
                          {currentStepperData?.Text}
                        </div>
                        <div className="input-section goal-name-input">
                          <div className="input">
                            <Input
                              className="antd-input"
                              placeholder={`${Labels.EnterYour} ${currentStepperData?.ShortText}`}
                              label={`${Labels.EnterYour} ${currentStepperData?.ShortText}`}
                              onChange={(e) => {
                                handleInput(e, currentControlName, currentId);
                              }}
                              value={
                                sliderFields[currentFieldName]
                                  ? sliderFields[currentFieldName]
                                  : DefaultValue
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="text-right button-outer buy-btn">
              {isStep.length <= 1 && (
                <NormalButton
                  label="Cancel"
                  className="primary-btn bordered"
                  onClick={() => {
                    history.push("/buy-investment");
                  }}
                />
              )}
              <NormalButton
                disabled={
                  (currentStepperName === RADIO_BUTTON_LIST &&
                    sliderFields[currentFieldName] === undefined) ||
                  sliderFields[currentFieldName] === ""
                    ? true
                    : false
                }
                label={`${
                  currentStepperData?.Responses[0]?.NextQuestionId !== null
                    ? Labels.next
                    : Labels.submit
                }`}
                className="primary-btn"
                onClick={() => {
                  handleSubmit(
                    currentStepperName,
                    currentStepperData,
                    currentFieldName,
                    DefaultValue,
                    currentId
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      GetQuestionApi: GetQuestion,
      SaveQuestionSurveyListApi: SaveQuestionSurveyList,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(PlanInvestmentView));
