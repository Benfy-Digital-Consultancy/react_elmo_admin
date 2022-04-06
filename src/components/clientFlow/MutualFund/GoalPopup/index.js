import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getGoalsDetails,
  getLinkToGoalDetails,
} from "redux/action/clientFlow/MutualFundAct";
import { getDataFromStorage } from "service/helperFunctions";
import { Toast } from "service/toast";
import { GoalTitles } from "service/helpers/Constants";
import { EmptyRecord } from "components/Common/EmptyRecord";
import { PageLoader } from "components/Common/PageLoader";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import Popup from "components/Common/Popup/Popup";
import { NormalCheckbox } from "components/Common";

const GoalPopup = (props) => {
  const { Labels, errorText } = useLang();
  const {
    item,
    openGoalPopup,
    setOpenGoalPopup,
    getGoalsDetailsApi,
    getLinkToGoalDetailsApi,
  } = props;
  const { error_title, success_title } = endpoints.response_error_msg;
  const { option_message } = errorText?.goal_error_message || {};
  const [existingGoals, setExistingGoals] = useState([]);
  const [newGoals, setNewGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTableTab, setActiveTableTab] = useState(Labels?.existingGoals);

  const getGoalsData = useCallback(() => {
    setLoading(true);
    const userRoleDataValue = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    let source = getDataFromStorage(
      endpoints.auth.WHITELIST_SOURCE_DATA,
      endpoints.auth.WHITELIST_SOURCE_KEY
    );
    let body = {
      ClientCode: userRoleDataValue?.ClientCode,
      UserRequest: {
        UID: userRoleDataValue?.uid,
        LoggedInRoleId: userRoleDataValue?.role_id,
        IPAddress: sessionStorage.getItem(endpoints.auth.IP),
        Source: source,
        AppOrWeb: endpoints.auth.WEB,
        deviceInfo: endpoints.auth.APIDEVICEINFO,
      },
    };
    getGoalsDetailsApi(body)
      .then((data) => {
        let apiData = data?.ObjectResponse?.GetGoalsResponse;
        let newData = [];
        let existingData = [];
        for (let i = 0; i < apiData?.length; i++) {
          if (apiData[i]?.isExistingGoal === "1") {
            existingData.push(apiData[i]);
          } else {
            newData.push(apiData[i]);
          }
        }
        setExistingGoals(existingData);
        setNewGoals(newData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [getGoalsDetailsApi]);

  useEffect(() => {
    getGoalsData();
  }, [getGoalsData]);

  const checkBoxChange = (item, index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
      return null;
    }
    setActiveIndex(index);
    setSelectedValue(item);
  };

  const continueOption = () => {
    if (selectedValue === undefined) {
      Toast({ type: error_title, message: option_message });
      return null;
    }
    const userRoleDataValue = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    let source = getDataFromStorage(
      endpoints.auth.WHITELIST_SOURCE_DATA,
      endpoints.auth.WHITELIST_SOURCE_KEY
    );
    let body = {
      ClientCode: userRoleDataValue?.ClientCode,
      SchemeID: item?.RTASchemeCode,
      FolioNo: item?.FolioNo,
      GoalID: selectedValue?.GoalId,
      UserRequest: {
        UID: userRoleDataValue?.uid,
        LoggedInRoleId: userRoleDataValue?.role_id,
        IPAddress: sessionStorage.getItem(endpoints.auth.IP),
        Source: source,
        AppOrWeb: endpoints.auth.WEB,
        deviceInfo: endpoints.auth.APIDEVICEINFO,
      },
    };
    getLinkToGoalDetailsApi(body).then((data) => {
      Toast({ type: success_title, message: data?.ObjectResponse?.message });
      setActiveIndex(null);
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <Popup isOpen={openGoalPopup} setPopup={setOpenGoalPopup}>
        <div className="goal-popup">
          <div className="title">{Labels.goalTitle}</div>
          {existingGoals?.length > 0 || existingGoals?.length ? (
            <React.Fragment>
              <div className="inner-tab-section mb-5">
                <div className="inner-tab-bar">
                  {GoalTitles.map((header, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          "inner-tab " +
                          (activeTableTab === header?.title ? "active" : "")
                        }
                        onClick={() => {
                          setActiveTableTab(header?.title);
                          setSelectedValue();
                          setActiveIndex(null);
                        }}
                      >
                        {header?.title}
                      </div>
                    );
                  })}
                </div>
                <div className="inner-tab-content">
                  <table cellPadding="0" cellSpacing="0">
                    <tbody>
                      <tr>
                        <th align="center"></th>
                        <th align="left">{Labels.goalType}</th>
                      </tr>
                      <tr>
                        <th className="empty-space" colSpan="5"></th>
                      </tr>
                      {activeTableTab === Labels?.existingGoals && (
                        <>
                          {existingGoals?.length > 0 ? (
                            existingGoals.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td width="20%" align="center">
                                    <NormalCheckbox
                                      className="custom-checkbox"
                                      name="activelists"
                                      id="activelists"
                                      value={selectedValue}
                                      onChange={() =>
                                        checkBoxChange(item, index)
                                      }
                                      checked={index === activeIndex}
                                    />
                                  </td>
                                  <td align="left">{item?.GoalName}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="6" className="not-found">
                                {Labels.noGoalsFound}
                              </td>
                            </tr>
                          )}
                        </>
                      )}
                      {activeTableTab === Labels?.newGoals && (
                        <>
                          {newGoals?.length > 0 ? (
                            newGoals.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td width="20%" align="center">
                                    <NormalCheckbox
                                      className="custom-checkbox"
                                      name="activelists"
                                      id="activelists"
                                      value={selectedValue}
                                      onChange={() =>
                                        checkBoxChange(item, index)
                                      }
                                      checked={index === activeIndex}
                                    />
                                  </td>
                                  <td align="left">{item?.GoalName}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="6" className="not-found">
                                {Labels.noGoalsFound}
                              </td>
                            </tr>
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end">
                    <button
                      className="primary-btn bordered dark-grey fw-600 zindex-0"
                      onClick={continueOption}
                    >
                      {Labels.continue}
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <EmptyRecord label={Labels.noGoalsFound} />
          )}
        </div>
      </Popup>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getGoalsDetailsApi: getGoalsDetails,
      getLinkToGoalDetailsApi: getLinkToGoalDetails,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(GoalPopup));
