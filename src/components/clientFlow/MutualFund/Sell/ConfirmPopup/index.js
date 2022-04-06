import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Popup from "components/Common/Popup/Popup";
import {
  getDataFromStorage,
  numberToRupees,
  amountWithRs,
} from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import {
  sellOneTimeOrderTransaction,
  sellRecurringTransaction,
} from "redux/action/clientFlow/SellAct";
import { useLang } from "hooks/useLang";

const ConfirmPopup = ({
  sellOneTimeOrderTransactionApi,
  sellRecurringTransactionApi,
  SchemesDetail = {},
  setConfirmPopup,
  tabActiveId,
  formDetails: {
    OneTimeRadioBtn,
    Amount,
    NoInstallment,
    Installment_Date,
    Frequency_Type,
    RecurringRadioBtn,
    RecurringAmount,
    First_Order_Today,
  },
  kycData,
  confirmPopup = false,
  userDetails = null,
  setSuccessPopup,
  setFailurePopup,
  setErrorMessage,
}) => {
  const { Labels } = useLang();
  const [userRoleDetails, setUserRoleDetails] = useState(null);
  const [sourceValue, setSourceValue] = useState(null);

  const { code200 } = endpoints.status_code;

  useEffect(() => {
    const {
      USER_ROLE_kEY,
      USER_ROLE_DATA,
      WHITELIST_SOURCE_KEY,
      WHITELIST_SOURCE_DATA,
    } = endpoints.auth;
    let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
    if (userRoleData) setUserRoleDetails(userRoleData);
    let source = getDataFromStorage(
      WHITELIST_SOURCE_DATA,
      WHITELIST_SOURCE_KEY
    );
    setSourceValue(source);
  }, []);

  const handleOneTimeSubmit = () => {
    const { KYCstatus = "", clientMasterMFD } = kycData || {};
    let { subBrokerDetails } = userDetails;
    let { sub_broker_code, client_code, role_id } = userRoleDetails;
    let { RTASchemeCode, FolioNo, UserID } = SchemesDetail;
    let payload = {
      Transaction_code: "New",
      OrderId: "",
      ClientCode: client_code,
      SchemeCd: RTASchemeCode,
      BuySell: "R",
      BuySellType: "Fresh",
      DPTxn: "P",
      AMOUNT: OneTimeRadioBtn === endpoints.amount ? Amount : "",
      Qty: OneTimeRadioBtn === endpoints.unit ? Amount : "",
      AllRedeem: "Y",
      FolioNo,
      Remarks: "",
      KYCStatus: KYCstatus,
      RefNo: "",
      SUBBRCODE: sub_broker_code,
      EUIN: subBrokerDetails?.EUIN_No,
      EUIN_flag: subBrokerDetails.EUIN_No ? "Y" : "N",
      MinRedeem: "Y",
      DPC: "N",
      IPAdd: sessionStorage.getItem(endpoints.auth.IP),
      Param1_SubBrokerARN: subBrokerDetails?.ARN_No,
      Param2_ISIPMandateID: "",
      Param3: "",
      tums_id: clientMasterMFD?.ums_id,
      created_date: client_code,
      modified_date: client_code,
      LanguageId: endpoints.auth.LanguageId,
      User_Id: UserID,
      Source: sourceValue,
      Role_Type: role_id,
      Platform: endpoints.auth.WEB,
      IsProvisionalOrder: true,
      SurveyId: 33,
    };
    sellOneTimeOrderTransactionApi(payload).then(({ response }) => {
      handleResponse(response);
    });
  };

  const handleRecuringSubmit = () => {
    const { clientMasterMFD } = kycData;
    let { subBrokerDetails } = userDetails;
    let { sub_broker_code, client_code, role_id } = userRoleDetails;
    let { FolioNo, UserID, RTASchemeCode } = SchemesDetail;
    let payload = {
      ClientCode: client_code,
      Bse_Scheme_Code: RTASchemeCode,
      Transaction_Mode: "New",
      Folio_Number: FolioNo,
      Internal_Ref_Number: "",
      Start_Date: client_code,
      Number_Of_Withdrawls: NoInstallment,
      Frequency_Type: Frequency_Type,
      Installment_Amount:
        RecurringRadioBtn === endpoints.amount ? RecurringAmount : "",
      Installment_Units:
        RecurringRadioBtn === endpoints.unit ? RecurringAmount : "",
      First_Order_Today,
      Sub_Broker_Code: sub_broker_code,
      EUIN_Decleration: subBrokerDetails.EUIN_No ? "Y" : "N",
      EUIN_Number: subBrokerDetails?.EUIN_No,
      Remarks: "",
      Sub_Broker_Arn: subBrokerDetails?.ARN_No,
      Tums_id: clientMasterMFD?.ums_id,
      SettelmentDate: Installment_Date,
      LanguageId: endpoints.auth.LanguageId,
      User_Id: UserID,
      Source: sourceValue,
      Role_Type: role_id,
      Platform: endpoints.auth.WEB,
    };
    sellRecurringTransactionApi(payload).then(({ response }) => {
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
      setSuccessPopup(false);
      setConfirmPopup(false);
      setFailurePopup(true);
      setErrorMessage(message);
    }
  };

  return (
    <Popup isOpen={confirmPopup} setPopup={setConfirmPopup}>
      <div className="popup-title">
        Are you sure you would like to continue with the sell for this
        investment?{" "}
      </div>
      <div className="popup-box-sell-page">
        <div className="box-title">{SchemesDetail?.SchemeName}</div>
        <p>{SchemesDetail?.SchemeCategoryType}</p>
        <span className="sell-type">
          {tabActiveId === 1 ? Labels.OneTime : Labels.recurringWithdrawal}
        </span>

        <div className="row">
          <div className="col-4">
            <div className="d-flex align-items-center">
              <span className="label mb-0">{Labels.latestNav} :</span>
              <span className="label lablepadding mb-0">
                {amountWithRs(SchemesDetail?.NAV)}
              </span>
            </div>
          </div>

          <div className="col-4">
            <div className="d-flex align-items-center">
              <span className="label mb-0">{Labels.currentValue} :</span>
              <span className="label lablepadding mb-0">
                {numberToRupees(SchemesDetail?.CurrentTotalValue)}
              </span>
            </div>
          </div>

          <div className="col-4">
            <div className="d-flex align-items-center">
              <span className="label mb-0">{Labels.amount} :</span>
              <span className="label lablepadding mb-0">
                {tabActiveId === 1
                  ? OneTimeRadioBtn === endpoints.unit ||
                    OneTimeRadioBtn === endpoints.allUnits
                    ? numberToRupees(Amount * SchemesDetail.NAV)
                    : numberToRupees(Amount)
                  : RecurringRadioBtn === endpoints.amount
                  ? numberToRupees(RecurringAmount)
                  : numberToRupees(RecurringAmount * SchemesDetail.NAV)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="submit-btn w-100 d-flex ml-auto pt-4 mt-3">
        <button
          className="primary-btn"
          onClick={() =>
            tabActiveId === 1 ? handleOneTimeSubmit() : handleRecuringSubmit()
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
      sellOneTimeOrderTransactionApi: sellOneTimeOrderTransaction,
      sellRecurringTransactionApi: sellRecurringTransaction,
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
)(withRouter(ConfirmPopup));
