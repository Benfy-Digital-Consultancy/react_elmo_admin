import React from "react";
import { useLang } from "hooks/useLang";

const InvestmentStatusCard = ({ statusMode }) => {
  const { Labels } = useLang();
  const {
    amount,
    folioNumber,
    equity,
    latestNav,
    frequency,
    firstOrderDate,
    installmentDate,
    mandateId,
    modifySymbolRetry,
    status,
  } = Labels;
  return (
    <>
      <div className="scheme-card-parent">
        <div className="scheme-card-container">
          <div className="scheme-title-container d-flex justify-content-between">
            <h6 className="title mb-0">
              ADITYA BIRLA SUN LIFE CRISIL AAA JUN 2023 INDEX FUND -REGULAR
              PLAN-GROWTH
            </h6>
            <h6 className="">
              {status}:{" "}
              <span
                className={`payment_status_${
                  statusMode ? "success" : "failed"
                }`}
              >
                {statusMode ? "Success" : "Failed"}
              </span>
            </h6>
          </div>
          <div className="scheme-card-content">
            <div className="scheme-card-subtitle scheme-tilte-left">
              <span className="scheme-withoutbold">
                {equity}:{" "}
                <span className="scheme-withbold">LARGE CAP FUND</span>
              </span>
            </div>
            <div className="scheme-card-subtitle scheme-tilte-left">
              <span className="scheme-withoutbold">
                {latestNav}: <span className="scheme-withbold">Rs. 61,000</span>
              </span>
            </div>
            <div className="scheme-card-subtitle scheme-tilte-left">
              <span className="scheme-withoutbold">
                {frequency}: <span className="scheme-withbold">Monthly</span>
              </span>
            </div>{" "}
            <div className="scheme-card-subtitle scheme-tilte-left">
              <span className="scheme-withoutbold">
                {firstOrderDate}:{" "}
                <span className="scheme-withbold">25th july 2022</span>
              </span>
            </div>
            <div className="scheme-card-subtitle scheme-tilte-left">
              <span className="scheme-withoutbold">
                {installmentDate}:{" "}
                <span className="scheme-withbold">27th April 2022</span>
              </span>
            </div>
          </div>

          <div className="scheme-card-content">
            <div className="scheme-card-subtitle scheme-tilte-left">
              <span className="scheme-withoutbold">
                {amount}: <span className="scheme-withbold">Rs. 500</span>
              </span>
            </div>
            <div className="scheme-card-subtitle scheme-tilte-left">
              <span className="scheme-withoutbold">
                {mandateId}: <span className="scheme-withbold">391111</span>
              </span>
            </div>
            <div className="scheme-card-subtitle scheme-tilte-left">
              <span className="scheme-withoutbold">
                {folioNumber}: <span className="scheme-withbold">391111</span>
              </span>
            </div>
          </div>
          {!statusMode && (
            <div className="modify_retry_button">
              <button className="primary-btn">{modifySymbolRetry}</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InvestmentStatusCard;
