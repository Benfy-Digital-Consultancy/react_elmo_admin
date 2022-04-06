import React from "react";
import { withRouter, useParams } from "react-router";
import { OneTime } from "components/Common/OneTime";
import { RecurringWithdrawal } from "components/Common/RecurringWithdrawal";
import { sellSwpDetailsHeader } from "service/helpers/Constants";
import { endpoints } from "service/helpers/config";
const SellDetails = ({
  handleChangeTabId = {},
  minAmountRecurring,
  minAmountOneTime,
  handleChange = {},
  tabActiveId,
  formDetails,
  isWithDrawalDisabled,
  isOneTimeDisabled,
  handleChangeRadio,
  errors,
  SchemesDetail,
  sipDetails,
  handleSelectedFrequency,
}) => {
  const { investmentType } = useParams();
  return (
    <div className="sell-investment-tab-wrap">
      {sellSwpDetailsHeader.map(
        (list, index) =>
          list.investType.includes(investmentType) && (
            <div className="sell-investment-width" key={index}>
              <h6
                onClick={() => handleChangeTabId(list.id)}
                className="sell-invesemnt-title"
                style={{
                  color:
                    tabActiveId === list.id ? list.colorActive : list.color,
                }}
              >
                {list.label}
              </h6>
              <div className="d-flex justify-content-center">
                <p
                  className={`mb-0 sell-invesemnt-title-border${
                    tabActiveId === list.id ? "" : "-transparent"
                  }`}
                />
              </div>
              {list.id === 1 && investmentType === endpoints.sell ? (
                <OneTime
                  disabled={isOneTimeDisabled}
                  minAmountOneTime={minAmountOneTime}
                  details={formDetails}
                  handleChange={handleChange}
                  handleChangeRadio={handleChangeRadio}
                  SchemesDetail={SchemesDetail}
                  errors={errors}
                />
              ) : (
                list.id === 2 && (
                  <RecurringWithdrawal
                    disabled={isWithDrawalDisabled}
                    minAmountRecurring={minAmountRecurring}
                    details={formDetails}
                    handleChange={handleChange}
                    handleChangeRadio={handleChangeRadio}
                    SchemesDetail={SchemesDetail}
                    errors={errors}
                    sipDetails={sipDetails}
                    handleSelectedFrequency={handleSelectedFrequency}
                  />
                )
              )}
            </div>
          )
      )}
    </div>
  );
};

export default withRouter(SellDetails);
