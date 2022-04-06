import React, { useCallback, useEffect, useState } from "react";
import ShareIcon from "../../../../assets/images/share-blue.svg";
import DownloadIcon from "../../../../assets/images/download.svg";
import RefreshIcon from "../../../../assets/images/refresh.svg";
import SuggestPlan from "./SuggestPlan";
import "./InvestmentPlan.scss";
import CommonSectionTitle from "components/Common/CommonSectionTitle";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSurveySchemeList,
  GetQuestionResponseList,
  SaveGoalForFuture,
} from "redux/action/clientFlow/BuyInvestAct";
import { withRouter } from "react-router-dom";
import { PageLoader } from "components/Common/PageLoader";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { history } from "service/helpers";
import axios from "axios";
import { endpoints } from "service/helpers/config";
import { getDataFromStorage } from "service/helperFunctions";
import { Toast } from "service/toast";
import { useParams } from "react-router-dom";
import MandateSection from "./MandateSection";

const InvestmentPlan = ({
  getSurveySchemeListApi,
  getQuestionResponseListApi,
  saveGoalForFutureApi,
}) => {
  const [loader, setLoader] = useState(true);
  const [mandateValue, setMandateValue] = useState({});
  const [showMandateList, setShowMandateList] = useState(false);
  const [breadCrumbsList, setBreadCrumbsList] = useState([
    {
      redirection: () => history.push("/buy-investment"),
      label: "Invest",
    },
    {
      label: "",
    },
  ]);
  const [headerQuestion, setHeaderQuestions] = useState([]);
  const [progressCompletionState, setProgressCompletionState] = useState({});
  const [suggestPlanData, setSuggestPlanData] = useState([
    {
      id: 1,
      planLabel: "Monthly SIP",
      schemesData: [],
    },
    {
      id: 2,
      planLabel: "One time investment",
      schemesData: [],
    },
  ]);

  const { Equity = 0, debt = 0 } = progressCompletionState;

  const { client_code, surveyId, isPreviousGoal } = useParams();

  useEffect(() => {
    getHeaderSection();
    getSchemeListFunc();
  }, []);

  const handleChangeMandate = (val) => {
    setMandateValue(val);
  };

  const getDownloadFileUrl = () => {
    const { TOKEN, TOKEN_KEY } = endpoints.auth;

    let token = getDataFromStorage(TOKEN, TOKEN_KEY);
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASE_URL}DownloadGoalPlanPDF?ClientCode=${client_code}&SurveyId=${surveyId}
        `,
      responseType: "blob",
      headers: {
        token: token,
      },
    };
    axios(config)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "goal.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => {
        Toast({ type: "error", message: "Something went wrong" });
      });
  };

  const getHeaderSection = () => {
    let query = {
      surveyID: 28539,
    };
    setLoader(true);
    getQuestionResponseListApi({ ...query })
      .then(({ GetSurveyListResponse }) => {
        setHeaderQuestions(GetSurveyListResponse);
        let breadCrumSection = breadCrumbsList;
        breadCrumSection[1].label = GetSurveyListResponse.find(
          (val) => val.ShortText === "Goal Name"
        ).ValueText;
        setBreadCrumbsList(breadCrumSection);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSchemeListFunc = () => {
    let body = {
      ClientCode: client_code,
      Surveyid: surveyId,
    };
    setLoader(true);
    getSurveySchemeListApi(body)
      .then(({ ObjectResponse: { assetAllocation, schemeList } }) => {
        if (assetAllocation && schemeList) {
          setProgressCompletionState(assetAllocation);
          let modifyResponse = suggestPlanData;
          modifyResponse[0].schemesData = schemeList.filter(
            (val) => val.schemesDetail.Flag === "SIP"
          );
          modifyResponse[1].schemesData = schemeList.filter(
            (val) => val.schemesDetail.Flag === "OneTime"
          );
          setSuggestPlanData([...modifyResponse]);
        }
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  const deletePlan = (parentIndex, childIndex) => {
    let filterData = suggestPlanData;
    let findingSchemeAmount =
      parseInt(
        filterData[parentIndex].schemesData[childIndex].schemesDetail
          .PurchaseAmount
      ) / parseInt(filterData[parentIndex].schemesData.length - 1);

    filterData[parentIndex].schemesData.splice(childIndex, 1);

    filterData[parentIndex].schemesData.map(({ schemesDetail }) => {
      return (schemesDetail.PurchaseAmount =
        schemesDetail.PurchaseAmount + findingSchemeAmount);
    });

    setSuggestPlanData([...filterData]);
  };

  const changeProgressBarClassName = useCallback(() => {
    let completion = document.getElementById("completion");
    let remaining = document.getElementById("remaining");
    completion.style.flex = `0 0 ${Equity.toString()}%`;
    remaining.style[debt === 0 ? "display" : "flex"] =
      debt === 0 ? " none" : `0 0 ${debt.toString()}%`;
    // let completionText = document.getElementById("completionText");
    // let remainingText = document.getElementById("remainingText");
    // remainingText.style.flex = `0 0 ${debt.toString()}%`;
    // completionText.style.flex = `0 0 ${Equity}%`;
  }, [Equity, debt]);

  useEffect(() => {
    changeProgressBarClassName();
  }, [changeProgressBarClassName, progressCompletionState]);

  const changeDepositAmount = (value, parentIndex, childIndex) => {
    let filterData = suggestPlanData;
    filterData[parentIndex].schemesData[
      childIndex
    ].schemesDetail.PurchaseAmount = value === "" ? 0 : parseInt(value);
    setSuggestPlanData([...filterData]);
  };

  const saveGoalFutureFunc = () => {
    let body = {
      ClientCode: client_code,
      Surveyid: surveyId,
    };
    saveGoalForFutureApi(body)
      .then(() => {
        Toast({ type: "success", message: "Successfully saved" });
      })
      .catch(() => {
        Toast({ type: "error", message: "Something went wrong" });
      });
  };

  const investToScheme = () => {
    setShowMandateList(true);
    setTimeout(() => {
      const questionScroll = document.getElementById("continueButton");
      questionScroll.scrollIntoView({
        behavior: "smooth",
      });
    }, 1000);
  };

  const continueToNext = () => {
    if (suggestPlanData[0]?.schemesData[0].Flag === "SIP") {
      let sum = suggestPlanData[0].schemesData?.reduce(
        (tot, { schemesDetail: { PurchaseAmount } }) => {
          return tot + PurchaseAmount;
        },
        0
      );
      if (sum < mandateValue.Amount) {
        Toast({ type: "Success", message: "Success" });
      } else {
        Toast({
          type: "error",
          message: "SIP value must be smaller than mandate value",
        });
      }
    }
  };

  return (
    <div className="investment-plan-page">
      <div className="current-page-title">
        <BreadCrumbs breadCrumbsList={breadCrumbsList} />
        <div className="icon-block">
          <img
            src={RefreshIcon}
            alt="RefreshIcon"
            onClick={getSchemeListFunc}
          />
          <img
            src={DownloadIcon}
            alt="DownloadIcon"
            onClick={getDownloadFileUrl}
          />
          <img src={ShareIcon} alt="RefreshIcon" />
        </div>
        <div className="right-side">
          {isPreviousGoal !== "true" && (
            <button
              className="primary-btn bordered"
              onClick={saveGoalFutureFunc}
            >
              Save for future
            </button>
          )}
          {!showMandateList && (
            <button className="primary-btn" onClick={investToScheme}>
              Invest
            </button>
          )}
        </div>
      </div>
      <div className="top-section">
        {headerQuestion?.map(({ ShortText, ValueText }) => {
          return (
            <div className="list">
              <div className="label">{ShortText}</div>
              <div className="value">{ValueText}</div>
            </div>
          );
        })}
        {/* <div className="list">
          <div className="label">I will retire in:</div>
          <div className="value">29 years</div>
        </div>
        <div className="list">
          <div className="label">Suggested Plan:</div>
          <div className="value">Rs. 70,100,000</div>
        </div>
        <div className="list">
          <div className="label">Accepted Risk:</div>
          <div className="value">Aggressive</div>
        </div>
        <div className="list">
          <div className="label">Monthly expenses required:</div>
          <div className="value">Rs. 50,000</div>
        </div>
        <div className="list">
          <div className="label">One Time Investment:</div>
          <div className="value">Rs. 1,000,000</div>
        </div>
        <div className="list">
          <div className="label">Monthly SIP:</div>
          <div className="value">Rs. 2,000</div>
        </div> */}
      </div>
      <CommonSectionTitle titleText="Suggested Asset Allocation" />
      <div className="progress-section">
        <div className="progress-allocation">
          <div className="left" id={"completion"}>
            {Equity}%
          </div>
          <div className="right" id={"remaining"}>
            {debt}%
          </div>
        </div>
        <div className="progress-text">
          <div className="left" id={"completionText"}>
            Equity: <strong> {Equity}%</strong>
          </div>
          <div className="right" id={"remainingText"}>
            Debt: <strong>{debt}%</strong>
          </div>
        </div>
      </div>
      {loader ? (
        <PageLoader />
      ) : (
        <>
          <CommonSectionTitle titleText="Suggested Investment Plan" />
          <div className="bottom-list">
            {suggestPlanData?.map(({ schemesData, ...val }, index) => {
              return (
                <SuggestPlan
                  planHeader={val}
                  schemesData={schemesData}
                  suggestPlanData={suggestPlanData}
                  deletePlan={(childIndex) => deletePlan(index, childIndex)}
                  changeDepositAmount={(value, childIndex) =>
                    changeDepositAmount(value, index, childIndex)
                  }
                />
              );
            })}
          </div>

          {suggestPlanData[0].schemesData.length === 0 && showMandateList && (
            <MandateSection
              handleChangeMandate={handleChangeMandate}
              mandateValue={mandateValue}
              setMandateValue={setMandateValue}
            />
          )}
          {showMandateList && (
            <div
              id={"continueButton"}
              className="d-flex justify-content-center mt-4"
            >
              <button className="primary-btn" onClick={continueToNext}>
                Continue
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSurveySchemeListApi: getSurveySchemeList,
      getQuestionResponseListApi: GetQuestionResponseList,
      saveGoalForFutureApi: SaveGoalForFuture,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(InvestmentPlan));
