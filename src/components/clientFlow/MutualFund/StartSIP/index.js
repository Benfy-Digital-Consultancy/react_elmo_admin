import React, { useState } from "react";
import { NormalCheckbox } from "components/Common/NormalCheckbox/index";
import { ActiveListTitles } from "service/helpers/Constants";
import { amountWithoutRs, date } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import PauseSIPPopup from "./PauseSIPPopup/index";
import { Toast } from "service/toast";

const StartSIP = (props) => {
  const { Labels, errorText } = useLang();
  const { item, activeTableTab, setActiveTableTab } = props;
  const [cancelPopup, setCancelPopup] = useState(false);
  const [pause, setPause] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [activeIndex, setActiveIndex] = useState(null);
  const { error_title } = endpoints.response_error_msg;
  const { error_message } = errorText?.pausesip_error_message || {};
  const sipLength = item?.activeSIPList?.length;
  const swpLength = item?.activeSWPList?.length;
  const stpLength = item?.activeSTPList?.length;
  const dataShowCondition = sipLength > 0 || swpLength > 0 || stpLength > 0;
  const buttonShowCondition =
    (activeTableTab === Labels?.activeSIP && sipLength > 0) ||
    (activeTableTab === Labels?.activeSWP && swpLength > 0) ||
    (activeTableTab === Labels?.activeSTP && stpLength > 0);

  const checkBoxChange = (activeData, index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
      return null;
    }
    setActiveIndex(index);
    setSelectedValue(activeData);
  };

  return (
    <React.Fragment>
      {dataShowCondition && (
        <div className="inner-tab-section">
          <div className="inner-tab-bar">
            {ActiveListTitles.map((header, index) => {
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
                  <th align="left">{Labels.frequency}</th>
                  <th align="center">{Labels.regDate}</th>
                  <th align="center">{Labels.startDate}</th>
                  <th align="right">
                    {Labels.amount} ({Labels.rs})
                  </th>
                  {activeTableTab === Labels?.activeSIP ? (
                    <th align="center">{Labels.days}</th>
                  ) : null}
                </tr>
                <tr>
                  <th className="empty-space" colSpan="5"></th>
                </tr>
                {activeTableTab === Labels?.activeSIP && (
                  <>
                    {sipLength > 0 ? (
                      item?.activeSIPList.map((activeData, index) => {
                        return (
                          <tr key={index}>
                            <td align="center">
                              <NormalCheckbox
                                className="custom-checkbox"
                                name="activelists"
                                id="activelists"
                                value={selectedValue}
                                onChange={() =>
                                  checkBoxChange(activeData, index)
                                }
                                checked={index === activeIndex}
                              />
                            </td>
                            <td align="left">
                              {activeData?.Frequency.charAt(0).toUpperCase() +
                                activeData?.Frequency.slice(1).toLowerCase()}
                            </td>
                            <td align="center">
                              {date(activeData?.RegistrationDate)}
                            </td>
                            <td align="center">
                              {date(activeData?.StartDate)}
                            </td>
                            <td align="right">
                              {amountWithoutRs(activeData?.Amount)}
                            </td>
                            <td align="center">{activeData?.DayOfSIP}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="not-found">
                          {Labels.noDataFound}
                        </td>
                      </tr>
                    )}
                  </>
                )}
                {activeTableTab === Labels?.activeSWP && (
                  <>
                    {swpLength > 0 ? (
                      item?.activeSWPList.map((activeData, index) => {
                        return (
                          <tr key={index}>
                            <td align="center">
                              <NormalCheckbox
                                className="custom-checkbox"
                                name="activelists"
                                id="activelists"
                                value={selectedValue}
                                onChange={() =>
                                  checkBoxChange(activeData, index)
                                }
                                checked={index === activeIndex}
                              />
                            </td>
                            <td align="left">
                              {activeData?.FrequencyType.charAt(
                                0
                              ).toUpperCase() +
                                activeData?.FrequencyType.slice(
                                  1
                                ).toLowerCase()}
                            </td>
                            <td align="center">
                              {date(activeData?.SWPRegDate)}
                            </td>
                            <td align="center">
                              {date(activeData?.SWPStartDate)}
                            </td>
                            <td align="right">
                              {amountWithoutRs(activeData?.WithDrawalAmount)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="not-found">
                          {Labels.noDataFound}
                        </td>
                      </tr>
                    )}
                  </>
                )}
                {activeTableTab === Labels?.activeSTP && (
                  <>
                    {stpLength > 0 ? (
                      item?.activeSTPList.map((activeData, index) => {
                        return (
                          <tr key={index}>
                            <td align="center">
                              <NormalCheckbox
                                className="custom-checkbox"
                                name="activelists"
                                id="activelists"
                                value={selectedValue}
                                onChange={() =>
                                  checkBoxChange(activeData, index)
                                }
                                checked={index === activeIndex}
                              />
                            </td>
                            <td align="left">{activeData?.FrequencyType}</td>
                            <td align="center">
                              {date(activeData?.STPRegDate)}
                            </td>
                            <td align="center">
                              {date(activeData?.STPStartDate)}
                            </td>
                            <td align="right">
                              {amountWithoutRs(activeData?.TransferAmount)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="not-found">
                          {Labels.noDataFound}
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
            {buttonShowCondition ? (
              <div className="d-flex justify-content-end">
                <button
                  className="primary-btn bordered dark-grey fw-600 zindex-0"
                  onClick={() => {
                    if (activeIndex === null) {
                      Toast({ type: error_title, message: error_message });
                      return null;
                    }
                    setCancelPopup(true);
                    setPause(false);
                  }}
                >
                  {Labels.cancel}
                </button>
                <button
                  className="primary-btn bordered dark-grey fw-600 zindex-0"
                  onClick={() => {
                    if (activeIndex === null) {
                      Toast({ type: error_title, message: error_message });
                      return null;
                    }
                    setCancelPopup(true);
                    setPause(true);
                  }}
                >
                  {Labels.pause}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
      {cancelPopup === true ? (
        <PauseSIPPopup
          cancelPopup={cancelPopup}
          setCancelPopup={setCancelPopup}
          item={item}
          activeTableTab={activeTableTab}
          pause={pause}
          selectedValue={selectedValue}
        />
      ) : null}
    </React.Fragment>
  );
};

export default StartSIP;
