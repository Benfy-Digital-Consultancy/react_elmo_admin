import React from "react";
import { amountWithRs } from "service/helperFunctions";
import { useLang } from "hooks/useLang";
import { useHistory } from "react-router-dom";
import { endpoints } from "service/helpers/config";
import { setDataFromStorage } from "service/helperFunctions";

export default function NfoCard({ key, nfodata }) {
  const history = useHistory();
  const { Labels } = useLang();

  const handleToNavigate = (SchemeCode) => {
    let investArray = [];
    investArray.push(SchemeCode);
    setDataFromStorage(
      SchemeCode,
      endpoints.auth.BUY_INVESTMENT_DATA,
      endpoints.auth.BUY_INVESTMENT_KEY
    );
    history.push("/buyInvestment");
  };
  return (
    <div key={key} className="nfo-card-container">
      <div className="row">
        <div className="col-md-9">
          <div className="nfo-content-container">
            <div className="nfo-heading-container">
              <h6 className="nfo-heading">{nfodata?.SchemeBaseName}</h6>
              <h6 className="nfo-subheading">{nfodata?.SebiCategoryName}</h6>
              <h6 className="nfo-subheading">
                {Labels?.faceValue} : {nfodata?.FaceValue}
              </h6>
            </div>
            <div>
              <h6 className="nfo-subheading">
                {Labels?.startDate} : {nfodata?.StartDate} | {Labels?.endDate} :{" "}
                {nfodata?.EndDate}
              </h6>
              <h6 className="nfo-subheading">
                {Labels?.minPurchaseAmount} :{" "}
                {amountWithRs(nfodata?.MinimumPurchaseAmount)}
              </h6>
            </div>
          </div>
        </div>
        <div className="col-md-3 nfo-growthcontainer">
          {nfodata?.DividendOptions &&
            nfodata?.DividendOptions.map((item, id) => {
              return (
                <div key={id}>
                  {item?.DividendReinvestmentFlag !==
                    endpoints.mandateTypeKey_N && (
                    <h6
                      onClick={() => handleToNavigate(item.SchemeCode)}
                      className="title"
                    >
                      {item?.OptionName}
                    </h6>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
