import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./style.scss";
import FailureIcon from "assets/images/failureIcon.png";
import SuccessIcon from "assets/images/success.png";
import { numberToRupees, amountWithRs } from "service/helperFunctions";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { useLang } from "hooks/useLang";
import { endpoints } from "service/helpers/config";
import { getDataFromStorage } from "service/helperFunctions";

const PurchaseStatus = ({ history }) => {
  const { Labels } = useLang();

  const [buyInvestFormData, setBuyInvestFormData] = useState([]);
  const [buySchemeData, setBuySchemeData] = useState([]);
  const [buyInvestTitle, setbuyInvestTitle] = useState(false);
  const [filterErrorMsg, setFilterErrorMsg] = useState("");

  const [breadCrumbsList] = useState([
    {
      redirection: () => history.push("/buyInvestment"),
      label: "BuyInvestment",
    },
    {
      redirection: () => history.push("/buyInvestmentPurchase"),
      label: "Confirm Purchase",
    },
    {
      label: "Purchase Status",
    },
  ]);

  // UserLoginDataGet
  useEffect(() => {
    let buyInvestStorage = getDataFromStorage(
      endpoints.auth.BUY_FORMDATA_DATA,
      endpoints.auth.BUY_FORMDATA_KEY
    );
    if (buyInvestStorage) {
      let buyInvestSchemeData = getDataFromStorage(
        endpoints.auth.BUY_SCHEME_DATA,
        endpoints.auth.BUY_SCHEME_KEY
      );
      setBuyInvestFormData(buyInvestStorage);
      setBuySchemeData(buyInvestSchemeData);

      let buyInvestmenTemp = buyInvestStorage;
      let buyInvestTitleStatus = buyInvestmenTemp.every(
        (val) => val.apiResponseStatus === endpoints?.success
      );
      setbuyInvestTitle(buyInvestTitleStatus);
      if (buyInvestTitleStatus) {
        let buyInvestErrorMsg = buyInvestStorage.find(
          (val) => val.apiResponseStatus === endpoints?.success
        );
        setFilterErrorMsg(buyInvestErrorMsg?.apiResponseMsg);
      } else {
        let buyInvestErrorMsg = buyInvestStorage.find(
          (val) => val.apiResponseStatus !== endpoints?.success
        );
        setFilterErrorMsg(buyInvestErrorMsg?.apiResponseMsg);
      }
    }
  }, []);

  // handleNavigationPurchaseConfirm
  const handleToCancel = () => {
    history.push("/dashboard/mutual-fund");
  };

  // handleNavigationPurchaseConfirm
  const handleModifyRetry = () => {
    history.push("/buyInvestment");
  };

  // RenderPurchaseTitleContainer
  const RenderPurchaseTitle = (imgIcon, classname, lablename, Responsemsg) => {
    return (
      <React.Fragment>
        <img
          src={imgIcon}
          alt="purchase status"
          className="purchase-status-img"
        />
        <div>
          <h6 className={`purchase-status-title ${classname}`}>{lablename}</h6>
          {Responsemsg && (
            <h6 className={`purchase-sub-title ${classname}`}>{Responsemsg}</h6>
          )}
        </div>
      </React.Fragment>
    );
  };

  // RenderPurchaseCardContainer

  const RenderCardContainer = (label, Amount) => {
    return (
      <div className="purchase-card-data">
        <h6 className="invest-heading-title">{label}</h6>

        <div className="purchase-card-amount-wrap">
          <span className="purchase-card-amount-title width_title">
            {Labels.amount} :
          </span>
          <span className="purchase-card-amount-title">
            {numberToRupees(Amount)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="purchase-status-container">
        <div>
          <BreadCrumbs breadCrumbsList={breadCrumbsList} />
        </div>

        <div className="purchase-status-details">
          <div className="row">
            <div className="status-details-wrap">
              {buyInvestFormData &&
              buyInvestFormData.length > 0 &&
              buyInvestTitle === true
                ? RenderPurchaseTitle(
                    SuccessIcon,
                    "success-color",
                    Labels?.confirmMessage?.success,
                    filterErrorMsg
                  )
                : RenderPurchaseTitle(
                    FailureIcon,
                    "unsuccess-color",
                    Labels?.confirmMessage?.unsuccess,
                    filterErrorMsg
                  )}

              {buyInvestFormData &&
                buyInvestFormData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        item.apiResponseStatus === "success"
                          ? "purchase-card-details  sucess-border"
                          : "purchase-card-details unsucess-border"
                      }
                    >
                      <h6 className="purchase-card-details-heading">
                        {buySchemeData[index]?.SchemeName}
                      </h6>
                      <div className="d-flex">
                        <h6 className="purchase-card-subtitle">
                          {" "}
                          {buySchemeData[index]?.SchemeType}
                        </h6>

                        <h6 className="purchase-card-subtitle">
                          {Labels.latestNav} :{" "}
                          {amountWithRs(buySchemeData[index]?.NAV_Value)}
                        </h6>

                        <h6
                          className={
                            item.apiResponseStatus === endpoints?.success
                              ? "purchase-card-subtitle success-color"
                              : "purchase-card-subtitle unsuccess-color"
                          }
                        >
                          Status : <span>{item.apiResponseStatus} </span>
                        </h6>
                      </div>

                      {item?.sip &&
                        RenderCardContainer(Labels.sip, item?.sipAmount)}

                      {item?.oneTime &&
                        RenderCardContainer(
                          Labels.OneTime,
                          item?.oneTimePurChaseAmount
                        )}
                    </div>
                  );
                })}

              <div className="purchase-btn-container">
                <div
                  className="purchase-common-btn purchase-btn-margin"
                  onClick={handleToCancel}
                >
                  <h6 className="purchase-btn-title  purchase-btn-color">
                    {Labels.cancel}
                  </h6>
                </div>
                <div
                  className="purchase-common-btn purchase-modify-bg"
                  onClick={handleModifyRetry}
                >
                  <h6 className="purchase-btn-title  text-white">
                    {Labels.modifyRetry}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(PurchaseStatus);
