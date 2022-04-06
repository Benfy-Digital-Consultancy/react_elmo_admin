import React, { useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Popup from "components/Common/Popup/Popup";
import { NormalRadioButton } from "components/Common/NormalRadioButton";
import {
  saveSellQuestionaireGoal,
  saveCallLog,
} from "redux/action/clientFlow/SellAct";
import { setDataFromStorage } from "service/helperFunctions";
import { useHistory } from "react-router-dom";
import { useLang } from "hooks/useLang";

const QuestionPopup = ({
  questionPopup = false,
  setQuestionPopup,
  questionOptions = [],
  userRoleDetails,
  saveSellQuestionaireGoalApi,
  sellDetails,
  setConfirmPopup,
  saveCallLogApi,
}) => {
  const { Labels } = useLang();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [optionDetails, setOptionDetails] = useState(null);
  const history = useHistory();

  let { role_id = "", client_code = "" } = userRoleDetails || {};

  //handle Sell Submit
  const handleSellSubmit = ({ QuestionId, Action, ID }) => {
    let payload = {
      Id: 0,
      LoggedinUserId: client_code,
      LoggedinRoleId: role_id,
      ClientCode: client_code,
      GoalId: QuestionId,
      SolutionId: ID,
      OrderNumberOrLogId: "",
      Status: false,
      Action,
    };
    saveSellQuestionaireGoalApi(payload).then(() => {
      if (Action !== "Switch") {
        handleProceed();
      } else {
        //switch redirection
        setDataFromStorage(sellDetails, "SWITCH_STP_DATA_KEY", "switchStpData");
        history.push("/mutual-fund/switch");
      }
    });
  };

  const handleSaveCallLogSubmit = ({ Options }) => {
    let payload = {
      Type: "Client",
      Code: client_code,
      ModeId: "5",
      SubTypeId: "168",
      AssignedToRole: "3",
      CallTypeId: "2",
      LogTypeId: "1",
      CreatedBy: client_code,
      ModifiedBy: client_code,
      Status: "1",
      Description: `${client_code} ${sellDetails?.RTASchemeCode} ${sellDetails?.SchemeName} ${Options}`,
    };
    saveCallLogApi(payload).then(() => {
      handleProceed();
    });
  };

  const handleProceed = () => {
    setSelectedQuestion(null);
    setOptionDetails(null);
    setQuestionPopup(false);
    setConfirmPopup(true);
  };

  return (
    <div className="questionarie-popup">
      <Popup
        isOpen={questionPopup}
        setPopup={() => {
          setSelectedQuestion(null);
          setOptionDetails(null);
          setQuestionPopup(false);
        }}
      >
        <div className="d-flex justify-content-center mb-2">
          <p className="mb-0 fs-16 fw-600">{Labels.questionPopup.title}</p>
        </div>
        {!selectedQuestion ? (
          <React.Fragment>
            <div className="popup-title text-start">
              {Labels.questionPopup.proceed}
            </div>
            {questionOptions.map((list, index) => (
              <div key={index}>
                <NormalRadioButton
                  className="my-2 mx-0"
                  disabled={
                    selectedQuestion &&
                    list.Questions.Question !== selectedQuestion
                  }
                  checked={list.Questions.Question === selectedQuestion}
                  onChange={(e) => {
                    setSelectedQuestion(e.target.value);
                    setOptionDetails(list);
                  }}
                  label={list.Questions.Question}
                  name={list.Questions.Question}
                />
              </div>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              className="popup-title text-start"
              dangerouslySetInnerHTML={{
                __html: optionDetails?.Questions?.Message,
              }}
            />
            <div className="d-flex flex-wrap">
              {optionDetails?.SolutionList.map((option, index) => (
                <button
                  key={index}
                  className="primary-btn mt-1 me-1"
                  onClick={() => {
                    option.Action === "SaveCallLog"
                      ? handleSaveCallLogSubmit(option)
                      : handleSellSubmit(option);
                  }}
                >
                  {option.Options}
                </button>
              ))}
            </div>
          </React.Fragment>
        )}
      </Popup>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      saveSellQuestionaireGoalApi: saveSellQuestionaireGoal,
      saveCallLogApi: saveCallLog,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(QuestionPopup));
