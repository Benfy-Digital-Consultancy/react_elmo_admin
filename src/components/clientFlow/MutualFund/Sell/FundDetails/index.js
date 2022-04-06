import React from "react";
import { numberToRupees, amountWithRs } from "service/helperFunctions";
import InfoIconBlue from "assets/images/info-blue.svg";
import Popup from "components/Common/Popup/Popup";
import { useLang } from "hooks/useLang";
import { endpoints } from "service/helpers/config";

const FundDetails = ({
  bankDetails = {},
  SchemesDetail = {},
  setInformationPopup,
  setGainIndex,
  gainDetails = {},
  gainIndex,
  informationPopup = false,
}) => {
  const { Labels } = useLang();
  //display Data
  const displayData = (index, popupType) => {
    return gainDetails &&
      gainDetails.CapitalGainForSellInvestmentList &&
      gainDetails?.CapitalGainForSellInvestmentList?.[index] ? (
      <div className="row">
        <div className="col-7">
          <div className="title">
            <img
              src={InfoIconBlue}
              onClick={() => {
                setInformationPopup(popupType);
                setGainIndex(index);
              }}
              className="cursor-pointer"
              alt="InfoIconBlue"
            />{" "}
            {gainDetails.CapitalGainForSellInvestmentList[index].Lable} :
          </div>
        </div>
        <div className="col-5">
          <div className="label ">
            {gainDetails.CapitalGainForSellInvestmentList[index].Amount
              ? numberToRupees(
                  gainDetails.CapitalGainForSellInvestmentList[index].Amount
                )
              : "-"}
          </div>
        </div>
      </div>
    ) : (
      <div className="row">
        <div className="col-7">
          <div className="title">
            <img
              src={InfoIconBlue}
              onClick={() => setInformationPopup(popupType)}
              alt="InfoIconBlue"
              className="cursor-pointer"
            />{" "}
            {popupType === endpoints.long
              ? Labels.longTermGain
              : Labels.shortTermGain}{" "}
            :
          </div>
        </div>
        <div className="col-5">
          <div className="label ">-</div>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      <div className="sell-header">
        <h2>{SchemesDetail?.SchemeName}</h2>
        <h3>{SchemesDetail?.SchemeCategoryType}</h3>
      </div>
      <div className="row">
        <div className="col-9">
          <div className="sell-header-width pb-1">
            <div className="sell-header-flex">
              <div className="row mb-2">
                <div className="col-4">
                  <div className="row">
                    <div className="col-6">
                      <span className="label">{Labels.latestNav} :</span>
                    </div>
                    <div className="col-6">
                      <span className="label">
                        {amountWithRs(SchemesDetail?.NAV)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row">
                    <div className="col-6">
                      <span className="label">{Labels.investment} :</span>
                    </div>
                    <div className="col-6">
                      <span className="label">
                        {numberToRupees(SchemesDetail?.TotalInvestment)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-4">{displayData(0, endpoints.short)}</div>
              </div>
              <div className="row mb-2">
                <div className="col-4">
                  <div className="row">
                    <div className="col-6">
                      <span className="label">{Labels.units} :</span>
                    </div>
                    <div className="col-6">
                      <span className="label">{SchemesDetail?.Units}</span>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row">
                    <div className="col-6">
                      <span className="label">{Labels.currentValue} :</span>
                    </div>
                    <div className="col-6">
                      <span className="label">
                        {numberToRupees(SchemesDetail?.CurrentTotalValue)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-4">{displayData(1, endpoints.long)}</div>
              </div>
            </div>
          </div>
          <div className="sell-bankaccount-details">
            <h4 className="sell-bankaccount-ttile">{bankDetails?.content}</h4>
            <div className="sell-bank-details">
              <div className="d-flex">
                <div className="label">{Labels.bankName} : </div>
                <div className="value">{bankDetails?.Bank_Name || "-"}</div>
              </div>
              <div className="d-flex">
                <div className="label">{Labels.branch} :</div>
                <div className="value">{bankDetails?.Bank_Branch || "-"}</div>
              </div>
              <div className="d-flex">
                <div className="label">{Labels.accountNo} :</div>
                <div className="value">{bankDetails?.BankAccountNo || "-"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {informationPopup && (
        <div className="information-popup">
          <Popup
            isOpen={informationPopup}
            setPopup={() => setInformationPopup("")}
          >
            <div className="info-popup-title">{Labels.information}</div>
            <div className="info-popup-subtitle">{Labels.note} :</div>
            {gainDetails?.CapitalGainForSellInvestmentList?.length !== 0 && (
              <p>
                {gainDetails?.CapitalGainForSellInvestmentList[gainIndex]
                  ?.Note || "-"}
              </p>
            )}
            <div className="info-popup-subtitle">{Labels.disclaimer} :</div>
            <p>{gainDetails?.Disclaimer?.Disclaimer || "-"} </p>
          </Popup>
        </div>
      )}
    </React.Fragment>
  );
};

export default FundDetails;
