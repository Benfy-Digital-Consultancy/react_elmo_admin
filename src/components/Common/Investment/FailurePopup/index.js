import React from "react";
import { numberToRupees, amountWithRs } from "service/helperFunctions";
import Popup from "components/Common/Popup/Popup";
import FailureIcon from "assets/images/failureIcon.png";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import "./style.scss";
import { useLang } from "hooks/useLang";
import { endpoints } from "service/helpers/config";

const FailurePopup = ({
  SchemesDetail = {},
  setFailurePopup,
  failurePopup = false,
  formDetails,
  tabActiveId,
  errorMessage,
}) => {
  const history = useHistory();
  const { Labels } = useLang();
  const { investmentType } = useParams();

  const handleAmount = () => {
    switch (investmentType) {
      case endpoints.swp:
        return numberToRupees(formDetails?.RecurringAmount);
      case endpoints.stp:
        return numberToRupees(formDetails?.MinAmount);
      case endpoints.switch:
        return numberToRupees(formDetails?.Amount);
      case endpoints.sell:
        return numberToRupees(
          tabActiveId === 1 ? formDetails?.Amount : formDetails?.RecurringAmount
        );
      default:
        return null;
    }
  };

  const handleUnits = () => {
    switch (investmentType) {
      case endpoints.swp:
        return formDetails?.RecurringAmount;
      case endpoints.stp:
        return formDetails?.MinAmount;
      case endpoints.switch:
        return formDetails?.Amount;
      case endpoints.sell:
        return tabActiveId === 1
          ? formDetails?.Amount
          : formDetails?.RecurringAmount;
      default:
        return null;
    }
  };

  const navValue = SchemesDetail.NAV
    ? SchemesDetail.NAV
    : SchemesDetail.NAV_Value;
  return (
    <Popup isOpen={failurePopup} setPopup={setFailurePopup}>
      <div className="purchase-status-in-mutual-funds">
        <div className="mb-3 text-center">
          <img alt="FailureIcon" src={FailureIcon} />
        </div>
        <div className="switch-failure-title d-flex flex-column">
          <h4 className="failure-title">{Labels.confirmMessage.unsuccess}</h4>
          {errorMessage && <h5 className="failure-title">{errorMessage}</h5>}
        </div>
        <div className="content">
          <div className="box">
            <div className="popup-failure-title">
              {SchemesDetail?.SchemeName}
            </div>
            <div className="popup-failure-sub-title mb-1">
              {SchemesDetail?.SchemeCategoryType
                ? SchemesDetail?.SchemeCategoryType
                : SchemesDetail?.SchemeType}
            </div>
            <div className="fs-14 fw-500">
              <div className="row">
                <div className="col-4 mx-auto">
                  <div className="row">
                    <div className="col-6">
                      <span>{Labels.latestNav} :</span>
                    </div>
                    <div className="col-6">
                      <span>
                        {SchemesDetail ? amountWithRs(navValue) : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {formDetails.OneTimeRadioBtn !== endpoints.unit &&
              formDetails.OneTimeRadioBtn !== endpoints.allUnits ? (
                <div className="row">
                  <div className="col-4 mx-auto">
                    <div className="row">
                      <div className="col-6">
                        <span>{Labels.amount} : </span>
                      </div>
                      <div className="col-6">
                        <span>{handleAmount()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-4 mx-auto">
                    <div className="row">
                      <div className="col-6">
                        <span>{Labels.unit} : </span>
                      </div>
                      <div className="col-6">
                        <span>{handleUnits()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4 buttonAlign">
            <button
              className="primary-btn bordered me-3"
              onClick={() => history.push("/dashboard/mutual-fund")}
            >
              {Labels.cancel}
            </button>
            <button
              className="primary-btn btn-Background"
              onClick={() => setFailurePopup(false)}
            >
              {Labels.modifyRetry}
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};
export default FailurePopup;
