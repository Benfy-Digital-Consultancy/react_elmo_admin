import React from "react";
import {
  percentageValidator,
  numberToRupees,
  imageConditionValidate,
} from "service/helperFunctions";
import "./../../MutualFund.scss";
import { useLang } from "hooks/useLang";

const InvestmentData = (props) => {
  const { Labels } = useLang();
  const { investmentSummary, productId = null } = props;

  return (
    <React.Fragment>
      <div className="top-section">
        <div className="list-section">
          <div className="left">
            <table width="100%">
              <tbody>
                <tr className="list-content">
                  <td align="left">
                    <div className="label">{Labels.totalInvestment} :</div>
                  </td>
                  <td align="right">
                    <div className="value">
                      {numberToRupees(
                        investmentSummary?.TotalInvestment ||
                          investmentSummary?.Investment
                      )}{" "}
                    </div>
                  </td>
                  <td>
                    <div align="right"></div>
                  </td>
                </tr>
                <tr className="list-content">
                  <td align="left">
                    <div className="label">{Labels.currentValue} :</div>
                  </td>
                  <td align="right">
                    <div className="value">
                      {numberToRupees(
                        investmentSummary?.CurrentTotalValue ||
                          investmentSummary?.CurrentValue
                      )}
                    </div>
                  </td>
                  <td>
                    <div align="right"></div>
                  </td>
                </tr>
                {productId !== "11" && productId !== "6" ? (
                  <>
                    <tr className="list-content">
                      <td align="left">
                        <div className="label">{Labels.absoluteReturn} :</div>
                      </td>
                      <td align="right">
                        <div className="value">
                          {percentageValidator(
                            investmentSummary?.AbsoluteReturn
                          )}
                        </div>
                      </td>
                      <td align="right">
                        <div className="value">
                          {imageConditionValidate(
                            investmentSummary?.AbsoluteReturn
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr className="list-content">
                      <td align="left">
                        <div className="label">{Labels.annualizedReturn} :</div>
                      </td>
                      <td align="right">
                        <div className="value">
                          {percentageValidator(investmentSummary?.XIRR)}
                        </div>
                      </td>
                      <td align="right">
                        <div className="value">
                          {imageConditionValidate(investmentSummary?.XIRR)}
                        </div>
                      </td>
                    </tr>
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
          <div className="right">
            {productId === "11" || productId === "6" ? (
              <>
                <div className="list-content">
                  <div className="label">{Labels.absoluteReturn} :</div>
                  <div className="value">
                    {percentageValidator(investmentSummary?.AbsoluteReturn)}
                    {imageConditionValidate(investmentSummary?.AbsoluteReturn)}
                  </div>
                </div>
                <div className="list-content">
                  <div className="label">{Labels.annualizedReturn} :</div>
                  <div className="value">
                    {percentageValidator(investmentSummary?.XIRR)}
                    {imageConditionValidate(investmentSummary?.XIRR)}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="list-content">
                  <div className="label">
                    {Labels.realisedGain} ({Labels.a}) :
                  </div>
                  <div className="value">
                    {numberToRupees(investmentSummary?.RealisedGain)}
                  </div>
                </div>
                <div className="list-content">
                  <div className="label">
                    {Labels.unrealisedGain} ({Labels.b}) :
                  </div>
                  <div className="value">
                    {numberToRupees(investmentSummary?.UnrealisedGain)}
                  </div>
                </div>
                <div className="list-content">
                  <div className="label">
                    {Labels.dividentPaid} ({Labels.c}) :
                  </div>
                  <div className="value">
                    {numberToRupees(
                      investmentSummary?.DividentPayout ||
                        investmentSummary?.DividendPaid
                    )}
                  </div>
                </div>
                <div className="list-content">
                  <div className="label">
                    {Labels.totalProfit} ({Labels.a}+{Labels.b}+{Labels.c}) :
                  </div>
                  <div className="value">
                    {numberToRupees(investmentSummary?.TotalProfit)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InvestmentData;
