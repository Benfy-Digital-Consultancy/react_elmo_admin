import React from "react";
import {
  objectFieldValidate,
  imageConditionValidate,
} from "service/helperFunctions";
import { useLang } from "hooks/useLang";

export default function InvestedSummary({
  investmentSummary,
  family,
  familySummaryDetails,
}) {
  const { Labels } = useLang();
  return (
    <div className="invested-summary">
      <div className="content-title">
        <span>{Labels.investSummary}</span>
      </div>
      <div className="section-content">
        <div className="top-list-section">
          <div className="list">
            <strong>
              {objectFieldValidate(
                family
                  ? familySummaryDetails?.TotalInvestment
                  : investmentSummary?.TotalInvestment
              )}
            </strong>
            <span>{Labels.totalInvestment}</span>
          </div>
          <div className="list">
            <strong className="current">
              <strong>
                {objectFieldValidate(
                  family
                    ? familySummaryDetails?.CurrentValue
                    : investmentSummary?.CurrentTotalValue
                )}
              </strong>
            </strong>
            <span>{Labels.currentValue}</span>
          </div>
          {!family && (
            <div className="list">
              <strong>
                {objectFieldValidate(investmentSummary?.XIRR, true)}
                {imageConditionValidate(investmentSummary?.XIRR)}
              </strong>
              <span>{Labels.XIRR}</span>
            </div>
          )}
          <div className="list">
            <strong>
              {objectFieldValidate(
                family
                  ? familySummaryDetails?.AbsoluteReturn
                  : investmentSummary?.AbsoluteReturn,
                true
              )}
              {imageConditionValidate(
                family
                  ? familySummaryDetails?.AbsoluteReturn
                  : investmentSummary?.AbsoluteReturn
              )}
            </strong>
            <span>{Labels.return}</span>
          </div>
        </div>
        <div className="bottom-list-section">
          <div className="list">
            <strong>
              {objectFieldValidate(
                family
                  ? familySummaryDetails?.RealisedGain
                  : investmentSummary?.RealisedGain
              )}
            </strong>
            <span>
              {Labels.realisedGain} <br /> ({Labels.a})
            </span>
          </div>
          <div className="center-icon">+</div>
          <div className="list">
            <strong>
              {objectFieldValidate(
                family
                  ? familySummaryDetails?.UnrealisedGain
                  : investmentSummary?.UnrealisedGain
              )}
            </strong>
            <span>
              {Labels.unrealisedGain} <br /> ({Labels.b})
            </span>
          </div>
          <div className="center-icon">+</div>
          <div className="list">
            <strong>
              {objectFieldValidate(
                family
                  ? familySummaryDetails?.DividentPayout
                  : investmentSummary?.DividentPayout
              )}
            </strong>
            <span>
              {Labels.divIntPaid} <br /> ({Labels.c})
            </span>
          </div>
          <div className="center-icon">=</div>
          <div className="list">
            <strong>
              {objectFieldValidate(
                family
                  ? familySummaryDetails?.TotalProfit
                  : investmentSummary?.TotalProfit
              )}
            </strong>
            <span>
              {Labels.totalProfit} <br /> ({Labels.a}+{Labels.b}+{Labels.c})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
