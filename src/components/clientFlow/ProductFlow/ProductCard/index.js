import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import InfoIcon from "assets/images/info.svg";
import { useLang } from "hooks/useLang";
import { ToolTip } from "components/Common/ToolTip";
import { InfoPopup } from "components/Common/InfoPopup";
import { getSchemeDataFromProduct } from "redux/action/clientFlow/DashboardAct";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./style.scss";
import { endpoints } from "service/helpers/config";

const ProductCard = (props) => {
  const history = useHistory();
  const { Labels } = useLang();
  let {
    productDetails: {
      TwoYearInterest = 0,
      ThreeYearInterest = 0,
      FourYearInterest = 0,
      OneYearInterest = 0,
      FiveYearInterest = 0,
      SchemeBaseName,
      Ratings,
      ROIDate,
      TaxBenefit,
    },
    productName,
    productId,
    getSchemeDataFromProductApi,
  } = props;
  const [infoPopup, setInfoPopup] = useState(false);
  const [schemeData, setSchemeData] = useState(null);

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
    <div className="product-card">
      <div className="d-flex align-items-center w-100 justify-content-between">
        <h3 className="product-title">{SchemeBaseName}</h3>
        <div className="right d-flex">
          <p
            className="mb-0 fs-18 fw-500 cursor-pointer text-underline text-primary-color me-3"
            onClick={() =>
              history.push(
                `/scheme-invest/${productId}/${productName}/${SchemeBaseName}`
              )
            }
          >
            {Labels.invest}
          </p>
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
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {productName === "NPS" && (
            <div dangerouslySetInnerHTML={{ __html: TaxBenefit }} />
          )}
        </div>
        <div className="col-4">
          {productName === "Capital Gain Bond" && (
            <p className="product-subtitle mb-1 fw-600">
              {Labels.ratings}: <b>{Ratings || "-"}</b>
            </p>
          )}
          {(productName === "Fixed Deposit" ||
            productName === "Digital Gold") && (
            <p className="product-subtitle mb-1 fw-600">
              {Labels.roiDate}: <b>{ROIDate || "-"}</b>
            </p>
          )}
          {productName !== "Capital Gain Bond" &&
            productName !== "NPS" &&
            productName !== "Mutual Funds" &&
            productName !== "Digital Gold" && (
              <p className="product-subtitle">
                {Labels.rateOfInterest}: <b>{FiveYearInterest || "-"}</b>
              </p>
            )}
        </div>
        <div className="col-8">
          {(productName === "Digital Gold" ||
            productName === "Fixed Deposit" ||
            productName === "Mutual Funds") && (
            <div>
              <h4 className="text-grey fs-16 text-center">
                {Labels.rateOfInterest} - Annual Option
              </h4>
              <div className="d-flex">
                <div className="p-2 rate-of-interest text-center">
                  <h4 className="mb-1">1 {Labels.year}</h4>
                  <p className="mb-0">{OneYearInterest || "0"}%</p>
                </div>
                <div className="border-right" />
                <div className="p-2 rate-of-interest text-center">
                  <h4 className="mb-1">2 {Labels.year}</h4>
                  <p className="mb-0">{TwoYearInterest || "0"}%</p>
                </div>
                <div className="border-right" />
                <div className="p-2 rate-of-interest text-center">
                  <h4 className="mb-1">3 {Labels.year}</h4>
                  <p className="mb-0">{ThreeYearInterest || "0"}%</p>
                </div>
                <div className="border-right" />
                <div className="p-2 rate-of-interest text-center">
                  <h4 className="mb-1">4 {Labels.year}</h4>
                  <p className="mb-0">{FourYearInterest || "0"}%</p>
                </div>
                <div className="border-right" />
                <div className="p-2 rate-of-interest text-center">
                  <h4 className="mb-1">5 {Labels.year}</h4>
                  <p className="mb-0">{FiveYearInterest || "0"}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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
    {
      getSchemeDataFromProductApi: getSchemeDataFromProduct,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(ProductCard));
