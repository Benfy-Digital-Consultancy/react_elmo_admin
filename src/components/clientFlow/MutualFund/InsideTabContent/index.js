import React from "react";
import {
  amountWithRs,
  imageConditionValidate,
  date,
} from "service/helperFunctions";
import { useLang } from "hooks/useLang";

const InsideTabContent = (props) => {
  const { Labels } = useLang();
  const { item, numberToRupees, percentageValidator } = props;

  return (
    <React.Fragment>
      <div className="list-section">
        <div className="left">
          <table width="100%">
            <tbody>
              <tr className="list-content">
                <td align="left">
                  <div className="label">{Labels.latestNav} :</div>
                </td>
                <td align="right">
                  <div className="value">{amountWithRs(item?.NAV)}</div>
                </td>
              </tr>
              <tr className="list-content">
                <td align="left">
                  <div className="label">{Labels.units} :</div>
                </td>
                <td align="right">
                  <div className="value">{item?.Units}</div>
                </td>
              </tr>
              <tr className="list-content">
                <td align="left">
                  <div className="label">{Labels.navDate} :</div>
                </td>
                <td align="right">
                  <div className="value">{date(item?.NAV_Date)}</div>
                </td>
              </tr>
              <tr className="list-content">
                <td align="left">
                  <div className="label">
                    {Labels.average}
                    <br />
                    {Labels.purchasePrice} :
                  </div>
                </td>
                <td align="right">
                  <div className="value">
                    {amountWithRs(item?.PurchasePrice)}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="center">
          <table width="100%">
            <tbody>
              <tr className="list-content">
                <td align="left">
                  <div className="label">{Labels.investment} :</div>
                </td>
                <td align="right">
                  <div className="value">
                    {numberToRupees(item?.TotalInvestment)}
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
                    {numberToRupees(item?.CurrentTotalValue)}
                  </div>
                </td>
                <td>
                  <div align="right"></div>
                </td>
              </tr>
              <tr className="list-content">
                <td align="left">
                  <div className="label">{Labels.absoluteReturn} :</div>
                </td>
                <td align="right">
                  <div className="value">
                    {percentageValidator(item?.AbsoluteReturn)}
                  </div>
                </td>
                <td align="right">
                  <div className="value">
                    {imageConditionValidate(item?.AbsoluteReturn)}
                  </div>
                </td>
              </tr>
              <tr className="list-content">
                <td align="left">
                  <div className="label">{Labels.annualizedReturn} :</div>
                </td>
                <td align="right">
                  <div className="value">{percentageValidator(item?.XIRR)}</div>
                </td>
                <td align="right">
                  <div className="value">
                    {imageConditionValidate(item?.XIRR)}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="right">
          <table width="100%">
            <tbody>
              <tr className="list-content">
                <td align="left">
                  <div className="label">{Labels.unrealisedGain} :</div>
                </td>
                <td align="right">
                  <div className="value">
                    {numberToRupees(item?.UnrealisedGain)}
                  </div>
                </td>
              </tr>
              <tr className="list-content">
                <td align="left">
                  <div className="label">{Labels.realisedGain} :</div>
                </td>
                <td align="right">
                  <div className="value">
                    {numberToRupees(item?.RealisedGain)}
                  </div>
                </td>
              </tr>
              <tr className="list-content">
                <td align="left">
                  <div className="label">{Labels.dividentPaid} :</div>
                </td>
                <td align="right">
                  <div className="value">
                    {numberToRupees(item?.DividendPayout)}
                  </div>
                </td>
              </tr>
              <tr className="list-content">
                <td align="left">
                  <div className="label">{Labels.totalProfit} :</div>
                </td>
                <td align="right">
                  <div className="value">
                    {numberToRupees(
                      Number(item?.UnrealisedGain) +
                        Number(item?.RealisedGain) +
                        Number(item?.DividendPayout)
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InsideTabContent;
