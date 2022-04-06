import React from "react";
import { withRouter, useParams } from "react-router";
import { numberToRupees, amountWithRs } from "service/helperFunctions";
import SuccessIcon from "assets/images/success.png";
import Popup from "components/Common/Popup/Popup";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { useLang } from "hooks/useLang";
import { endpoints } from "service/helpers/config";
const SuccessPopup = ({
  SchemesDetail = {},
  successPopup = false,
  tabActiveId,
  formDetails,
}) => {
  const { Labels } = useLang();
  const history = useHistory();
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
          formDetails?.Amount
            ? formDetails?.Amount
            : formDetails?.RecurringAmount
        );
      default:
        return null;
    }
  };

  return (
    <div className="success-popup">
      <Popup isOpen={successPopup} close={false}>
        <div className="sell-success">
          <div className="mb-4">
            <img alt="SuccessIcon" src={SuccessIcon} />
          </div>
          <div className="sell-success-title mb-2">Successfully sold</div>
          <div className="sell-success-content mx-auto">
            You will receive a separate email from BSE to authenticate the{" "}
            {investmentType} transaction. Please click on the link in the email
            and follow the instructions on-screen to complete the transaction.
          </div>
          <div className="popup-box-sell-page">
            <div className="box-title">{SchemesDetail?.SchemeName}</div>
            <p>
              {SchemesDetail?.SchemeCategoryType
                ? SchemesDetail?.SchemeCategoryType
                : SchemesDetail?.SchemeType}{" "}
              <label>
                <strong>{Labels.latestNav} :</strong>
                {amountWithRs(
                  SchemesDetail?.NAV
                    ? SchemesDetail?.NAV
                    : SchemesDetail?.NAV_Value
                )}
              </label>
            </p>
            {tabActiveId && (
              <span className="sell-type">
                {tabActiveId === 1
                  ? Labels.OneTime
                  : Labels.recurringWithdrawal}
              </span>
            )}
            <div className="row">
              <div className="col-4">
                <div className="d-flex align-items-center">
                  <span className="label mb-0">{Labels.amount} :</span>
                  <span className="label lablepadding mb-0">
                    {handleAmount()}
                  </span>
                </div>
              </div>
              {SchemesDetail?.CurrentTotalValue && (
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <span className="label mb-0">{Labels.currentValue} :</span>
                    <span className="label lablepadding mb-0">
                      {numberToRupees(SchemesDetail?.CurrentTotalValue)}
                    </span>
                  </div>
                </div>
              )}
              {tabActiveId === 2 && (
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <span className="label mb-0">
                      {Labels.settlementDate} :
                    </span>
                    <span className="label lablepadding mb-0">
                      {formDetails?.Installment_Date}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            <button
              className="primary-btn bordered"
              onClick={() => history.push("/order-details")}
            >
              {Labels.viewOrder}
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default withRouter(SuccessPopup);
