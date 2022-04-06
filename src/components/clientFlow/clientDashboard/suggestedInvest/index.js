import React, { useState } from "react";
import { withRouter } from "react-router";
import InfoIcon from "assets/images/info.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoaderIcon from "assets/images/spinner.gif";
import Popup from "components/Common/Popup/Popup";
import { NormalButton } from "components/Common";
import { useHistory } from "react-router-dom";
import { useLang } from "hooks/useLang";
import { endpoints } from "service/helpers/config";
function SugestedInvest({
  otherInvestmentDetail,
  handleInfo,
  loaderId,
  loader,
  kycList,
}) {
  const history = useHistory();
  const [kycPopup, setKycPopup] = useState(false);
  const { Labels } = useLang();
  const investButton = (itemDetail) => {
    let { ProductId, ProductName, URLLink } = itemDetail;
    if (kycList?.KYCstatus === endpoints.Verified) {
      if (URLLink) {
        window.open(URLLink, "_blank");
      } else if (ProductName === "Mutual Funds") {
        history.push(`/buy-investment`);
      } else {
        history.push(`/productlist/${ProductId}/${ProductName}`);
      }
    } else {
      setKycPopup(true);
    }
  };
  return (
    <>
      <div className="section-content">
        <div className="bottom-list">
          {otherInvestmentDetail?.map((item, index) => {
            let checkValueAvaliable = Number(item.CurrentValue) !== 0;
            if (checkValueAvaliable) return "";
            return (
              item.ProductName !== "Sovereign Gold Bond" && (
                <React.Fragment key={index}>
                  {Number(item?.Investment) !== null && (
                    <div className="list">
                      <div className="left">
                        <strong>{item?.ProductName}</strong>
                        <span>{item?.ProductShrotDescription}</span>
                      </div>
                      <div className="center">
                        <p
                          className="mb-0 fs-18 fw-500 cursor-pointer text-underline text-primary-color"
                          onClick={() => investButton(item)}
                        >
                          {Labels.invest}
                        </p>
                      </div>
                      <div className="right">
                        {loaderId === item.ProductId && loader ? (
                          <img
                            src={LoaderIcon}
                            alt="LoaderIcon"
                            className="loaderIcon"
                          />
                        ) : (
                          <img
                            className="cursor-pointer"
                            src={InfoIcon}
                            alt="InfoIcon"
                            onClick={() => {
                              handleInfo(item.ProductId);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )
            );
          })}
        </div>
      </div>
      {kycPopup && (
        <Popup
          isOpen={kycPopup}
          setPopup={(value) => {
            setKycPopup(value);
          }}
        >
          <div className="info-popup">
            <div className="title-block">
              <span>{Labels.confirm}</span>
            </div>
            <div className="info-section">{Labels.incompleteProfile}</div>
            <div className="d-flex row justify-content-center">
              <div className="col-3">
                <NormalButton
                  label={Labels.cancel}
                  className="w-100 mr-3"
                  outline={true}
                  onClick={() => {
                    setKycPopup(false);
                  }}
                />
              </div>
              <div className="col-3">
                <NormalButton
                  label={Labels.okay}
                  className="w-100"
                  isPrimay={true}
                  onClick={() => {
                    setKycPopup(false);
                  }}
                />
              </div>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}

let mapStateToProps = (state) => {
  return {
    kycList: state.dashboardStore.kycList,
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SugestedInvest));
