import React, { useState, useEffect, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./Switch.scss";
import InfoIcon from "assets/images/info.svg";
import AddIcon from "assets/images/plus-circle.svg";
import minusIcon from "assets/images/minus-circle.png";
import { getSwitchDetailsAction } from "redux/action/clientFlow/MutualFundAct";
import { getMoreSchemeDetails } from "redux/action/clientFlow/SellAct";
import "antd/dist/antd.css";
import Pagination from "../../../Common/Pagination/Pagination";
import {
  decryptData,
  getDataFromStorage,
  encryptData,
  amountWithRs,
} from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";

import SwitchStpConfirmPopup from "./SwitchStpConfirmPopup";
import SuccessPopup from "components/Common/Investment/SuccessPopup";
import { OneTime } from "components/Common/OneTime";
import { useParams } from "react-router";
import FundBasicDetails from "./FundBasicDetails";
import { requiredFieldsStp } from "service/helpers/Constants";
import RecurringAmount from "./RecurringAmount";
import FailurePopup from "components/Common/Investment/FailurePopup";
import SearchInput from "components/Common/SearchInput";
import { EmptyRecord } from "components/Common/EmptyRecord";
import { PageLoader } from "components/Common/PageLoader";
import ErrorComponent from "components/Common/ErrorComponent";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { ToolTip } from "components/Common/ToolTip";

const stateData = {
  Units: "",
  Qty: "",
  Amount: "",
  Frequency_Type: "",
  MinAmount: "",
  OneTimeRadioBtn: endpoints.amount,
  NoInstallment: "",
  Installment_Date: null,
};

function SwitchStp(props) {
  const { Labels, errorText } = useLang();
  let [confirmPopup, setConfirmPopup] = useState(false);
  let [successPopup, setSuccessPopup] = useState(false);
  const [failurePopup, setFailurePopup] = useState(false);
  let [activeDropdown, setActiveDropdown] = useState("");
  const [switchDetails, setSwitchDetails] = useState([]);
  const [frequencyOptions, setFrequencyOptions] = useState([]);
  const [selectedFreqency, setSelectedFreqency] = useState(null);
  const [minAmountOneTime, setMinAmountOneTime] = useState(0);
  const [minAmountRecurring, setMinAmountRecurring] = useState(0);
  const [currentFund, setCurrentFund] = useState(null);
  const [sipDetails, setSipDetails] = useState(null);
  const [recurringDetails, setRecurringDetails] = useState(null);
  let [userDetails, setUserDetails] = useState(null);
  let [page, setPage] = useState(1);
  let [pageCount, setPageCount] = useState(endpoints.auth.pageLimit);
  let [formDetails, setFormDetails] = useState({ ...stateData });
  let [errors, setErrors] = useState({});
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredSearch, setFilteredSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorValidation, setErrorValidation] = useState(null);

  const { SCHEME_DETAILS, SCHEME_DATA } = endpoints.auth;
  const { getSwitchDetailsActionApi, getMoreSchemeDetailsApi, history } = props;
  let errorObj = { ...errorText?.oneTimeError } || {};
  let errorSTP = { ...errorText?.errorSTP } || {};
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
      label: `${investmentType === endpoints.switch
          ? `${Labels.switch} ${Labels.investment}`
          : `${Labels.stp} (${Labels.systematicTransfer})`
        }`,
    },
  ];

  const switchDetailedFunc = useCallback(
    (data) => {
      setLoading(true);
      let userRoleData = sessionStorage.getItem(endpoints.auth.USER_ROLE_kEY);

      if (userRoleData) {
        let userRoleDataValue = decryptData(
          userRoleData,
          endpoints.auth.USER_ROLE_DATA
        );
        let client_code = userRoleDataValue?.ClientCode;
        let body = {
          ClientCode: client_code,
          SearchText: data.AMCCode,
          TransactionTypeName:
            investmentType === endpoints.switch ? "Switch" : "Stp",
        };
        getSwitchDetailsActionApi(body)
          .then((response) => {
            setSwitchDetails(response.schemeList);
            setFilteredSearch(response.schemeList);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    },
    [getSwitchDetailsActionApi, investmentType]
  );

  const getMoreSchemeDetailsFunc = useCallback(
    (ClientCode, schemeCode) => {
      let payload = { ClientCode, SchemeCode: schemeCode };
      getMoreSchemeDetailsApi(payload).then(
        ({ SchemesDetail, sipSchemeDetailsList = [] }) => {
          if (SchemesDetail) {
            setMinAmountOneTime(SchemesDetail.MinimumPurchaseAmount);
            setRecurringDetails([...sipSchemeDetailsList]);
            let options = [];
            sipSchemeDetailsList.forEach((list) => {
              options.push({
                label: list.sipSchemeDetails.SIPFREQUENCY,
                value: list.sipSchemeDetails.SIPFREQUENCY,
              });
              if (options.length === sipSchemeDetailsList.length) {
                setFrequencyOptions([...options]);
                if (!formDetails.Frequency_Type) {
                  let selectedObj = sipSchemeDetailsList.find(
                    (x) => x.sipSchemeDetails.SIPFREQUENCY === options[0].value
                  );
                  selectedObj &&
                    setMinAmountRecurring(
                      parseInt(
                        selectedObj.sipSchemeDetails
                          ?.SIPMINIMUMINSTALLMENTAMOUNT
                      )
                    );
                  setSelectedFreqency(selectedObj);
                  setFormDetails((prevState) => ({
                    ...prevState,
                    Frequency_Type: options[0].value,
                  }));
                }
              }
            });
          }
        }
      );
    },
    [getMoreSchemeDetailsApi, formDetails]
  );

  useEffect(() => {
    const {
      SWITCH_STP_DATA,
      SWITCH_STP_DATA_KEY,
      USER_DETAILS,
      USER_DETAILS_KEY,
    } = endpoints.auth;
    let userData = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
    let switchData = getDataFromStorage(SWITCH_STP_DATA, SWITCH_STP_DATA_KEY);
    if (switchData && userData) {
      setSipDetails(switchData);
      switchDetailedFunc(switchData);
      setUserDetails(userData);
    }
  }, [switchDetailedFunc]);

  const handleProceed = (storageName, storageType, currentItem) => {
    const encryptedRoleData = encryptData(currentItem, storageType);
    sessionStorage.setItem(storageName, encryptedRoleData);
  };

  const handleChange = ({ target }) => {
    let { name, value, type } = target;
    if (name === "Frequency_Type") {
      let selectedObj = recurringDetails.find(
        (x) => x.sipSchemeDetails.SIPFREQUENCY === target.value
      );
      selectedObj &&
        setMinAmountRecurring(
          parseInt(selectedObj.sipSchemeDetails?.SIPMINIMUMINSTALLMENTAMOUNT)
        );
      setSelectedFreqency(selectedObj);
    }
    errors[name] = undefined;
    setErrors({ ...errors });
    setErrorValidation(null);
    if (type === "checkbox") {
      setFormDetails({ ...formDetails, [name]: value ? "Y" : "N" });
    } else {
      setFormDetails({ ...formDetails, [name]: value });
    }
  };

  //handle Submit
  const handleSubmitOneTime = () => {
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
  };

  const handleConditionOneTime = () => {
    if (formDetails.OneTimeRadioBtn === endpoints.amount) {
      handleValidationCondition(
        sipDetails.CurrentTotalValue,
        formDetails.Amount,
        minAmountOneTime
      );
    } else {
      let currentValue = 0;
      currentValue = formDetails.Amount * sipDetails.NAV;
      handleValidationCondition(
        sipDetails.CurrentTotalValue,
        currentValue,
        minAmountOneTime
      );
    }
  };

  //handle Validation Condition
  const handleValidationCondition = (currentValue, amount, minValue) => {
    if (currentValue < amount) {
      setErrorValidation(errorObj.max + currentValue);
    } else if (amount < minValue) {
      setErrorValidation(errorObj.min + minValue);
    } else {
      // confirm popup
      setConfirmPopup(true);
    }
  };

  // handle Change Radio
  const handleChangeRadio = ({ target: { value } }, name) => {
    if (name === "OneTimeRadioBtn") {
      if (value === endpoints.allUnits) {
        formDetails.Amount = sipDetails.Units;
      } else {
        formDetails.Amount = "";
      }
    }
    setErrors({});
    formDetails[name] = value;
    setErrorValidation(null);
    setFormDetails({ ...formDetails });
  };

  const handleSubmitRecurring = () => {
    let validateRequiredFields = requiredFieldsStp.every((key) => {
      return formDetails[key] !== "";
    });

    if (validateRequiredFields) {
      setErrors({});
      handleConditionRecuring();
    } else {
      requiredFieldsStp.forEach((key) => {
        if (formDetails[key] === "" || formDetails[key] === null) {
          errors[key] = errorSTP[key];
        } else {
          errors[key] = "";
        }
      });
      setErrors({ ...errors });
    }
  };

  const handleConditionRecuring = () => {
    let { sipSchemeDetails } = selectedFreqency || {};
    let { SIPMINIMUMINSTALLMENTNUMBERS, SIPMAXIMUMINSTALLMENTNUMBERS } =
      sipSchemeDetails || {};
    let installmentsValue = 0;
    installmentsValue = formDetails.NoInstallment * formDetails.MinAmount;
    if (formDetails.NoInstallment < SIPMINIMUMINSTALLMENTNUMBERS) {
      setErrorValidation(
        errorObj.minInstallMent + SIPMINIMUMINSTALLMENTNUMBERS
      );
    } else if (SIPMAXIMUMINSTALLMENTNUMBERS < formDetails.NoInstallment) {
      setErrorValidation(
        errorObj.maxInstallMent + SIPMAXIMUMINSTALLMENTNUMBERS
      );
    } else if (formDetails.MinAmount < parseInt(minAmountRecurring)) {
      setErrorValidation(errorObj.min + minAmountRecurring);
    } else if (sipDetails.CurrentTotalValue <= installmentsValue) {
      setErrorValidation(errorObj.max + sipDetails.CurrentTotalValue);
    } else {
      setConfirmPopup(true);
    }
  };

  // handleToSearch
  const searchHandler = (key) => {
    setSearchInputValue(key);
    const searchFilteredData = filteredSearch.filter(({ SchemeName }) => {
      return SchemeName.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });
    setSwitchDetails(searchFilteredData);
  };

  if (loading) {
    return <PageLoader />;
  }

  const handleToggle = (item, index, currentTab) => {
    setActiveDropdown(currentTab ? "" : item?.SchemeCode + "_" + index);
    setCurrentFund(item);
    setErrors({});
    setFormDetails({ ...stateData });
    let client_code = userDetails?.UserReferralInfo?.ClientCode;
    if (activeDropdown !== item?.SchemeCode + "_" + index) {
      getMoreSchemeDetailsFunc(client_code, item.SchemeCode);
    }
  };
  return (
    <div className="switch-page">
      <div className="switch-arrow-div p-3">
        <BreadCrumbs breadCrumbsList={breadCrumbsList} />
      </div>
      <div className="page-content">
        <div className="present-header">
          {Labels.present} {Labels.investment}
        </div>
        <FundBasicDetails sipDetails={sipDetails} />
        <div className="subtitle">
          <div className="left">
            {investmentType === endpoints.switch
              ? `${Labels.switch} ${Labels.to}`
              : `${Labels.stp} (${Labels.systematicTransfer})`}
          </div>
          <div className="right">
            <SearchInput
              placeholder={`${Labels.searchBy} ${Labels.schemeName}`}
              value={searchInputValue}
              onChange={(e) => {
                searchHandler(e.target.value);
              }}
            />
          </div>
        </div>
        {switchDetails && switchDetails.length > 0 ? (
          <div>
            {switchDetails?.map((item, index) => {
              return (
                page * pageCount >= index + 1 &&
                (page - 1) * pageCount < index + 1 && (
                  <div className="dropdown-list-outer" key={index}>
                    <div
                      className={
                        "dropdown-list " +
                        (activeDropdown === item?.SchemeCode + "_" + index
                          ? "active"
                          : "")
                      }
                    >
                      <div className="dropdown-list-header">
                        <div className="left">
                          <h3>{item.SchemeName}</h3>
                          <h4>
                            <span>{item.SchemeType}</span>
                          </h4>
                        </div>

                        <div className="right">
                          <ToolTip
                            children={
                              <img
                                alt="plusMinus"
                                src={
                                  activeDropdown ===
                                    item?.SchemeCode + "_" + index
                                    ? minusIcon
                                    : AddIcon
                                }
                                onClick={() =>
                                  handleToggle(
                                    item,
                                    index,
                                    activeDropdown ===
                                    item?.SchemeCode + "_" + index
                                  )
                                }
                              />}
                            label={activeDropdown ===
                              item?.SchemeCode + "_" + index
                              ? Labels.collapse
                              : Labels.expand}
                          />
                        </div>
                      </div>

                      <div className="dropdown-list-content">
                        <div className="switch-icon-div">
                          <Link
                            onClick={() =>
                              handleProceed(SCHEME_DETAILS, SCHEME_DATA, item)
                            }
                            to={"/mutual-fund/scheme-details"}
                          >
                            <ToolTip
                              children={
                                <img alt="info" src={InfoIcon} />
                              }
                              label={Labels.schemeDetails}
                            />
                          </Link>
                        </div>
                        <div className="stp-nav">
                          {Labels.latestNav} :{" "}
                          <span>{amountWithRs(item.NAV_Value)}</span>
                        </div>

                        {currentFund ? (
                          <div>
                            {investmentType === endpoints.switch ? (
                              <div className="row">
                                <div className="col-6">
                                  <OneTime
                                    minAmountOneTime={minAmountOneTime}
                                    details={formDetails}
                                    handleChange={handleChange}
                                    handleChangeRadio={handleChangeRadio}
                                    SchemesDetail={sipDetails}
                                    errors={errors}
                                    isSwitch={true}
                                  />
                                </div>
                              </div>
                            ) : (
                              <RecurringAmount
                                frequencyOptions={frequencyOptions}
                                selectedFreqency={selectedFreqency}
                                details={formDetails}
                                minAmountRecurring={minAmountRecurring}
                                handleChange={handleChange}
                                errors={errors}
                                sipDetails={sipDetails}
                              />
                            )}
                            <div className="mt-3">
                              {errorValidation && (
                                <ErrorComponent message={errorValidation} />
                              )}
                              <button
                                className="primary-btn green"
                                disabled={errorValidation}
                                onClick={() => {
                                  investmentType === endpoints.switch
                                    ? handleSubmitOneTime()
                                    : handleSubmitRecurring();
                                }}
                              >
                                {Labels.submit}
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        ) : (
          <div>
            <EmptyRecord />
          </div>
        )}

        {confirmPopup && (
          <SwitchStpConfirmPopup
            sipDetails={sipDetails}
            formDetails={formDetails}
            setConfirmPopup={setConfirmPopup}
            currentFund={currentFund}
            confirmPopup={confirmPopup}
            setSuccessPopup={setSuccessPopup}
            setFailurePopup={setFailurePopup}
            userDetails={userDetails}
            setErrorMessage={setErrorMessage}
          />
        )}
        {failurePopup && (
          <FailurePopup
            formDetails={formDetails}
            failurePopup={failurePopup}
            setFailurePopup={setFailurePopup}
            SchemesDetail={currentFund}
            errorMessage={errorMessage}
          />
        )}
        {successPopup && (
          <SuccessPopup
            formDetails={formDetails}
            successPopup={successPopup}
            SchemesDetail={currentFund}
          />
        )}
      </div>
      {switchDetails.length > 0 && (
        <Pagination
          pageNumber={page}
          pageChange={setPage}
          handlePageSize={(limit) => {
            setPageCount(limit);
            setPage(1);
          }}
          pageSize={pageCount}
          totalPages={
            searchInputValue.length === 0
              ? switchDetails.length / pageCount
              : searchInputValue.length / pageCount
          }
        />
      )}
    </div>
  );
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSwitchDetailsActionApi: getSwitchDetailsAction,
      getMoreSchemeDetailsApi: getMoreSchemeDetails,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(SwitchStp));
