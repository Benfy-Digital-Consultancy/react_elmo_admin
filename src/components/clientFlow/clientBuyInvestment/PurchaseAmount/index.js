import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./style.scss";
import { numberToRupees, amountWithRs } from "service/helperFunctions";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { endpoints } from "service/helpers/config";
import {
  OneTimeOrderTransaction,
  SIPTransaction,
  SpreadTransaction,
} from "redux/action/clientFlow/BuyInvestAct";
import {
  getDataFromStorage,
  setDataFromStorage,
} from "service/helperFunctions";
import { PageLoader } from "components/Common/PageLoader";
import { useLang } from "hooks/useLang";

const PurchaseAmount = ({
  history,
  kycData,
  OneTimeOrderTransactionApiCall,
  SIPTransactionApiCall,
  SpreadTransactionApiCall,
}) => {
  const [breadCrumbsList] = useState([
    {
      redirection: () => history.push("/buyInvestment"),
      label: "BuyInvestment",
    },
    {
      label: "Confirm Purchase",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRoleData, setRoledata] = useState({});
  const { Labels } = useLang();
  const [whitelistSource, setWhitelistSource] = useState("");
  const [buyInvestFormData, setBuyInvestFormData] = useState([]);
  const [buySchemeData, setBuySchemeData] = useState([]);

  // UserLoginDataGet
  useEffect(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    let whiteListsource = getDataFromStorage(
      endpoints.auth.WHITELIST_SOURCE_DATA,
      endpoints.auth.WHITELIST_SOURCE_KEY
    );

    let buyInvestFormData = getDataFromStorage(
      endpoints.auth.BUY_FORMDATA_DATA,
      endpoints.auth.BUY_FORMDATA_KEY
    );
    let buyInvestSchemeData = getDataFromStorage(
      endpoints.auth.BUY_SCHEME_DATA,
      endpoints.auth.BUY_SCHEME_KEY
    );

    setBuyInvestFormData(buyInvestFormData);
    setBuySchemeData(buyInvestSchemeData);
    setWhitelistSource(whiteListsource);
    if (userRoleData) {
      setRoledata(userRoleData);
    }
  }, []);

  // handleToConfirmApi

  const handleToConfirmApi = () => {
    setIsLoading(true);
    var buyInvestDataCount = 0;
    buyInvestFormData.forEach((item, index) => {
      buyInvestDataCount++;
      if (item.apiCallMethod === "One") {
        handleOneTimeConfirm(item, buySchemeData[index], index);
      } else if (item.apiCallMethod === "Sip") {
        handleToSipConfirm(item, buySchemeData[index], index);
      } else if (item.apiCallMethod === "Spread") {
        handleToSpreadConfirm(item, buySchemeData[index], index);
      } else if (item.apiCallMethod === "Both") {
        handleToSipConfirm(item, buySchemeData[index], index);
        handleOneTimeConfirm(item, buySchemeData[index], index);
      } else {
        handleToSipConfirm(item, buySchemeData[index], index);
        handleToSpreadConfirm(item, buySchemeData[index], index);
      }
      setTimeout(() => {
        setIsLoading(true);
        if (index + 1 === buyInvestDataCount) {
          history.push("/buyInvestmentPurchaseStatus");
        }
      }, 1000);
    });
  };

  // handleOneTimeTransaction
  const handleOneTimeConfirm = async (formData, SchemData, formDataIndex) => {
    setIsLoading(true);
    const { clientMasterMFD } = kycData || {};
    const { oneTimePurChaseAmount, First_Order_Today, sipInstallmentAmount } =
      formData;
    const { ClientCode, SubBroker_Code, EUIN_No, ARN_No, role_id } =
      userRoleData;
    const { RTASchemeCode } = SchemData;

    let payload = {
      LanguageId: endpoints.auth.LanguageId,
      Bse_Scheme_Code: RTASchemeCode,
      Client_Code: ClientCode,
      EUIN_Decleration: EUIN_No ? "Y" : "N",
      EUIN_Number: EUIN_No,
      First_Order_Today: First_Order_Today ? "Y" : "N",
      Folio_Number: "",
      Frequency_Type: "",
      Installment_Amount: oneTimePurChaseAmount,
      Installment_Units: "",
      Internal_Ref_Number: "",
      Number_Of_Withdrawls: sipInstallmentAmount,
      Remarks: "",
      Start_Date: "",
      Sub_Broker_Arn: ARN_No,
      Sub_Broker_Code: SubBroker_Code,
      Transaction_Mode: "P",
      Tums_id: clientMasterMFD?.ums_id,
      User_Id: SubBroker_Code,
      Source: whitelistSource,
      Role_Type: role_id,
      Platform: endpoints.auth.WEB,
    };

    await OneTimeOrderTransactionApiCall(payload)
      .then((data) => {
        if (data) {
          const { response } = data;
          let updateFormData = buyInvestFormData;
          updateFormData[formDataIndex] = {
            ...updateFormData[formDataIndex],
            apiResponseStatus: response.status,
            apiResponseMsg: response.message,
          };
          setDataFromStorage(
            updateFormData,
            endpoints.auth.BUY_FORMDATA_DATA,
            endpoints.auth.BUY_FORMDATA_KEY
          );
          setIsLoading(false);
          console.log("one time called" + formDataIndex);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  // handleSipTransaction
  const handleToSipConfirm = async (formData, SchemData, formDataIndex) => {
    setIsLoading(true);
    const {
      select_period,
      sipInstallmentAmount,
      sipAmount,
      First_Order_Today,
      sipDate,
      madateSingleList,
    } = formData;
    const { clientMasterMFD } = kycData || {};
    const { ClientCode, SubBroker_Code, EUIN_No, role_id, ARN_No } =
      userRoleData;
    const { RTASchemeCode } = SchemData;
    let payload = {
      LanguageId: endpoints.auth.LanguageId,
      MandateType: "X",
      BROKERAGE: "",
      ClientCode: ClientCode,
      created_date: new Date(),
      DPC: "N",
      DP_transaction_mode: "P",
      EUIN: EUIN_No,
      EUIN_flag: EUIN_No ? "Y" : "N",
      FIRST_ORDER_FLAG: First_Order_Today === true ? "Y" : "N",
      FOLIO_NO: "",
      FREQUENCY_TYPE: select_period,
      frequency_allowed: "1",
      INSTALLMENT_AMOUNT: sipAmount,
      INTERNAL_REF_NO: "",
      IPAdd: sessionStorage.getItem(endpoints.auth.IP),
      modified_date: new Date(),
      NO_OF_INSTALLMENTS: sipInstallmentAmount,
      Param1_SubBrokerARN: ARN_No,
      Param2_ISIPMandateID: "",
      Param3: "",
      REMARKS: "",
      SUBBRCODE: SubBroker_Code,
      SchemeCd: RTASchemeCode,
      start_date: sipDate,
      TRANS_MODE: "P",
      Transaction_code: "NEW",
      Tums_id: clientMasterMFD?.ums_id,
      XSIP_MANDATEID: madateSingleList?.MandateId,
      XSIP_REG_ID: "",
      User_Id: SubBroker_Code,
      Source: whitelistSource,
      Role_Type: role_id,
      Platform: endpoints.auth.WEB,
    };

    await SIPTransactionApiCall(payload)
      .then((data) => {
        if (data) {
          const { response } = data;
          let updateFormData = buyInvestFormData;
          updateFormData[formDataIndex] = {
            ...updateFormData[formDataIndex],
            apiResponseStatus: response.status,
            apiResponseMsg: response.message,
          };

          setDataFromStorage(
            updateFormData,
            endpoints.auth.BUY_FORMDATA_DATA,
            endpoints.auth.BUY_FORMDATA_KEY
          );
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  // handleToSpreadTransaction
  const handleToSpreadConfirm = async (formData, SchemData, formDataIndex) => {
    setIsLoading(true);

    const { KYCstatus = "", clientMasterMFD } = kycData || {};
    const { ClientCode, SubBroker_Code, EUIN_No, role_id, ARN_No } =
      userRoleData;
    const { RTASchemeCode } = SchemData;
    const {
      LiquidSellRadioBtn,
      LiquidSellMinAmount,
      LiquidSellDate,
      oneTimePurChaseAmount,
    } = formData;

    let AllunitFlag = LiquidSellRadioBtn === "AllUnit";
    let payload = {
      LanguageId: endpoints.auth.LanguageId,
      BuySell: "P",
      BuySellType: "FRESH",
      ClientCode: ClientCode,
      created_date: new Date(),
      DPC: "Y",
      DPTxn: "P",
      EUIN: EUIN_No,
      EUIN_flag: EUIN_No ? "Y" : "N",
      FolioNo: "",
      IPAdd: sessionStorage.getItem(endpoints.auth.IP),
      KYCStatus: KYCstatus,
      MinRedeem: "Y",
      modified_date: new Date(),
      OrderId: "",
      Param1_SubBrokerARN: ARN_No,
      Param2_ISIPMandateID: "",
      Param3: "",
      PurchaseAMOUNT: oneTimePurChaseAmount,
      AllUnitsFlag: AllunitFlag ? "Y" : "N",
      RedeemDate: LiquidSellDate,
      RedemptionAmount: AllunitFlag ? "" : LiquidSellMinAmount,
      RefNo: "",
      Remarks: "",
      SUBBRCODE: SubBroker_Code,
      SchemeCd: RTASchemeCode,
      Transaction_code: "NEW",
      Tums_id: clientMasterMFD?.ums_id,
      User_Id: SubBroker_Code,
      Source: whitelistSource,
      Role_Type: role_id,
      Platform: endpoints.auth.WEB,
    };

    await SpreadTransactionApiCall(payload)
      .then((data) => {
        setIsLoading(true);
        if (data) {
          const { response } = data;
          let updateFormData = buyInvestFormData;
          updateFormData[formDataIndex] = {
            ...updateFormData[formDataIndex],
            apiResponseStatus: response.status,
            apiResponseMsg: response.message,
          };
          setDataFromStorage(
            updateFormData,
            endpoints.auth.BUY_FORMDATA_DATA,
            endpoints.auth.BUY_FORMDATA_KEY
          );
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  //pageLoader

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <div className="invest-purchase-container">
        <div className="invest-purchase-heading">
          <BreadCrumbs breadCrumbsList={breadCrumbsList} />
        </div>

        <div className="row">
          <div className="d-flex justify-content-center">
            <div className="invest-title-wrap">
              <h6 className="invest-confirm-title">
                {Labels?.confirmMessage?.purchase}{" "}
              </h6>
              {buyInvestFormData?.map((item, index) => {
                return (
                  <div key={index} className="invest-card-details">
                    <h6 className="invest-card-details-heading">
                      {buySchemeData[index]?.SchemeName}
                    </h6>
                    <div className="d-flex">
                      <h6 className="invest-card-subtitle">
                        {" "}
                        {buySchemeData[index]?.SchemeType}
                      </h6>

                      <h6 className="invest-card-subtitle">
                        {Labels.latestNav}:{" "}
                        {amountWithRs(buySchemeData[index]?.NAV_Value)}
                      </h6>
                    </div>
                    {item?.sip && (
                      <div className="invest-card-data">
                        <h6 className="invest-heading-title">{Labels.sip}</h6>

                        <div className="invest-card-amount-wrap">
                          <span className="invest-card-amount-title width_title">
                            {Labels.frequency} :
                          </span>
                          <span className="invest-card-amount-title">
                            {item?.select_period}
                          </span>
                        </div>
                        <div className="invest-card-amount-wrap">
                          <span className="invest-card-amount-title width_title">
                            {Labels.amount} :
                          </span>
                          <span className="invest-card-amount-title">
                            {numberToRupees(item?.sipAmount)}
                          </span>
                        </div>
                      </div>
                    )}
                    {item?.oneTime && (
                      <div className="invest-card-data">
                        <h6 className="invest-heading-title">
                          {Labels.OneTime}
                        </h6>
                        <div className="invest-card-amount-wrap">
                          <span className="invest-card-amount-title width_title">
                            {Labels.amount} :
                          </span>
                          <span className="invest-card-amount-title">
                            {numberToRupees(item?.oneTimePurChaseAmount)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div
                className="invest-confirm-btn-container"
                onClick={handleToConfirmApi}
              >
                <h6 className="invest-confirm-btn">{Labels.confirm}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      OneTimeOrderTransactionApiCall: OneTimeOrderTransaction,
      SIPTransactionApiCall: SIPTransaction,
      SpreadTransactionApiCall: SpreadTransaction,
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
)(withRouter(PurchaseAmount));
