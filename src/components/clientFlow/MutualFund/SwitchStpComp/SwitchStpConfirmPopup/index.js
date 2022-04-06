import React, { useState, useEffect } from "react";
import Popup from "../../../../Common/Popup/Popup";
import {
  numberToRupees,
  percentageValidator,
  getDataFromStorage,
  amountWithRs,
  imageConditionValidate,
  date,
} from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { useParams, withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSwitchTransactionCalc,
  getSTPTransactionCalc,
} from "redux/action/clientFlow/MutualFundAct";

const SwitchStpConfirmPopup = ({
  setConfirmPopup,
  confirmPopup = false,
  sipDetails,
  setSuccessPopup,
  setFailurePopup,
  formDetails,
  kycData,
  userDetails,
  getSwitchTransactionCalcApi,
  currentFund,
  getSTPTransactionCalcApi,
  setErrorMessage,
}) => {
  const { Labels } = useLang();
  const [userRoleDetails, setUserRoleDetails] = useState(null);
  const { investmentType } = useParams();
  const [sourceValue, setSourceValue] = useState(null);

  const { code200 } = endpoints.status_code;
  useEffect(() => {
    const {
      USER_ROLE_kEY,
      USER_ROLE_DATA,
      WHITELIST_SOURCE_DATA,
      WHITELIST_SOURCE_KEY,
    } = endpoints.auth;
    let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
    if (userRoleData) setUserRoleDetails(userRoleData);
    let source = getDataFromStorage(
      WHITELIST_SOURCE_DATA,
      WHITELIST_SOURCE_KEY
    );
    setSourceValue(source);
  }, []);

  const handleConfirmSwitch = () => {
    const { KYCstatus = "", clientMasterMFD } = kycData || {};
    let { subBrokerDetails } = userDetails;
    let { sub_broker_code, client_code, role_id } = userRoleDetails;
    let { RTASchemeCode, FolioNo, UserID } = sipDetails;
    let body = {
      LanguageId: endpoints.auth.LanguageId,
      AllUnitFlag: "Y",
      BuySell: "SO",
      BuySellType: "FRESH",
      ClientCode: client_code,
      created_date: client_code,
      DPTxn: "P",
      EUIN: subBrokerDetails?.EUIN_No,
      EUIN_flag: subBrokerDetails.EUIN_No ? "Y" : "N",
      FolioNo: FolioNo,
      FromSchemeCd: RTASchemeCode,
      ToSchemeCd: currentFund?.RTASchemeCode,
      IPAdd: sessionStorage.getItem(endpoints.auth.IP),
      KYCStatus: KYCstatus,
      MinRedeem: "Y",
      modified_date: client_code,
      OrderId: "",
      Param1_SubBrokerARN: subBrokerDetails?.ARN_No,
      Param2_ISIPMandateID: "",
      Param3: "",
      Remarks: "",
      SUBBRCODE: sub_broker_code,
      SwitchAMOUNT: "",
      SwitchUnits: "",
      Transaction_code: "NEW",
      tums_id: clientMasterMFD?.ums_id,
      User_Id: UserID,
      Source: sourceValue,
      Role_Type: role_id,
      Platform: endpoints.auth.WEB,
    };
    getSwitchTransactionCalcApi(body).then(({ response }) => {
      handleResponse(response);
    });
  };
  const handleConfirmSTP = () => {
    const { clientMasterMFD } = kycData || {};
    let { subBrokerDetails } = userDetails;
    let { sub_broker_code, client_code, role_id } = userRoleDetails;
    let { RTASchemeCode, FolioNo, UserID } = sipDetails;
    let body = {
      Client_Code: client_code,
      From_Bse_Scheme_Code: RTASchemeCode,
      To_Bse_Scheme_Code: currentFund?.RTASchemeCode,
      BuySellType: "FRESH",
      Transaction_Mode: "New",
      Folio_Number: FolioNo,
      Internal_Ref_Number: "",
      Start_Date: client_code,
      Frequency_Type: formDetails.Frequency_Type,
      No_Of_Transfers: formDetails.NoInstallment,
      Installment_Amount: formDetails.MinAmount,
      First_Order_Today: "",
      Sub_Broker_Code: sub_broker_code,
      EUIN_Decleration: subBrokerDetails.EUIN_No ? "Y" : "N",
      EUIN_Number: subBrokerDetails?.EUIN_No,
      Remarks: "",
      Sub_Broker_Arn: subBrokerDetails?.ARN_No,
      Tums_id: clientMasterMFD?.ums_id,
      SettelmentDate: formDetails.Installment_Date,
      LanguageId: endpoints.auth.LanguageId,
      User_Id: UserID,
      Source: sourceValue,
      Role_Type: role_id,
      Platform: endpoints.auth.WEB,
    };
    getSTPTransactionCalcApi(body).then(({ response }) => {
      handleResponse(response);
    });
  };

  //handle Response
  const handleResponse = ({ status_code = "", message = "" }) => {
    if (status_code === code200) {
      setSuccessPopup(true);
      setConfirmPopup(false);
      setErrorMessage(null);
    } else {
      setConfirmPopup(false);
      setSuccessPopup(false);
      setFailurePopup(true);
      setErrorMessage(message);
    }
  };

  let confirmedDate = date(formDetails?.Installment_Date);

  const handleAmount = (valueType) => {
    switch (valueType) {
      case endpoints.amount:
        return numberToRupees(formDetails?.Amount);
      case endpoints.unit:
        return numberToRupees(formDetails?.Amount * sipDetails?.NAV);
      case endpoints.allUnits:
        return `${numberToRupees(sipDetails?.CurrentTotalValue)} `;
      default:
        return numberToRupees(formDetails?.Amount);
    }
  };

  return (
    <Popup isOpen={confirmPopup} setPopup={setConfirmPopup}>
      <div className="popup-title">{Labels.transferTitle}</div>
      <div className="popup-box-title">{Labels.from}:</div>
      <div className="popup-box-switch-page">
        <div className="box-title">{sipDetails?.SchemeName}</div>
        <p>{sipDetails?.SchemeCategoryType}</p>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <span className="col label">{Labels.latestNav} :</span>
              <span className="col label">{amountWithRs(sipDetails?.NAV)}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <span className="col label">{Labels.investment} :</span>
              <span className="col label">
                {numberToRupees(sipDetails?.TotalInvestment)}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <span className="col label">{Labels.units} :</span>
              <span className="col label">{sipDetails?.Units}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <span className="col label">{Labels.currentValue} :</span>
              <span className="col label">
                {numberToRupees(sipDetails?.CurrentTotalValue)}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <span className="col-6 label">{Labels.absoluteReturn} :</span>
              <span className="col-6 d-flex">
                <span className="col-4 label">
                  {percentageValidator(sipDetails?.AbsoluteReturn)}
                </span>
                <span className="col-4 label">
                  {imageConditionValidate(sipDetails?.AbsoluteReturn)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="popup-box-title">
        {Labels.switch} {Labels.to}:
      </div>
      <div className="popup-box-switch-page">
        <div className="box-title">{currentFund?.SchemeName}</div>
        <p className="mb-0">{currentFund?.SchemeType}</p>
        <div className="row">
          {formDetails.Frequency_Type && investmentType === endpoints.stp && (
            <div className="col-4 mt-1">
              <div className="d-flex align-items-center">
                <span className="label mb-0">{Labels.frequency} :</span>
                <span className="label lablepadding mb-0">
                  {formDetails.Frequency_Type}
                </span>
              </div>
            </div>
          )}
          {formDetails.Installment_Date && investmentType === endpoints.stp && (
            <div className="col-4 mt-1">
              <div className="d-flex align-items-center">
                <span className="label mb-0">{Labels.date} :</span>
                <span className="label lablepadding mb-0">
                  {confirmedDate === "Invalid date" || null
                    ? "-"
                    : confirmedDate}
                </span>
              </div>
            </div>
          )}

          <div className="col-4 mt-1">
            <div className="d-flex align-items-center">
              <span className="label mb-0">{Labels.amount} :</span>
              <span className="label lablepadding mb-0">
                {investmentType === endpoints.switch
                  ? handleAmount(formDetails.OneTimeRadioBtn)
                  : numberToRupees(formDetails?.MinAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="submit-btn">
        <button
          className="primary-btn"
          onClick={() =>
            investmentType === endpoints.switch
              ? handleConfirmSwitch()
              : handleConfirmSTP()
          }
        >
          {Labels.confirm}
        </button>
      </div>
    </Popup>
  );
};
let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSwitchTransactionCalcApi: getSwitchTransactionCalc,
      getSTPTransactionCalcApi: getSTPTransactionCalc,
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    kycData: state.dashboardStore.kycList,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SwitchStpConfirmPopup));
