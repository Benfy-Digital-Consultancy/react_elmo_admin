import { DatePicker } from "components/Common";
import React, { useState } from "react";
import TrashIcon from "../../../../assets/images/trash.svg";
import "./InvestmentPlan.scss";
import moment from "moment";

const InvestmentPlanCard = ({
  schemesDetail,
  WithoutFirstOrderSIPDates,
  showDeleteButton,
  deletePlan,
  changeDepositAmount,
}) => {
  const {
    SchemeName,
    OneMonthReturn,
    OneYearReturn,
    ThreeYearReturn,
    FiveYearReturn,
    MinimumPurchaseAmount,
    RecommendedSpread,
    PurchaseAmount,
  } = schemesDetail;

  const [dateEach, setDateEach] = useState(WithoutFirstOrderSIPDates[0]);

  const disableDateRanges = (current) => {
    let index = WithoutFirstOrderSIPDates?.findIndex(
      (date) => date === moment(current).format("YYYY-MM-DD")
    );
    return index === -1;
  };
  return (
    <div className="box">
      <div className="box-title">
        {SchemeName}
        {showDeleteButton && (
          <img
            src={TrashIcon}
            alt="TrashIcon"
            className="cursor-pointer"
            onClick={deletePlan}
          />
        )}
      </div>
      <div className="box-content">
        <div className="list width-220">
          <div className="label">1 Month :</div>
          <div className="value">{OneMonthReturn} %</div>
        </div>
        <div className="list width-220">
          <div className="label">3 Years :</div>
          <div className="value">{ThreeYearReturn} %</div>
        </div>
        <div className="list">
          <div className="label d-flex align-items-start">
            Deposit : Rs
            <input
              value={isNaN(PurchaseAmount) ? 0 : PurchaseAmount}
              name="PurchaseAmount"
              type="number"
              onChange={({ target: { value } }) => changeDepositAmount(value)}
              className="scheme_deposit_amount"
              onWheel={(event) => event.currentTarget.blur()}
            />
            {"on"}
            <div className="scheme_deposit_date">
              <DatePicker
                disabledDate={(value) => disableDateRanges(value)}
                value={dateEach}
                onChange={({ target: { value } }) => setDateEach(value)}
                allowClear={false}
                showToday={false}
              />{" "}
            </div>
            <span className="value d-inline">of each month</span>
          </div>
        </div>
        <div className="list width-220">
          <div className="label">1 Year :</div>
          <div className="value">{OneYearReturn} %</div>
        </div>
        <div className="list width-220">
          <div className="label">5 Years :</div>
          <div className="value">{FiveYearReturn} %</div>
        </div>
        <div className="list">
          <div className="label">
            Min. SIP Amount :{" "}
            <span className="value d-inline">Rs. {MinimumPurchaseAmount}</span>
          </div>
        </div>
        <div className="orange-text">
          Recommended spread: {RecommendedSpread} %
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlanCard;
