import React, { useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  date,
  percentageValidator,
  imageConditionValidate,
  amountWithRs,
} from "service/helperFunctions";
import RightArrow from "assets/images/right-arrow-grey.svg";
import DownArrow from "assets/images/down-arrow.svg";
import "./style.scss";
import { useLang } from "hooks/useLang";
import { ToolTip } from "components/Common/ToolTip";
import InfoIcon from "assets/images/info.svg";
import { getSchemeDataFromProduct } from "redux/action/clientFlow/DashboardAct";
import { endpoints } from "service/helpers/config";
import { InfoPopup } from "components/Common/InfoPopup";

const InvestmentCard = (props) => {
  const { Labels } = useLang();
  const {
    item,
    tabValue,
    productId,
    setDropdownId,
    index,
    getSchemeDataFromProductApi,
  } = props;
  const [infoPopup, setInfoPopup] = useState(false);
  const [schemeData, setSchemeData] = useState(null);

  const handleData = (labelName, value, wrappingkey) => {
    return (
      <div className="col-md-4">
        <div className="investment-container">
          <h6 className="title fw-500">
            {labelName} :
            <span className="fw-600">
              {wrappingkey ? wrappingkey(value) : value}
            </span>
          </h6>
        </div>
      </div>
    );
  };

  const handleDataForPercentage = (labelName, value) => {
    return (
      <div className="col-md-4">
        <div className="investment-container">
          <h6 className="title fw-500">
            {labelName} :{" "}
            <span className="fw-600">
              {percentageValidator(value)}
              {imageConditionValidate(value)}
            </span>
          </h6>
        </div>
      </div>
    );
  };

  const handleInfo = (id) => {
    setInfoPopup(false);
    let body = {
      ProductCategoryId: id,
      LanguageId: endpoints.auth.LanguageId,
      ClientCode: "",
      device: "",
      AMCCode: "",
      SebiCategoryId: "",
      SebiSubCategoryId: "",
      DefaultProductId: "",
    };
    getSchemeDataFromProductApi(body).then((data) => {
      if (data?.ObjectResponse?.TitleResponse) {
        setSchemeData({ ...data?.ObjectResponse?.TitleResponse[0] });
        setInfoPopup(true);
      }
    });
  };

  return (
    <div className="card-details">
      <div className="d-flex align-items-center justify-content-between investment-title">
        <h3>{item?.SchemeName}</h3>
        <div>
          <ToolTip
            children={
              <img
                className="cursor-pointer"
                src={InfoIcon}
                alt="InfoIcon"
                onClick={() => handleInfo(productId)}
              />
            }
            label={Labels.schemeDetails}
          />
          <ToolTip
            children={
              tabValue ? (
                <img
                  alt="downArrow"
                  src={DownArrow}
                  style={{ width: "15px" }}
                  onClick={() => setDropdownId("")}
                />
              ) : (
                <img
                  alt="rightArrow"
                  src={RightArrow}
                  style={{ width: "10px" }}
                  onClick={() => setDropdownId("mutual-fund-list-" + index)}
                />
              )
            }
            label={tabValue ? Labels.collapse : Labels.expand}
          />
        </div>
      </div>
      {productId === "11" && <h4>*{item?.disclaimer}</h4>}
      <div className="row">
        {productId === "11" && (
          <>
            {handleData(Labels.options, item?.Options)}
            {handleData(Labels.dematID, item?.DematId)}
            {handleData(Labels.depositoryName, item?.Depository_name)}
            {handleData(Labels.clientId, item?.ClientId)}
            {handleData(Labels.priceGram, item?.Latest_NAV, amountWithRs)}
            {handleData(Labels.RBIInvestorId, item?.RBI_Investor_id)}
            {handleData(Labels.quantity, item?.BalanceQuantity)}
          </>
        )}
        {productId === "6" && (
          <>
            {handleData(Labels.latestNav, item?.Latest_NAV, amountWithRs)}
            {handleData(Labels.investmentDate, item?.DateOFInvestment, date)}
            {handleData(
              Labels.investmentOptions,
              item?.Growth_Type,
              amountWithRs
            )}
            {handleData(Labels.units, item?.BalanceQuantity)}
            {handleData(Labels.pran, item?.PRAN)}
            {handleData(Labels.receiptNumber, item?.ReceiptNumber)}
          </>
        )}
        {productId !== "11" && productId !== "6" && (
          <>
            {handleData(Labels.receiptNumber, item?.ReceiptNumber)}
            {handleData(Labels.paymentFrequency, item?.PaymentFrequency)}
          </>
        )}
        {productId !== "6" && (
          <>
            {handleData(Labels.investmentDate, item?.DateOFInvestment, date)}
            {handleData(Labels.maturityDate, item?.MaturityDate, date)}
          </>
        )}
      </div>
      {tabValue && (
        <div className="row">
          {handleData(Labels.investment, item?.InvestedValue, amountWithRs)}
          {(productId === "11" || productId === "6") && (
            <>
              {handleData(
                Labels.currentValue,
                item?.CurrentValue,
                amountWithRs
              )}
              <div className="col-md-4 col-12"></div>
              {handleDataForPercentage(
                Labels.absoluteReturn,
                item?.AbsoluteReturn
              )}
              {handleDataForPercentage(Labels.XIRR, item?.XIRR)}
            </>
          )}
          {productId !== "11" && productId !== "6" && (
            <>
              {handleData(
                Labels.maturityAmount,
                item?.MaturityAmount,
                amountWithRs
              )}
              {handleData(
                Labels.interestRate,
                item?.InterestRate,
                percentageValidator
              )}
              {handleData(
                Labels.interestPaid,
                item?.RealisedGain,
                amountWithRs
              )}
              {handleData(
                Labels.accruedInterest,
                item?.AccumulatedGain,
                amountWithRs
              )}
              {handleData(Labels.totalGain, item?.TotalGain, amountWithRs)}
            </>
          )}
        </div>
      )}
      {infoPopup && (
        <InfoPopup
          infoPopup={infoPopup}
          schemeData={schemeData}
          handlePopup={(value) => {
            setInfoPopup(value);
            setSchemeData(null);
          }}
        />
      )}
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getSchemeDataFromProductApi: getSchemeDataFromProduct },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(InvestmentCard));
