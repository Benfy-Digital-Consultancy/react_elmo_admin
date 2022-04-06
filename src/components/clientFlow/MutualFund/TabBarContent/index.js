import React from "react";
import { imageConditionValidate } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";

const TabBarContent = (props) => {
  const {
    item,
    numberToRupees,
    percentageValidator,
    dynamicClass,
    setOpenGoalPopup,
    activeTab,
  } = props;
  const { Labels } = useLang();

  return (
    <React.Fragment>
      <div className="left">
        {activeTab !== Labels?.existedInvestments ? (
          <div
            className="goal-text"
            onClick={() => {
              if (item?.LinkToGoalMessage === endpoints?.linkToGoal) {
                setOpenGoalPopup(true);
              }
            }}
          >
            {item?.LinkToGoalMessage}
          </div>
        ) : null}
        <h3>{item?.SchemeName}</h3>
        <div className="row">
          <div className="d-flex justify-content-between">
            <div className="mb-3">
              <div className="mutual-list-container">
                <h6
                  className={`title title-font-weight500 ${
                    dynamicClass ? "color " : ""
                  }`}
                >
                  {item?.SchemeCategoryType.split(":")[0]}
                  {":"}
                  <span className="title-font-weight600">
                    {item?.SchemeCategoryType.substring(
                      item?.SchemeCategoryType.indexOf(":") + 1
                    )}
                  </span>
                </h6>
              </div>
            </div>
            <div className={`mb-3 ${dynamicClass ? "ps-5 " : ""}`}>
              <div className="mutual-list-container">
                <h6
                  className={`title title-font-weight500 ${
                    dynamicClass ? "color " : ""
                  }`}
                >
                  {Labels.folioNumber} :{" "}
                  <span className="title-font-weight600">{item?.FolioNo}</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
        {!dynamicClass && (
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="mutual-list-container">
                  <h6 className="title title-font-weight500">
                    {Labels.investment} :{" "}
                    <span className="title-font-weight600">
                      {numberToRupees(item?.TotalInvestment)}
                    </span>
                  </h6>
                  <h6 className="title title-font-weight600"> </h6>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mutual-list-container">
                  <h6 className="title title-font-weight500">
                    {Labels.currentValue} :{" "}
                    <span className="title-font-weight600">
                      {numberToRupees(item?.CurrentTotalValue)}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mutual-list-container">
                  <h6 className="title title-font-weight500">
                    {Labels.absoluteReturn} :{" "}
                    <span className="title-font-weight600">
                      {percentageValidator(item?.AbsoluteReturn)}
                    </span>
                  </h6>
                  <div className="title-arrow">
                    {imageConditionValidate(item?.AbsoluteReturn)}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mutual-list-container">
                  <h6 className="title title-font-weight500">
                    {Labels.annualizedReturn} :{" "}
                    <span className="title-font-weight600">
                      {percentageValidator(item?.XIRR)}
                    </span>
                  </h6>
                  <div className="title-arrow">
                    {imageConditionValidate(item?.XIRR)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default TabBarContent;
