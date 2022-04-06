import React, { useEffect, useState } from "react";
import "./InvestmentPlan.scss";
import InvestmentPlanCard from "./InvestPlanCard";

const SuggestPlan = ({
  planHeader,
  schemesData,
  suggestPlanData,
  deletePlan,
  changeDepositAmount,
}) => {
  const { planLabel } = planHeader;
  const [totalPlanAmount, setTotalPlanAmount] = useState(0);

  useEffect(() => {
    let sum = schemesData?.reduce(
      (tot, { schemesDetail: { PurchaseAmount } }) => {
        return tot + PurchaseAmount;
      },
      0
    );
    setTotalPlanAmount(sum);
  }, [suggestPlanData]);

  return (
    <>
      <div className="list-box">
        <div className="list-box-title">
          <div className="left">{planLabel}</div>
          <div className="right">Rs {totalPlanAmount}</div>
        </div>
        <div className="list-box-content">
          <div className="top-text">{"Equity Spread"}</div>
          {schemesData?.map(
            ({ schemesDetail, sipSchemeDetailsList }, index) => {
              return (
                <InvestmentPlanCard
                  schemesDetail={schemesDetail}
                  WithoutFirstOrderSIPDates={
                    sipSchemeDetailsList[0].SIPFREQUENCY[0].FirstOrderSIPDATES
                  }
                  showDeleteButton={schemesData.length > 1 ? true : false}
                  deletePlan={() => deletePlan(index)}
                  changeDepositAmount={(value) =>
                    changeDepositAmount(value, index)
                  }
                />
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default SuggestPlan;
