import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getRedeem,
  getRedeemMaxAmount,
} from "redux/action/clientFlow/MutualFundAct";
import { endpoints } from "service/helpers/config";
import { RedeemMinAmount } from "service/helpers/Constants";
import { getDataFromStorage, amountWithRs } from "service/helperFunctions";
import ErrorComponent from "components/Common/ErrorComponent";
import { CommonInput } from "components/Common/CommonInput";
import { AppBack } from "components/Common/AppBack";
import Popup from "components/Common/Popup/Popup";
import MenuList from "components/Common/MenuList";
import { Toast } from "service/toast";
import "./Redeem.scss";
import { useLang } from "hooks/useLang";

const Redeem = (props) => {
  const { Labels, errorText } = useLang();
  const { getRedeemApi, kycData, getRedeemMaxAmountApi } = props;
  const [redeemData, setRedeemData] = useState([]);
  const [amount, setAmount] = useState();
  const [maxAmount, setMaxAmount] = useState();
  const [continuePopup, setContinuePopup] = useState(false);
  const [errorValidation, setErrorValidation] = useState(null);
  const { success_title } = endpoints.response_error_msg;
  const { minAmount_message, maxAmount_message, success_message } =
    errorText?.redeem_error_message || {};

  useEffect(() => {
    const redeemDetails = getDataFromStorage(
      endpoints.auth.REDEEM_DETAILS,
      endpoints.auth.REDEEM_DETAILS_KEY
    );
    if (redeemDetails) {
      setRedeemData(redeemDetails);
    }
  }, [setRedeemData]);

  const continueOption = () => {
    if (amount <= RedeemMinAmount || amount === undefined || amount <= 0) {
      setErrorValidation(minAmount_message + " " + RedeemMinAmount);
      return null;
    } else if (parseInt(amount) >= parseInt(maxAmount)) {
      setErrorValidation(maxAmount_message + " " + maxAmount);
      return null;
    } else {
      setContinuePopup(true);
    }
  };

  let userDetails = getDataFromStorage(
    endpoints.auth.USER_DETAILS,
    endpoints.auth.USER_DETAILS_KEY
  );
  let userRoleData = getDataFromStorage(
    endpoints.auth.USER_ROLE_kEY,
    endpoints.auth.USER_ROLE_DATA
  );
  let client_code = userRoleData?.ClientCode;
  let uid = userRoleData?.uid;
  let sub_broker_code = userDetails?.subBrokerDetails?.SubBroker_Code;
  let ARN_No = userDetails?.subBrokerDetails?.ARN_No;
  let EUIN_No = userDetails?.subBrokerDetails?.EUIN_No;

  const redeemMaxAmount = useCallback(() => {
    let body = {
      UserId: uid,
      Password: null,
      FolioNo: redeemData?.FolioNo,
      AMCName: redeemData?.AMCCode,
      Filler1: redeemData?.RTASchemeCode,
    };
    getRedeemMaxAmountApi(body).then((data) => {
      setMaxAmount(data?.SchemeDetails[0]?.Max_Amount);
    });
  }, [getRedeemMaxAmountApi, redeemData, uid]);

  useEffect(() => {
    redeemMaxAmount();
  }, [redeemMaxAmount]);

  const confirmOption = () => {
    const { KYCstatus = "", clientMasterMFD } = kycData || {};
    let source = getDataFromStorage(
      endpoints.auth.WHITELIST_SOURCE_DATA,
      endpoints.auth.WHITELIST_SOURCE_KEY
    );
    let body = {
      Transaction_code: "NEW",
      OrderId: "",
      ClientCode: client_code,
      FromSchemeCd: redeemData?.RTASchemeCode,
      ToSchemeCd: redeemData?.RTASchemeCode,
      BuySell: "R",
      BuySellType: "Fresh",
      DPTxn: "P",
      SwitchAMOUNT: amount,
      SwitchUnits: "",
      AllUnitFlag: "",
      FolioNo: redeemData?.FolioNo,
      Remarks: "",
      KYCStatus: KYCstatus,
      SUBBRCODE: sub_broker_code,
      EUIN: EUIN_No,
      EUIN_flag: EUIN_No !== "" ? "Y" : "N",
      MinRedeem: "Y",
      IPAdd: sessionStorage.getItem(endpoints.auth.IP),
      Param1_SubBrokerARN: ARN_No,
      Param2_ISIPMandateID: "",
      Param3: "",
      tums_id: clientMasterMFD?.ums_id,
      created_date: client_code,
      modified_date: client_code,
      LanguageId: endpoints.auth.LanguageId,
      Source: source,
      User_Id: uid,
      Role_Type: 29,
      Platform: endpoints.auth.WEB,
    };
    getRedeemApi(body);
    Toast({
      type: success_title,
      message: success_message,
    });
    setAmount("");
    setContinuePopup(false);
  };

  return (
    <React.Fragment>
      <div className="redeem-investment">
        <div className="d-flex justify-content-between align-items-center">
          <AppBack
            onClick={() => props.history.push("/dashboard/mutual-fund")}
            label={Labels.redeem}
          />
          <div className="redeem-icon-section">
            <div className="mutual-fund">
              <div className="bottom-section">
                <div className="dropdown-list-outer">
                  <div className="dropdown-list">
                    <div className="dropdown-list-header">
                      <MenuList screen={"Redeem"} item={redeemData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="redeem-header d-flex flex-column">
            <h2>{redeemData?.SchemeName}</h2>
            <div className="d-flex flex-row">
              <h3>
                {redeemData?.SchemeCategoryType?.split(":")[0]}
                {":"}
                <span>
                  {redeemData?.SchemeCategoryType?.substring(
                    redeemData?.SchemeCategoryType?.indexOf(":") + 1
                  )}
                </span>
              </h3>
              <h3>
                {Labels.latestNav} :{" "}
                <span>{amountWithRs(redeemData?.NAV)}</span>
              </h3>
            </div>
          </div>
          <div className="input-section">
            <div className="d-flex justify-content-around">
              <div className="d-flex flex-column">
                <CommonInput
                  label={Labels.amount}
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setErrorValidation(null);
                  }}
                />
                <h6>
                  {Labels.minAmount}: {amountWithRs(RedeemMinAmount)}
                </h6>
              </div>
              <CommonInput
                label={Labels.folioNumber}
                type="number"
                name="chequeNumber"
                readOnly={true}
                value={redeemData?.FolioNo}
              />
            </div>
          </div>
          <div className="bottom-section">
            <h3>
              Per day limit on sell Amount under this option: 90% of current
              market value up to maximum of Rs.50,000.
            </h3>
            <div className="button-section">
              {errorValidation && <ErrorComponent message={errorValidation} />}
              <button
                disabled={errorValidation}
                onClick={continueOption}
                className="primary-btn bordered bottom-align"
              >
                {Labels.continue}
              </button>
            </div>
          </div>
        </div>
        {continuePopup && (
          <Popup isOpen={continuePopup} setPopup={setContinuePopup}>
            <div className="redeem-popup">
              <div className="current-popup-title">
                <div className="redeem-header">
                  <h2>{redeemData?.SchemeName}</h2>
                  <div className="d-flex flex-row">
                    <h3>
                      {redeemData?.SchemeCategoryType?.split(":")[0]}
                      {":"}
                      <span>
                        {redeemData?.SchemeCategoryType?.substring(
                          redeemData?.SchemeCategoryType?.indexOf(":") + 1
                        )}
                      </span>
                    </h3>
                    <h3>
                      {Labels.latestNav} :{" "}
                      <span>{amountWithRs(redeemData?.NAV)}</span>
                    </h3>
                  </div>
                </div>
              </div>
              <div>
                <div className="description">
                  <h2>{Labels.OneTime} : </h2>
                  <h4>
                    {Labels.redemptionAmount} :{" "}
                    <span> {amountWithRs(amount)}</span>
                  </h4>
                  <h4>
                    {Labels.folioNumber}: <span> {redeemData?.FolioNo}</span>
                  </h4>
                </div>
                <button onClick={confirmOption} className="primary-btn">
                  {Labels.confirm}
                </button>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getRedeemApi: getRedeem,
      getRedeemMaxAmountApi: getRedeemMaxAmount,
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    kycData: state.dashboardStore.kycList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Redeem));
