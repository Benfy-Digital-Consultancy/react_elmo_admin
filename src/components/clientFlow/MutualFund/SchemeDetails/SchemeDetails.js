import React, { useState, useEffect, useCallback } from "react";
import "./SchemeDetails.scss";
import { withRouter, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getSchemeDetails } from "../../../../redux/action/clientFlow/MutualFundAct";
import { SchemeDetailsHeader } from "../../../../service/helpers/Constants";
import TableWrapper from "../../../Common/TableWrapper";
import {
  numberToRupees,
  getDataFromStorage,
  percentageValidator,
  amountWithRs,
  date,
} from "../../../../service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { AppBack } from "components/Common/AppBack";
import { PageLoader } from "components/Common/PageLoader";
import { useLang } from "hooks/useLang";

const SchemeDetails = (props) => {
  const { Labels } = useLang();
  let history = useHistory();
  const [basics, setBasics] = useState(null);
  const [Redemptions, setRedemptions] = useState(null);
  const [AMCBrokerages, setAMCBrokerages] = useState(null);
  const [Performances, setPerformances] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getSchemeDetailsApi } = props;

  const getSchemeDetailsFunc = useCallback(() => {
    setIsLoading(true);
    const { SCHEME_DETAILS, SCHEME_DATA } = endpoints.auth;

    let schemeIconData = getDataFromStorage(SCHEME_DETAILS, SCHEME_DATA);

    if (schemeIconData) {
      let body = {
        ISIN: schemeIconData.ISIN,
        SchemeCode: schemeIconData.SchemeCode
          ? schemeIconData.SchemeCode
          : schemeIconData.RTASchemeCode,
        LanguageId: endpoints.auth.LanguageId,
      };
      getSchemeDetailsApi(body).then((data) => {
        setIsLoading(false);

        let items = Object.keys(data);
        let index = items.indexOf("response");
        items.splice(index, 1);

        setBasics(data?.Basic);
        setRedemptions(data?.Redemption);
        setPerformances(data?.Performance);
        setAMCBrokerages(data?.AMCBrokerage);
      });
    }
  }, [getSchemeDetailsApi]);

  useEffect(() => {
    getSchemeDetailsFunc();
  }, [getSchemeDetailsFunc]);

  if (isLoading) {
    return <PageLoader />;
  }

  const getRedemptionsData = (key) => {
    return Redemptions?.[key] || "-";
  };

  return (
    <div className="switch-scheme-details">
      <div className="scheme-details-parent">
        <AppBack
          onClick={() => history.goBack()}
          label={Labels.schemeDetails}
        />
      </div>
      <div className="page-content">
        <div>
          <div className="box">
            <div className="title">{basics?.Fund_name}</div>
            <div className="box-content">
              <div className="list">
                <span>{Labels.amc} : </span>
                <strong>{basics?.AMC || "-"}</strong>
              </div>
              <div className="list">
                <span>{Labels.inceptionDate} : </span>
                <strong>
                  {basics?.Inception_date ? date(basics?.Inception_date) : "-"}
                </strong>
              </div>

              <div className="list">
                <span>{Labels.latestNav} : </span>
                <strong>{amountWithRs(basics?.LatestNAV || "-")}</strong>
                <span className="nav-date-with-rupee">as of </span>
                <span>
                  {" "}
                  {basics?.LatestNAV_date ? date(basics?.LatestNAV_date) : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div>
            <div className="title">{Labels.transactionInfo}</div>
            <div className="box-content">
              <div className="list">
                <span>{Labels.exitLoad} : </span>
                <strong>{getRedemptionsData("Exit_load")}</strong>
              </div>
              <div className="list">
                <span>{Labels.lockInPeriod} : </span>
                <strong>{getRedemptionsData("Lock_in_period")}</strong>
              </div>
              <div className="list">
                <span>
                  {Labels.lockInPeriod} ({Labels.days}) :
                </span>
                <strong>{getRedemptionsData("Lock_in_period_days")}</strong>
              </div>
            </div>
            <div className="title">{Labels.transactionInfo}</div>
            <div className="box-content">
              <div className="list">
                <span>{Labels.sip} : </span>
                <strong>{getRedemptionsData("SIP_allowed")}</strong>
              </div>
              <div className="list">
                <span>{Labels.stp} : </span>
                <strong>{getRedemptionsData("STP_allowed")}</strong>
              </div>
              <div className="list">
                <span>{Labels.swp} : </span>
                <strong>{getRedemptionsData("SWP_allowed")}</strong>
              </div>
              <div className="list">
                <span>{Labels.switchIn} : </span>
                <strong>{getRedemptionsData("Switch_in_allowed")}</strong>
              </div>
              <div className="list">
                <span>{Labels.spread}:</span>
                <strong>{getRedemptionsData("Spread_allowed")}</strong>
              </div>
            </div>
            <div className="box-content">
              <div className="list">
                <span>{Labels.monthlySip} : </span>
                <strong>{basics?.InvestmentValue || "-"}</strong>
              </div>
              <div className="list">
                <span>
                  {Labels.fresh} {Labels.oneTime} :
                </span>
                <strong>
                  {basics?.FreshMinAmount
                    ? numberToRupees(basics?.FreshMinAmount)
                    : "-"}
                </strong>
              </div>
              <div className="list">
                <span>
                  {Labels.additional} {Labels.oneTime} :{" "}
                </span>
                <strong>
                  {basics?.AdditionalMinAmount
                    ? numberToRupees(basics?.AdditionalMinAmount)
                    : "-"}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="title">{Labels.performance}</div>
          <div>
            <TableWrapper
              className="table-block"
              headerDetails={SchemeDetailsHeader}
            >
              {Performances ? (
                <tr>
                  <td align="center">{Performances.OneWeekReturn}</td>
                  <td align="center">{Performances.OneMonthReturn}</td>
                  <td align="center">{Performances.ThreeMonthReturn}</td>
                  <td align="center">{Performances.SixMonthReturn}</td>
                  <td align="center">{Performances.NineMonthReturn}</td>
                  <td align="center">{Performances.OneYearReturn}</td>
                  <td align="center">{Performances.TwoYearReturn}</td>
                  <td align="center">{Performances.ThreeYearReturn}</td>
                  <td align="center">{Performances.FiveYearReturn}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={9} className="text-center">
                    {Labels.noData}
                  </td>
                </tr>
              )}
            </TableWrapper>
            <div className="since-list">
              <span>{Labels.sinceInception} : </span>
              <strong>
                {Performances?.SinceInceptionReturn
                  ? percentageValidator(Performances?.SinceInceptionReturn)
                  : "-"}
              </strong>
            </div>
          </div>
          <div className="title">
            Specimen returns for {Labels.rs} 10,000 investment
          </div>
          <div>
            <TableWrapper
              className="table-block"
              headerDetails={SchemeDetailsHeader}
            >
              {Performances ? (
                <tr>
                  <td align="center">{Performances.OneWeekReturnValue}</td>
                  <td align="center">{Performances.OneMonthReturnValue}</td>
                  <td align="center">{Performances.ThreeMonthReturnValue}</td>
                  <td align="center">{Performances.SixMonthReturnValue}</td>
                  <td align="center">{Performances.NineMonthReturnValue}</td>
                  <td align="center">{Performances.OneYearReturnValue}</td>
                  <td align="center">{Performances.TwoYearReturnValue}</td>
                  <td align="center">{Performances.ThreeYearReturnValue}</td>
                  <td align="center">{Performances.FiveYearReturnValue}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={9} className="text-center">
                    {Labels.noData}
                  </td>
                </tr>
              )}
            </TableWrapper>
          </div>
          <div className="since-list">
            <span>{Labels.sinceInception} : </span>
            <strong>
              {Performances?.SinceInceptionReturnValue
                ? numberToRupees(Performances?.SinceInceptionReturnValue)
                : "-"}
            </strong>
          </div>
        </div>
        <div className="box">
          <div className="title">{Labels.amcCommision}</div>
          <div className="box-content">
            <p>{AMCBrokerages?.AMCBrokerage || ""}</p>
            <div className="error-msg">{Labels.fileError}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getSchemeDetailsApi: getSchemeDetails },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(SchemeDetails));
