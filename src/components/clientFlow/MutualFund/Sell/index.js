import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import "./Sell.scss";
import {
  getGainDetails,
  getBankDetails,
  getReedemptionQuestionaire,
  getMoreSchemeDetails,
} from "redux/action/clientFlow/SellAct";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDataFromStorage } from "service/helperFunctions";
import FundDetails from "./FundDetails";
import ConfirmPopup from "./ConfirmPopup";
import SuccessPopup from "components/Common/Investment//SuccessPopup";
import SellDetails from "./SellDetails";
import QuestionPopup from "./QuestionPopup";
import FailurePopup from "components/Common/Investment/FailurePopup";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { requiredFieldsSell, sellMaxAmount } from "service/helpers/Constants";
import { useParams } from "react-router";
import ErrorComponent from "components/Common/ErrorComponent";
import { BreadCrumbs } from "components/Common/BreadCrumbs";

function Sell(props) {
  const { Labels, errorText } = useLang();
  let [confirmPopup, setConfirmPopup] = useState(false);
  let [successPopup, setSuccessPopup] = useState(false);
  let [failurePopup, setFailurePopup] = useState(false);
  let [informationPopup, setInformationPopup] = useState("");
  let [questionPopup, setQuestionPopup] = useState(false);
  let [gainDetails, setGainDetails] = useState(null);
  let [gainIndex, setGainIndex] = useState(null);
  let [bankDetails, setBankDetails] = useState(null);
  let [isOneTimeDisabled, setIsOneTimeDisabled] = useState(false);
  let [isWithDrawalDisabled, setIsWithDrawalDisabled] = useState(true);
  let [questionOptions, setQuestionOptions] = useState([]);
  let [userDetails, setUserDetails] = useState(null);
  let [sellDetails, setSellDetails] = useState(null);
  const [sipDetails, setSipDetails] = useState(null);
  const [selectedFreqency, setSelectedFrequency] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [minAmountOneTime, setMinAmountOneTime] = useState(0);
  const [minAmountRecurring, setMinAmountRecurring] = useState(0);
  const [errorValidation, setErrorValidation] = useState(null);

  let [errors, setErrors] = useState({});
  let [tabActiveId, setTabActiveId] = useState(1);
  let [formDetails, setFormDetails] = useState({
    Units: "",
    Qty: "",
    First_Order_Today: "",
    Amount: "",
    Frequency_Type: "",
    RecurringAmount: "",
    OneTimeRadioBtn: endpoints.amount,
    RecurringRadioBtn: endpoints.amount,
    NoInstallment: "",
    Installment_Date: null,
  });
  let errorObj = { ...errorText?.oneTimeError } || {};
  let errorDetailsSell = { ...errorText?.errorDetailsSell } || {};
  const [userRoleDetails, setUserRoleDetails] = useState(null);
  const {
    getGainDetailsApi,
    getMoreSchemeDetailsApi,
    getBankDetailsApi,
    getReedemptionQuestionaireApi,
    history,
  } = props;
  const { investmentType } = useParams();

  const breadCrumbsList = [
    {
      redirection: () => history.push("/dashboard"),
      label: Labels.dashboard,
    },
    {
      redirection: () => history.goBack(),
      label: Labels.mutualFundTitle,
    },
    {
      label: `${investmentType === endpoints.sell ? Labels.sell : Labels.swp} ${
        Labels.investment
      }`,
    },
  ];

  const getMoreSchemeDetailsFunc = useCallback(
    (ClientCode, schemeCode) => {
      let payload = { ClientCode, SchemeCode: schemeCode };
      getMoreSchemeDetailsApi(payload).then(
        ({ SchemesDetail, sipSchemeDetailsList = [] }) => {
          if (SchemesDetail) {
            setMinAmountOneTime(SchemesDetail.RedemptionAmountMinimum);
            setSipDetails([...sipSchemeDetailsList]);
          }
        }
      );
    },
    [getMoreSchemeDetailsApi]
  );

  //get Gain Details Func
  const getGainDetailsFunc = useCallback(
    (ClientCode, schemeCode) => {
      let body = { ClientCode, SchemeCode: schemeCode };
      getGainDetailsApi(body).then((data) => {
        if (data) {
          let { ObjectResponse = {} } = data;
          setGainDetails(ObjectResponse);
        }
      });
    },
    [getGainDetailsApi]
  );

  const getBankDetailsFunc = useCallback(
    (folioNo) => {
      let body = { FolioNo: folioNo };
      getBankDetailsApi(body).then((data) => {
        if (data) {
          let { ObjectResponse = {} } = data;
          setBankDetails(ObjectResponse);
        }
      });
    },
    [getBankDetailsApi]
  );

  useEffect(() => {
    if (investmentType === endpoints.swp) {
      setTabActiveId(2);
      setIsWithDrawalDisabled(false);
    } else {
      setTabActiveId(1);
      setIsWithDrawalDisabled(true);
    }
  }, [investmentType]);

  useEffect(() => {
    const {
      USER_DETAILS,
      USER_DETAILS_KEY,
      USER_ROLE_kEY,
      USER_ROLE_DATA,
      SELL_SWP_DETAILS,
      SELL_SWP_DETAILS_KEY,
    } = endpoints.auth;
    let sellSwpData = getDataFromStorage(
      SELL_SWP_DETAILS,
      SELL_SWP_DETAILS_KEY
    );
    let userData = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
    let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);

    if (sellSwpData && userData && userRoleData) {
      setUserRoleDetails(userRoleData);
      let client_code = userData?.UserReferralInfo?.ClientCode;
      setSellDetails(sellSwpData);
      getBankDetailsFunc(sellSwpData.FolioNo, sellSwpData.RTASchemeCode);
      setUserDetails(userData);
      getGainDetailsFunc(client_code, sellSwpData.RTASchemeCode);
      getMoreSchemeDetailsFunc(client_code, sellSwpData.RTASchemeCode);
    }
  }, [getBankDetailsFunc, getGainDetailsFunc, getMoreSchemeDetailsFunc]);

  const handleChange = ({ target }) => {
    let { name, value, type } = target;
    setErrorValidation(null);
    if (name === "Frequency_Type") {
      let selectedObj = sipDetails.find(
        (x) => x.sipSchemeDetails.SIPFREQUENCY === target.value
      );
      selectedObj &&
        setMinAmountRecurring(
          parseInt(selectedObj.sipSchemeDetails?.SIPMINIMUMINSTALLMENTAMOUNT)
        );
    }
    errors[name] = undefined;
    setErrors({ ...errors });
    if (type === "checkbox") {
      setFormDetails({ ...formDetails, [name]: value ? "Y" : "N" });
    } else {
      setFormDetails({ ...formDetails, [name]: value });
    }
  };

  // handle Tab Change
  const handleChangeTabId = (id) => {
    if (id === 1) {
      setIsOneTimeDisabled(false);
      setIsWithDrawalDisabled(true);
    } else {
      setIsOneTimeDisabled(true);
      setIsWithDrawalDisabled(false);
    }
    setErrorValidation(null);
    setErrors({});
    setTabActiveId(id);
  };

  // handle Change Radio
  const handleChangeRadio = ({ target: { value } }, name) => {
    if (name === "OneTimeRadioBtn") {
      if (value === endpoints.allUnits) {
        formDetails.Amount = sellDetails.Units;
      } else {
        formDetails.Amount = "";
      }
    }
    setErrors({});
    formDetails[name] = value;
    setErrorValidation(null);
    setFormDetails({ ...formDetails });
  };

  // handleSubmit
  const handleSubmit = () => {
    if (tabActiveId === 1) {
      let amountlength = formDetails.Amount.length;
      var amountinput =
        formDetails.OneTimeRadioBtn !== endpoints.allUnits && amountlength === 0
          ? `Please Enter ${formDetails.OneTimeRadioBtn}`
          : "";
      setErrors({ Amount: amountinput });
      if (formDetails.OneTimeRadioBtn === endpoints.allUnits) {
        setConfirmPopup(true);
      } else {
        if (amountinput === "") {
          handleConditionOneTime();
        }
      }
    } else {
      let validateRequiredFields = requiredFieldsSell.every((key) => {
        return formDetails[key] !== "";
      });

      if (validateRequiredFields) {
        setErrors({});
        handleConditionRecuring();
      } else {
        requiredFieldsSell.forEach((key) => {
          if (formDetails[key] === "" || formDetails[key] === null) {
            errors[key] =
              formDetails.RecurringRadioBtn === endpoints.unit
                ? "Please enter Unit"
                : errorDetailsSell[key];
          } else {
            errors[key] = "";
          }
        });
        setErrors({ ...errors });
      }
    }
  };

  const handleConditionOneTime = () => {
    if (formDetails.OneTimeRadioBtn === endpoints.amount) {
      handleValidationCondition(
        sellDetails.CurrentTotalValue,
        formDetails.Amount,
        minAmountOneTime,
        !sellDetails?.SchemeCategoryType.includes(endpoints.liquid)
      );
    } else {
      let currentValue = 0;
      currentValue = formDetails.Amount * sellDetails.NAV;
      handleValidationCondition(
        sellDetails.CurrentTotalValue,
        currentValue,
        minAmountOneTime,
        !sellDetails?.SchemeCategoryType.includes(endpoints.liquid)
      );
    }
  };

  //handle Validation Condition
  const handleValidationCondition = (
    currentValue,
    amount,
    minValue,
    fundType
  ) => {
    if (currentValue < amount) {
      setErrorValidation(errorObj.max + currentValue);
    } else if (amount < minValue) {
      setErrorValidation(errorObj.min + minValue);
    } else if (amount > sellMaxAmount && fundType) {
      //question popup
      handleReedemptionQuestionaire();
    } else {
      // confirm popup
      setConfirmPopup(true);
    }
  };

  const handleConditionRecuring = () => {
    let { sipSchemeDetails } = selectedFreqency || {};
    let { SIPMINIMUMINSTALLMENTNUMBERS, SIPMAXIMUMINSTALLMENTNUMBERS } =
      sipSchemeDetails || {};
    if (formDetails.RecurringRadioBtn === endpoints.amount) {
      let installmentsValue = 0;
      installmentsValue =
        formDetails.NoInstallment * formDetails.RecurringAmount;
      if (formDetails.NoInstallment < SIPMINIMUMINSTALLMENTNUMBERS) {
        setErrorValidation(
          errorObj.minInstallMent + SIPMINIMUMINSTALLMENTNUMBERS
        );
      } else if (SIPMAXIMUMINSTALLMENTNUMBERS < formDetails.NoInstallment) {
        setErrorValidation(
          errorObj.maxInstallMent + SIPMAXIMUMINSTALLMENTNUMBERS
        );
      } else if (formDetails.RecurringAmount < parseInt(minAmountRecurring)) {
        setErrorValidation(errorObj.min + minAmountRecurring);
      } else if (sellDetails.CurrentTotalValue <= installmentsValue) {
        setErrorValidation(errorObj.max + sellDetails.CurrentTotalValue);
      } else {
        setConfirmPopup(true);
      }
    } else {
      let installmentsValue = 0,
        currentValue = 0;
      installmentsValue =
        formDetails.NoInstallment *
        formDetails.RecurringAmount *
        sellDetails.NAV;
      currentValue = formDetails.RecurringAmount * sellDetails.NAV;
      if (formDetails.NoInstallment < SIPMINIMUMINSTALLMENTNUMBERS) {
        setErrorValidation(
          errorObj.minInstallMent + SIPMINIMUMINSTALLMENTNUMBERS
        );
      } else if (SIPMAXIMUMINSTALLMENTNUMBERS < formDetails.NoInstallment) {
        setErrorValidation(
          errorObj.maxInstallMent + SIPMAXIMUMINSTALLMENTNUMBERS
        );
      } else if (currentValue < minAmountRecurring) {
        setErrorValidation(errorObj.max + minAmountRecurring);
      } else if (sellDetails.CurrentTotalValue <= installmentsValue) {
        setErrorValidation(errorObj.max + sellDetails.CurrentTotalValue);
      } else {
        setConfirmPopup(true);
      }
    }
  };

  //handle Reedemption Questionaire
  const handleReedemptionQuestionaire = () => {
    let { role_id, ClientCode } = userRoleDetails;
    let payload = {
      SchemeCode: sellDetails?.RTASchemeCode,
      RedemptionAmount: formDetails.Amount,
      FolioNo: sellDetails?.FolioNo,
      RoleId: role_id,
      ClientCode,
    };
    getReedemptionQuestionaireApi(payload).then(({ DataObject = [] }) => {
      if (DataObject) {
        setQuestionOptions([...DataObject]);
        setQuestionPopup(true);
      }
    });
  };

  return (
    <div className="sell-investment">
      <div className="p-3">
        <BreadCrumbs breadCrumbsList={breadCrumbsList} />
      </div>
      <div className="page-content">
        <FundDetails
          gainDetails={gainDetails}
          SchemesDetail={sellDetails}
          setInformationPopup={setInformationPopup}
          setGainIndex={setGainIndex}
          bankDetails={bankDetails}
          gainIndex={gainIndex}
          informationPopup={informationPopup}
        />
        <SellDetails
          tabActiveId={tabActiveId}
          formDetails={formDetails}
          SchemesDetail={sellDetails}
          handleChangeTabId={handleChangeTabId}
          minAmountRecurring={minAmountRecurring}
          minAmountOneTime={minAmountOneTime}
          handleChange={handleChange}
          isWithDrawalDisabled={isWithDrawalDisabled}
          isOneTimeDisabled={isOneTimeDisabled}
          handleChangeRadio={handleChangeRadio}
          errors={errors}
          sipDetails={sipDetails}
          handleSelectedFrequency={setSelectedFrequency}
        />
        {confirmPopup && (
          <ConfirmPopup
            SchemesDetail={sellDetails}
            setConfirmPopup={setConfirmPopup}
            confirmPopup={confirmPopup}
            tabActiveId={tabActiveId}
            formDetails={formDetails}
            userDetails={userDetails}
            setSuccessPopup={setSuccessPopup}
            setFailurePopup={setFailurePopup}
            setErrorMessage={setErrorMessage}
          />
        )}
        {successPopup && (
          <SuccessPopup
            SchemesDetail={sellDetails}
            successPopup={successPopup}
            tabActiveId={tabActiveId}
            formDetails={formDetails}
          />
        )}
        {failurePopup && (
          <FailurePopup
            SchemesDetail={sellDetails}
            setFailurePopup={setFailurePopup}
            formDetails={formDetails}
            failurePopup={failurePopup}
            tabActiveId={tabActiveId}
            errorMessage={errorMessage}
          />
        )}
        {questionPopup && (
          <QuestionPopup
            questionPopup={questionPopup}
            setQuestionPopup={setQuestionPopup}
            questionOptions={questionOptions}
            userRoleDetails={userRoleDetails}
            sellDetails={sellDetails}
            setConfirmPopup={setConfirmPopup}
            history={history}
          />
        )}
        <div className="submit-btn w-100 d-flex flex-column pt-5 mt-4">
          {errorValidation && <ErrorComponent message={errorValidation} />}
          <button
            className="primary-btn ms-auto"
            disabled={errorValidation}
            onClick={handleSubmit}
          >
            {Labels.sellNow}
          </button>
        </div>
      </div>
    </div>
  );
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getGainDetailsApi: getGainDetails,
      getBankDetailsApi: getBankDetails,
      getReedemptionQuestionaireApi: getReedemptionQuestionaire,
      getMoreSchemeDetailsApi: getMoreSchemeDetails,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(Sell));
