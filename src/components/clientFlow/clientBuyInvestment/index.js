import React, { useEffect, useState } from "react";
import "./style.scss";
import { withRouter } from "react-router-dom";
import { NormalButton } from "components/Common";
import {
  buyMoreMultipleScheme,
  GetClientMandateList,
  GetFolioNumberByCCandSchemeCode,
} from "redux/action/clientFlow/BuyInvestAct";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ErrorComponent from "components/Common/ErrorComponent";
import validateCustom from "./validateRules";
import InvestAccordion from "./InvestAccordion";
import { BreadCrumbs } from "components/Common/BreadCrumbs";

import {
  SipTotalObjectKey,
  SipObjectKey,
  SipOneTimeObjectKey,
  SipFormAndErrorRestConst,
  OneTimeFormAndErrorRestConst,
  LiquidSellCheckboxRestForm,
  SipOneTimeAndLiquidObjectKey,
} from "service/helpers/Constants";
import {
  getDataFromStorage,
  setDataFromStorage,
} from "service/helperFunctions";
import InvestYearsHeading from "./InvestYearsHeading";
import { endpoints } from "service/helpers/config";
import { PageLoader } from "components/Common/PageLoader";
import { useLang } from "hooks/useLang";

const ClientBuyInvestment = (props) => {
  const [formFileds, setformFileds] = useState([]);
  const [error, setErrors] = useState({});
  const { Labels, errorText } = useLang();

  //Response State
  const [buyInvest, setBuyInvest] = useState([]);
  const [buyInvestData, setBuyInvestData] = useState([]);
  const [buyMandateData, setBuyMandateData] = useState([]);
  const [peroidSipSchemeDetails, setPeroidSipSchemeDetails] = useState([]);
  const [errorFields, setErrorFields] = useState([]);
  const [mandateData, setMandateData] = useState({});

  const [userRoleData, setRoledata] = useState("");
  const [whitelistSource, setWhitelistSource] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [breadCrumbsList] = useState([
    {
      // redirection: () => history.goBack(),
      label: "Equity scheme",
    },
    {
      label: "Investments of 3-5 Years",
    },
  ]);

  let {
    buyMoreMultipleSchemeApiCall,
    GetClientMandateListApiCall,
    GetFolioNumberBySchemeCodeApiCall,
    history,
  } = props;

  const buyMoreSchemeFn = (ClientCode, role_id, uid, SchemeCode, FolioNo) => {
    return new Promise((resolve, reject) => {
      const { WHITELIST_SOURCE_KEY, WHITELIST_SOURCE_DATA } = endpoints.auth;
      let source = getDataFromStorage(
        WHITELIST_SOURCE_DATA,
        WHITELIST_SOURCE_KEY
      );
      setIsLoading(true);
      setWhitelistSource(source);
      let body = {
        ClientCode: ClientCode,
        SchemeCode: SchemeCode,
        UserRequest: {
          AppOrWeb: endpoints.auth.WEB,
          deviceInfo: endpoints.auth.APIDEVICEINFO,
          IPAddress: sessionStorage.getItem(endpoints.auth.IP),
          LoggedInRoleId: role_id,
          Source: source,
          UID: uid,
        },
      };
      buyMoreMultipleSchemeApiCall(body)
        .then((data) => {
          if (data) {
            setMandateData(data?.clientStatus);
            let checkData = buyInvest;
            checkData.push(...data?.schemeList);
            setBuyInvest([...checkData]);

            let investDataList = [];

            let investData = [];

            let errorFieldsX = [];

            let formFieldData = [];

            let formFieldFromSession = getDataFromStorage(
              endpoints.auth.BUY_FORMDATA_DATA,
              endpoints.auth.BUY_FORMDATA_KEY
            );
            let buyInvestSession = getDataFromStorage(
              endpoints.auth.BUY_INVEST_DATA,
              endpoints.auth.BUY_INVEST_KEY
            );

            if (formFieldFromSession !== null && buyInvestSession !== null) {
              // If session has values then setState existing values into form
              setformFileds([...formFieldFromSession]);
              setBuyInvest([...buyInvestSession]);
              formFieldFromSession.map(({ select_period, sip }, index) => {
                // formFields will be there but peroid(monthly or quarterly) based validations also
                // needs to be prefilled
                return (
                  sip === true &&
                  handleSelectPeriod(
                    buyInvestSession,
                    "select_period",
                    select_period,
                    index,
                    formFieldFromSession
                  )
                );
              });
            }

            data?.schemeList?.forEach(({ schemesDetail }) => {
              investData.push(schemesDetail);
              if (formFieldFromSession === null && buyInvestSession === null) {
                // If session is empty then setup empty formFields
                formFieldData.push({
                  sip: false,
                  oneTime: false,
                  sipDate: "",
                  sipDateOption: [],
                  select_period: "",
                  sipSelectPeriodOption: [],
                  sipAmount: "",
                  madateSingleList: {},
                  First_Order_Today: true,
                  sipInstallmentAmount: "",
                  oneTimePurChaseAmount: "",
                  oneTimePurChaseData: {},
                  LiquidSellCheckbox: false,
                  LiquidSellRadioBtn: "",
                  LiquidSellMinAmount: "",
                  LiquidSellDate: "",
                  FolioListArray: [],
                  FolioNo: "",
                });
                setformFileds([...formFieldData]);
                resolve(formFieldData);
              } else {
                resolve(formFieldFromSession);
              }

              //Always setUp error validations - Dont compare with session
              errorFieldsX.push({
                sipInstallmentAmount: false,
                select_period: false,
                sipDate: false,
                sipAmount: false,
                sipErrorText: false,
                oneTimePurChaseAmount: false,
                LiquidSellMinAmount: false,
                LiquidSellRadioBtn: false,
                LiquidSellDate: false,
              });
              setErrorFields(errorFieldsX);
              investDataList.push({
                ...schemesDetail,
                FolioNo: "",
                PANNo: "",
              });
              setDataFromStorage(
                investDataList,
                "folioInvestData",
                "FOLIO_INVEST_DATA"
              );

              setBuyInvestData(investDataList);
            });
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    });
  };

  // state

  console.log("formFileds" + JSON.stringify(formFileds));

  const getClientMandaeFn = (ClientCode, formValue) => {
    // formValue = formFields state
    let query = {
      Client_Code: ClientCode,
    };
    GetClientMandateListApiCall(query).then((data) => {
      setBuyMandateData(data);
      if (data?.objMandateList) {
        let formFieldsData = formValue?.map((val) => {
          return {
            ...val,
            // Adding mandateSingle Data to formFields object
            madateSingleList: data?.objMandateList[0],
          };
        });

        setformFileds([...formFieldsData]);
        setIsLoading(false);
      }
    });
  };

  //GetFolioNumberBySchemeCode static
  const GetFolioNumberBySchemeCode = (
    ClientCode,
    item,
    SchemeCode,
    values,
    index
  ) => {
    let payload = { ClientCode: ClientCode, SchemeCode: SchemeCode };
    GetFolioNumberBySchemeCodeApiCall(payload).then((data) => {
      if (data) {
        let FormDetails = values;
        FormDetails[index] = {
          ...item,
          FolioListArray: data.FolioNo,
          FolioNo: data.FolioNo[0] || "",
        };

        setformFileds([...FormDetails]);

        let updateFolioNum = getDataFromStorage(
          "folioInvestData",
          "FOLIO_INVEST_DATA"
        );
        let tempFolioArray = updateFolioNum;
        tempFolioArray.forEach((item, ix) => {
          if (item.SchemeCode === SchemeCode) {
            tempFolioArray[ix] = {
              ...tempFolioArray[ix],
              FolioNo: data.FolioNo[0],
              PANNo: "",
            };
          }
        });
        setDataFromStorage(
          tempFolioArray,
          "folioInvestData",
          "FOLIO_INVEST_DATA"
        );
        setBuyInvestData(tempFolioArray);
      }
    });
  };

  useEffect(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );

    let buyInvestmentSession = getDataFromStorage(
      endpoints.auth.BUY_INVESTMENT_DATA,
      endpoints.auth.BUY_INVESTMENT_KEY
    );

    let convertSchemeCode = buyInvestmentSession.toString();
    if (userRoleData) {
      const { ClientCode, role_id, uid } = userRoleData;
      if (buyInvestmentSession) {
        // wait for buyMoreSchemeFn function to run and set State the requirments
        // then we will get formFields in then
        Promise.all([
          buyMoreSchemeFn(ClientCode, role_id, uid, convertSchemeCode),
        ]).then(function (values) {
          // values = formFields
          getClientMandaeFn(ClientCode, values);
          values[0]?.forEach((item, index) => {
            GetFolioNumberBySchemeCode(
              ClientCode,
              item,
              buyInvestmentSession[index],
              values,
              index
            );
          });
        });
      }
      setRoledata(userRoleData);
    }
  }, []);

  //VALIDATE CHECKBOX FN
  const validateFields = (data) => {
    const fieldInvalidList = validateCustom(data, errorText);

    if (fieldInvalidList !== undefined) {
      const errors = {
        fieldInvalidList,
      };
      setErrors({ ...errors, fieldInvalidList });
    } else {
      setErrors({ ...error, fieldInvalidList: "" });
    }
    return !fieldInvalidList;
  };

  const handleChange = (e, index, selectList) => {
    const { name, value, type } = e.target || e || {};
    const tempErrors = { ...error };

    if (type === "checkbox") {
      tempErrors["fieldInvalidList"] = undefined;
      if (value) {
        handleSipFn(buyInvest, index);
      } else {
        // If sip or oneTime checkbox is false then we are clearing form values
        handleResetValue(name, index);
      }
    } else {
      tempErrors[name] = undefined;
      handleSelectPeriod(buyInvest, name, value, index, formFileds);
    }

    let formFieldsValues = formFileds;
    formFieldsValues[index][name] = value;
    setformFileds([...formFieldsValues]);

    let errorFieldsValues = errorFields;
    errorFieldsValues[index][name] = value !== "" ? false : true;
    setErrorFields(errorFieldsValues);

    // handle amount change

    if (selectList === "selectList") {
      formFieldsValues[index].madateSingleList = e;
      setformFileds(formFieldsValues);
      sipAmountValidation(formFileds[index].sipAmount, e.Amount, index);
    }

    if (selectList === "sellRadioBtn") {
      let result =
        value === endpoints.allUnit ? endpoints.allUnit : endpoints.amount;
      formFieldsValues[index]["LiquidSellRadioBtn"] = result;
      errorFieldsValues[index].LiquidSellMinAmount =
        result === endpoints.amount ? true : false;
      setErrorFields(errorFieldsValues);
      setformFileds([...formFieldsValues]);
    }
    if (selectList === "createMandateRadioBtn") {
      let result = value === "ENach" ? "ENach" : "Physical";
      formFieldsValues[index]["CreateRadioBtn"] = result;
      setformFileds([...formFieldsValues]);
    }

    if (
      mandateData.MandateStatus !== "APPROVED" &&
      name === "First_Order_Today"
    ) {
      formFieldsValues[index].First_Order_Today = true;
      formFieldsValues[index].First_Order_Today_Err = true;
      setformFileds([...formFieldsValues]);
    }

    if (name === "sipAmount") {
      sipAmountValidation(
        value,
        formFileds[index].madateSingleList?.Amount,
        index
      );
    }

    if (name === "sipInstallmentAmount" && peroidSipSchemeDetails[index]) {
      // Based on period (Monthly or Quarterly) - sipInstallmentAmoutn will change
      const { SIPMINIMUMINSTALLMENTNUMBERS, SIPMAXIMUMINSTALLMENTNUMBERS } =
        peroidSipSchemeDetails[index];
      errorFieldsValues[index][name] =
        Number(value) < Number(SIPMINIMUMINSTALLMENTNUMBERS) ||
        Number(value) > Number(SIPMAXIMUMINSTALLMENTNUMBERS)
          ? true
          : false;
      setErrorFields(errorFieldsValues);
    }

    if (name === "oneTimePurChaseAmount") {
      errorFieldsValues[index][name] =
        Number(value) <
        Number(buyInvest[index]?.schemesDetail?.MinimumPurchaseAmount)
          ? true
          : false;
      setErrorFields(errorFieldsValues);
    }
    if (name === "LiquidSellMinAmount") {
      errorFieldsValues[index][name] =
        Number(value) <
        Number(buyInvest[index]?.schemesDetail?.RedemptionAmountMinimum)
          ? true
          : false;
      setErrorFields(errorFieldsValues);
    }
    if (name === "select_period") {
      errorFieldsValues[index].sipInstallmentAmount = false;
      errorFieldsValues[index].select_period = false;
      setErrorFields(errorFieldsValues);
      setErrors({ ...error, ...tempErrors });
    }
  };

  //Reset form and errorFields Dynamically
  const restFormFieldsDynamic = (formKeys, index) => {
    let formFieldResetValue = formFileds;
    formKeys.forEach(({ label, formValue }) => {
      formFieldResetValue[index][label] = formValue;
    });
    setformFileds([...formFieldResetValue]);
  };
  const restErrorFieldsDynamic = (formKeys, index) => {
    let errorFieldsResetValue = errorFields;
    formKeys.forEach(({ label, formValue }) => {
      errorFieldsResetValue[index][label] = formValue;
    });
    setErrorFields([...errorFieldsResetValue]);
  };

  // handleResetValue
  const handleResetValue = (checkboxName, index) => {
    //Each checkbox has different set of form and errors
    if (checkboxName === "LiquidSellCheckbox") {
      // If oneTime with Liquid checkbox is false then reset that card values and errors
      const { liquidOneTimeFormRest, liquidOneTimeErrorRest } =
        LiquidSellCheckboxRestForm; // From const
      restFormFieldsDynamic(liquidOneTimeFormRest, index);
      restErrorFieldsDynamic(liquidOneTimeErrorRest, index);
    }
    if (checkboxName === "sip") {
      // If sip checkbox is false then reset that card values and errors
      const { sipFormRest, sipErrorRest } = SipFormAndErrorRestConst;
      restFormFieldsDynamic(sipFormRest, index);
      restErrorFieldsDynamic(sipErrorRest, index);
    }
    if (checkboxName === "oneTime") {
      // If oneTime checkbox is false then reset that card values and errors
      const { oneTimeFormRest, oneTimeErrorRest } =
        OneTimeFormAndErrorRestConst;
      restFormFieldsDynamic(oneTimeFormRest, index);
      restErrorFieldsDynamic(oneTimeErrorRest, index);
    }
  };

  const sipAmountValidation = (value, Amount, index) => {
    if (formFileds[index].select_period) {
      const tempErrors = { ...error };
      const { SIPMINIMUMINSTALLMENTAMOUNT = 0 } = peroidSipSchemeDetails[index];

      let ErrorResult = "";

      if (Number(value) < Number(SIPMINIMUMINSTALLMENTAMOUNT)) {
        ErrorResult = `Minimum Sip Amount is ${SIPMINIMUMINSTALLMENTAMOUNT}`;
      }
      if (Number(value) > Number(Amount)) {
        ErrorResult = `Maximum Sip Amount is ${Amount}`;
      }

      let errorFieldsValues = errorFields;
      errorFieldsValues[index]["sipErrorText"] =
        ErrorResult === "" ? false : ErrorResult;
      errorFieldsValues[index]["sipAmount"] =
        Number(value) < Number(SIPMINIMUMINSTALLMENTAMOUNT) ||
        Number(value) > Number(Amount)
          ? true
          : false;
      setErrorFields([...errorFieldsValues]);
      setErrors({ ...error, ...tempErrors });
    }
  };

  useEffect(() => {
    if (formFileds.select_period !== "") {
      // handleSelectPeriod(
      //   buyInvest,
      //   "First_Order_Today",
      //   formFileds.select_period
      // );
    }
  }, [formFileds.First_Order_Today]);

  const handleSipFn = (investList, index) => {
    if (investList !== null && investList !== undefined) {
      let frequencyList = investList[index]?.sipSchemeDetailsList;
      let optionList = [];
      frequencyList.forEach((element) => {
        let labelObj = {
          label: element.sipSchemeDetails.SIPFREQUENCY,
          value: element.sipSchemeDetails.SIPFREQUENCY,
        };
        optionList.push(labelObj);
        return optionList;
      });

      let formFieldsValues = formFileds;
      formFieldsValues[index]["sipSelectPeriodOption"] = optionList;
      setformFileds([...formFieldsValues]);
    }
  };
  const handleSelectPeriod = (
    investList,
    key,
    stateValue,
    index,
    formFiledsData
  ) => {
    // Based on period sipDateOption and sipInstallmentAmount will change
    if (key === "select_period" || key === "First_Order_Today") {
      let frequencyList = investList[index]?.sipSchemeDetailsList.find(
        (val) => val.sipSchemeDetails.SIPFREQUENCY === stateValue
      );
      let storeDate;
      frequencyList.SIPFREQUENCY.forEach((element) => {
        if (element.SIPFREQUENCY === stateValue) {
          return (storeDate =
            formFiledsData[index]?.First_Order_Today === false
              ? element?.WithoutFirstOrderSIPDates
              : element?.FirstOrderSIPDATES);
        }
      });
      let formFieldsValues = formFiledsData;
      formFieldsValues[index]["sipDateOption"] = storeDate;
      formFieldsValues[index]["sipInstallmentAmount"] =
        frequencyList.sipSchemeDetails.SIPMAXIMUMINSTALLMENTNUMBERS;
      setformFileds([...formFieldsValues]);
      let peroidSip = peroidSipSchemeDetails;
      if (peroidSip[index]) {
        peroidSip[index] = frequencyList.sipSchemeDetails;
      } else {
        peroidSip.push(frequencyList.sipSchemeDetails);
      }
      setPeroidSipSchemeDetails([...peroidSip]);
    }
  };

  ///HANDLE PROCEED
  const handleSubmit = () => {
    if (!validateFields(formFileds)) return;
    // If sip or oneTime is checked for every cards then it will proceed next step
    let formSIPOneTime = formFileds.some(
      (val) => val.sip === true && val.oneTime === true
    );

    // handleToErrorFun - To check each form fields are satisfied with validations or not
    if (formSIPOneTime) {
      let objectKeys = SipTotalObjectKey;
      handleToErrorFun(objectKeys);
    }

    if (formFileds.some((val) => val.sip === true)) {
      let objectKeys = SipObjectKey;
      handleToErrorFun(objectKeys, "sip");
    }

    if (formFileds.some((val) => val.oneTime === true)) {
      let objectKeys = SipOneTimeObjectKey;
      handleToErrorFun(objectKeys, "oneTime");
    }

    if (
      formFileds.some(
        (val) => val.oneTime === true && val.LiquidSellCheckbox === true
      )
    ) {
      let objectKeys = SipOneTimeAndLiquidObjectKey;
      handleToErrorFun(objectKeys, "oneTime");
    }

    let errorCheck = [];
    // If all the errorFields are false then we will can call submit api
    errorFields.forEach((val) => {
      errorCheck.push(
        Object.keys(val).every((secondVal) => val[secondVal] === false)
      );
    });

    let fieldInvalidList = !errorCheck.every((val) => val === true)
      ? errorText?.sip_page_error?.error_valid_data
      : "";
    const errors = {
      fieldInvalidList,
    };
    setErrors({ ...errors, fieldInvalidList });

    if (errorCheck.every((val) => val === true)) {
      let formFinalCheck = formFileds;
      // Each type has different submit apis. so we have to set which api we need to call
      // Append api call keys with formFields
      formFinalCheck.forEach(({ sip, oneTime, LiquidSellCheckbox }, index) => {
        if (sip || oneTime) {
          formFinalCheck[index]["apiCallMethod"] =
            LiquidSellCheckbox && oneTime
              ? "Spread"
              : sip && oneTime
              ? "Both"
              : sip && oneTime && LiquidSellCheckbox
              ? "All"
              : !oneTime && sip
              ? "Sip"
              : "One";
        }
      });
      setformFileds([...formFinalCheck]);
      // Before Pushing to next Route Save Datas into session
      setDataFromStorage(
        formFinalCheck,
        endpoints.auth.BUY_FORMDATA_DATA,
        endpoints.auth.BUY_FORMDATA_KEY
      );
      setDataFromStorage(
        buyInvestData,
        endpoints.auth.BUY_SCHEME_DATA,
        endpoints.auth.BUY_SCHEME_KEY
      );
      setDataFromStorage(
        buyInvest,
        endpoints.auth.BUY_INVEST_DATA,
        endpoints.auth.BUY_INVEST_KEY
      );
      // history.push("/buyInvestmentPurchase");
    }
  };

  console.log(formFileds, "errorFieldserrorFields");
  // handleToPurchaseConfirm

  const handleToErrorFun = (objectKeys, changeKey) => {
    let errorFieldsCopy = errorFields;
    for (let i = 0; i < formFileds.length; i++) {
      for (let j = 0; j < objectKeys.length; j++) {
        if (
          formFileds[i][[objectKeys[j]]] === "" &&
          formFileds[i][changeKey] === true
        ) {
          errorFieldsCopy[i][objectKeys[j]] =
            formFileds[i][objectKeys[j]] === ""
              ? true
              : errorFieldsCopy[i][objectKeys[j]];
        }
      }
    }
    setErrorFields([...errorFieldsCopy]);
  };

  const handlCancel = () => {
    history.push("/dashboard/mutual-fund");
  };

  // handleToFolioNumUpdate
  const handleToFolioNumUpdate = (val, index) => {
    console.log("val" + JSON.stringify(val));
    console.log("index" + JSON.stringify(index));

    let value = val ? val : "";

    let FormDetails = formFileds;
    FormDetails[index] = {
      ...FormDetails[index],
      FolioNo: value,
    };

    console.log("form Feilds" + JSON.stringify(FormDetails));
    setformFileds([...FormDetails]);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="scheme-details-edit">
        <div className="pb-3">
          <BreadCrumbs breadCrumbsList={breadCrumbsList} />
        </div>

        {buyInvestData?.map((val, index) => {
          return (
            <>
              <InvestYearsHeading
                handlCancel={handlCancel}
                buyInvestData={val}
                formFieldData={formFileds[index]}
                formFieldIndex={index}
                getFolioFromChild={(val, index) =>
                  handleToFolioNumUpdate(val, index)
                }
              />
              <InvestAccordion
                buyMandateData={buyMandateData}
                handleChange={handleChange}
                indexVal={index}
                formFileds={formFileds[index]}
                buyInvest={buyInvest[index]}
                mandateData={mandateData}
                peroidSipSchemeDetails={peroidSipSchemeDetails[index]}
                errorFields={errorFields[index]}
              />
            </>
          );
        })}

        <div className="continue my-3">
          <NormalButton
            label={Labels.continue}
            isPrimay={true}
            onClick={handleSubmit}
            // onClick={() => handlePurchaseAmountNavigate()}
          />
          <div className="mt-3">
            {error?.fieldInvalidList && (
              <ErrorComponent message={error.fieldInvalidList} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      buyMoreMultipleSchemeApiCall: buyMoreMultipleScheme,
      GetClientMandateListApiCall: GetClientMandateList,

      GetFolioNumberBySchemeCodeApiCall: GetFolioNumberByCCandSchemeCode,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ClientBuyInvestment));
