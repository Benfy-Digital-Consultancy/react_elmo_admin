import React from "react";
import {
  numberToRupees,
  percentageValidator,
  amountWithRs,
  imageConditionValidate,
} from "service/helperFunctions";
import { useLang } from "hooks/useLang";
import "./style.scss";

const FundBasicDetails = ({ sipDetails }) => {
  const { Labels } = useLang();
  return (
    <div className="bg-white">
      <div>
        <h2 className="mb-3">{sipDetails?.SchemeName}</h2>
        <h3 className="mb-4 pb-3">{sipDetails?.SchemeCategoryType}</h3>
      </div>
      <div className="switch-list-container mb-5">
        <div className="switch-header-width">
          <div className="switch-header-flex pb-2">
            <div className="switch-header-data">
              <div className="label">{Labels.latestNav} :</div>
              <div className="label lable-padding-left">
                {amountWithRs(sipDetails?.NAV)}
              </div>
            </div>
            <div className="switch-header-data">
              <div className="label">{Labels.investment} :</div>
              <div className="label lable-padding-left">
                {numberToRupees(sipDetails?.TotalInvestment)}
              </div>
            </div>
            <div className="switch-header-data">
              <div className="label">{Labels.absoluteReturn} :</div>
              <div className="label lable-padding-left">
                {percentageValidator(sipDetails?.AbsoluteReturn)}
                {imageConditionValidate(sipDetails?.AbsoluteReturn)}
              </div>
            </div>
          </div>
          <div className="switch-header-flex">
            <div className="switch-header-data">
              <div className="label">{Labels.units} :</div>
              <div className="label lable-padding-left">
                {sipDetails?.Units}
              </div>
            </div>
            <div className="switch-header-data">
              <div className="label">{Labels.currentValue} :</div>
              <div className="label lable-padding-left">
                {numberToRupees(sipDetails?.CurrentTotalValue)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundBasicDetails;
