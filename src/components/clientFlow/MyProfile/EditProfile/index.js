import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, useHistory } from "react-router-dom";
import moment from "moment";
import ClipBoardIcon from "assets/images/clipboard.svg";
import UserIcon from "assets/images/user.svg";
import ShieldIcon from "assets/images/shield.svg";
import {
  getPanCheckDetails,
  getBankValidationDetails,
  getBankValidationStatusDetails,
  getAllMasterDetails,
  getStateMasterDetails,
  getCityDetails,
  getClientDocumentsListDetails,
  saveClientImagesDetails,
  clientSaveDetails,
} from "redux/action/clientFlow/MyProfileAct";
import { getClientDetail } from "redux/action/clientFlow/DashboardAct";
import { COUNTRY, HOLDING_MODE } from "service/helpers/Constants";
import { endpoints } from "service/helpers/config";
import { getDataFromStorage, date } from "service/helperFunctions";
import { DatePicker, NormalCheckbox } from "components/Common";
import { PageLoader } from "components/Common/PageLoader";
import { CommonInput } from "components/Common/CommonInput";
import { CommonSelect } from "components/Common/CommonSelect";
import ErrorComponent from "components/Common/ErrorComponent";
import { NormalRadioButton } from "components/Common/NormalRadioButton";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { useLang } from "hooks/useLang";
import "./EditProfile.scss";

const EditProfile = (props) => {
  const {
    getPanCheckDetailsApi,
    getBankValidationDetailsApi,
    getBankValidationStatusDetailsApi,
    getAllMasterDetailsApi,
    getStateMasterDetailsApi,
    getClientDetailApi,
    getCityDetailsApi,
    getClientDocumentsListDetailsApi,
    saveClientImagesDetailsApi,
    clientSaveDetailsApi,
    updateClientDetail,
    kycData,
  } = props;
  let [error, setErrors] = useState({ userId: "" });
  const [accountType, setAccountType] = useState([]);
  const [incomeType, setIncomeType] = useState([]);
  const [occupationType, setOccupationType] = useState([]);
  const [sourceType, setSourceType] = useState([]);
  const [taxType, setTaxType] = useState([]);
  const [holdingType, setHoldingType] = useState([]);
  const [pepType, setPepType] = useState([]);
  const [communicationType, setCommunicationType] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [stateType, setStateType] = useState([]);
  const [cityType, setCityType] = useState([]);
  const [panCheck, setPanCheck] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [bankIndex, setBankIndex] = useState(null);
  const [bankVerify, setBankVerify] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState();
  const { Labels, errorText } = useLang();
  const history = useHistory();
  const [bankListLength, setBankListLength] = useState();
  const [applicantListLength, setapplicantListLength] = useState();
  const [minor, setMinor] = useState(false);
  const [bankList, setBankList] = useState([
    {
      default: "",
      account_number: "",
      account_type: "",
      ifsc: "",
      verified: "",
    },
  ]);
  const [applicantList, setApplicantList] = useState([
    {
      applicant_name: "",
      applicant_pan: "",
      applicant_dob: "",
      applicant_pep: "",
      applicant_occupation: "",
      applicant_wealth: "",
      applicant_income: "",
      applicant_tax: "",
    },
  ]);
  const [formDetails, setFormDetails] = useState({
    pan: "",
    email: "",
    full_name: "",
    dob: "",
    mobile: "",
    individual: "",
    gender: "",
    am: "",
    guardian_name: "",
    guardian_pan: "",
    country_birth: "",
    city_birth: "",
    country: "",
    pinCode: "",
    state: "",
    address_line1: "",
    address_line2: "",
    address_line3: "",
    city: "",
    occupation: "",
    source_wealth: "",
    income: "",
    holding_mode: "",
    nominee: "",
    holding_type: "",
    relationShip: "",
    minor: "",
    nominee_dob: "",
    guardian: "",
    communication: "",
    agree: "",
    signature_1: "",
    signature_2: "",
    signature_3: "",
  });
  const [stateCode, setStateCode] = useState(formDetails?.state);

  const breadCrumbsList = [
    {
      redirection: () => history.goBack(),
      label: Labels.myprofile,
    },
    {
      label: Labels.editProfile,
    },
  ];

  useEffect(() => {
    setLoading(true);
    getAllMasterDetailsApi()
      .then((data) => {
        let accountTypeOptions = [];
        data.AccountTypeMaster.forEach((list) => {
          accountTypeOptions.push({
            label: list.Details,
            value: list.Code,
          });
          if (accountTypeOptions.length === data.AccountTypeMaster.length)
            setAccountType([...accountTypeOptions]);
        });

        let incomeTypeOptions = [];
        data.ApplicantIncomeMaster.forEach((list) => {
          incomeTypeOptions.push({
            label: list.Income,
            value: list.Income_Code,
          });
          if (incomeTypeOptions.length === data.ApplicantIncomeMaster.length)
            setIncomeType([...incomeTypeOptions]);
        });

        let occupationTypeOptions = [];
        data.mst_Occupation.forEach((list) => {
          occupationTypeOptions.push({
            label: list.Occupation,
            value: list.Occupation_Code,
          });
          if (occupationTypeOptions.length === data.mst_Occupation.length)
            setOccupationType([...occupationTypeOptions]);
        });

        let sourceTypeOptions = [];
        data.mst_SourceOfWealth.forEach((list) => {
          sourceTypeOptions.push({
            label: list.Source,
            value: list.Source_Code,
          });
          if (sourceTypeOptions.length === data.mst_SourceOfWealth.length)
            setSourceType([...sourceTypeOptions]);
        });

        let taxTypeOptions = [];
        data.mst_TaxStatus.forEach((list) => {
          taxTypeOptions.push({
            label: list.Tax_Status,
            value: list.Tax_Code,
          });
          if (taxTypeOptions.length === data.mst_TaxStatus.length)
            setTaxType([...taxTypeOptions]);
        });

        let holdingTypeOptions = [];
        data.mst_ClientHolding.forEach((list) => {
          holdingTypeOptions.push({
            label: list.DETAILS,
            value: list.CODE,
          });
          if (holdingTypeOptions.length === data.mst_ClientHolding.length)
            setHoldingType([...holdingTypeOptions]);
        });

        let pepTypeOptions = [];
        data.mst_PEP_FLAG.forEach((list) => {
          pepTypeOptions.push({
            label: list.PEP_FLAG,
            value: list.PEP_FLAG_Value,
          });
          if (pepTypeOptions.length === data.mst_PEP_FLAG.length)
            setPepType([...pepTypeOptions]);
        });

        let communicationTypeOptions = [];
        data.mst_CommunicationCode.forEach((list) => {
          communicationTypeOptions.push({
            label: list.DETAILS,
            value: list.CODE,
          });
          if (
            communicationTypeOptions.length ===
            data.mst_CommunicationCode.length
          )
            setCommunicationType([...communicationTypeOptions]);
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [getAllMasterDetailsApi]);

  useEffect(() => {
    getStateMasterDetailsApi().then((data) => {
      setStateData(data.DataObject);
      let stateTypeOptions = [];
      data.DataObject.forEach((list) => {
        stateTypeOptions.push({
          label: list.State_Name,
          value: list.State_Code,
        });
        if (stateTypeOptions.length === data.DataObject.length)
          setStateType([...stateTypeOptions]);
      });
    });
  }, [getStateMasterDetailsApi]);

  useEffect(() => {
    for (let i = 0; i < stateData?.length; i++) {
      if (stateData[i]?.State_Code === formDetails?.state) {
        setStateCode(stateData[i]?.State_Id);
      }
    }
  }, [formDetails?.state, stateData]);

  useEffect(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    let source = getDataFromStorage(
      endpoints.auth.WHITELIST_SOURCE_DATA,
      endpoints.auth.WHITELIST_SOURCE_KEY
    );
    let body = {
      StateCode: stateCode,
      Type: "",
      ClientCode: userRoleData?.ClientCode,
      RoleID: userRoleData?.role_id,
      APIName: "",
      UID: userRoleData?.uid,
      Subbroker_Code: userRoleData?.SubBroker_Code,
      RMCode: userRoleData?.RMCode,
      HOCode: "",
      Source: source || "Nivesh.com",
      APP_Web: endpoints.auth.WEB,
    };
    getCityDetailsApi(body).then((data) => {
      let cityTypeOptions = [];
      data.DataObject.forEach((list) => {
        cityTypeOptions.push({
          label: list.city_name,
          value: list.city_id,
        });
        if (cityTypeOptions.length === data.DataObject.length)
          setCityType([...cityTypeOptions]);
      });
    });
  }, [getCityDetailsApi, stateCode]);

  useEffect(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    let body = {
      client_code: userRoleData?.ClientCode,
      sub_broker_code: userRoleData?.SubBroker_Code,
      pan_number: formDetails?.pan,
    };
    if (formDetails?.pan?.length === 10) {
      getPanCheckDetailsApi(body).then((data) => {
        setPanCheck(data?.ObjectResponse);
      });
    }
  }, [getPanCheckDetailsApi, formDetails?.pan]);

  useEffect(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    const { clientMasterMFD } = kycData || {};
    let body = {
      Name: userRoleData?.name,
      PhoneNo: userRoleData?.Phone_Number,
      BankAccountNo: "002291600007701",
      IFSC: "YESB0000022",
      BankNo: bankIndex + 1,
      ums_id: clientMasterMFD?.ums_id,
    };
    if (
      bankList[bankIndex]?.account_number?.length > 9 &&
      bankList[bankIndex]?.account_number?.length < 17
    ) {
      getBankValidationDetailsApi(body).then((data) => {
        setBankVerify(data?.response?.message);
      });
    }
  }, [getBankValidationDetailsApi, kycData, bankIndex, bankList]);

  useEffect(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    const { clientMasterMFD } = kycData || {};
    let body = {
      ClientCode: userRoleData?.ClientCode,
      ums_id: clientMasterMFD?.ums_id
        ? clientMasterMFD?.ums_id
        : endpoints?.emptyString,
      BankNo: bankIndex + 1,
      BankAccountNo: "002291600007701",
      BankIFSC: "YESB0000022",
      NameInSystem:
        panCheck?.APP_STATUS === endpoints?.kraVerified
          ? panCheck?.APP_NAME
          : formDetails.full_name,
      NameAtBank: endpoints?.emptyString,
      ValidationFlag: 3,
    };
    if (bankVerify === endpoints?.notVerified) {
      getBankValidationStatusDetailsApi(body);
    }
  }, [
    getBankValidationStatusDetailsApi,
    kycData,
    bankVerify,
    bankIndex,
    panCheck,
    formDetails.full_name,
  ]);

  const documentList = () => {
    let body = {
      TaxStatusCode: "01",
      PanStatus: "0",
    };
    getClientDocumentsListDetailsApi(body).then((data) => {
      console.log("data", data);
    });
  };

  const imageList = () => {
    let body = {
      ClientCode: "63478",
      SubBrokerCode: "4793",
      ums_id: "a3d51b446c8b7e6e#nivesh202204041033235670",
      SignatureImage1: "",
      SignatureImage2: "",
      SignatureImage3: "",
      CheckImage: "",
      PANImage1: "",
      PANImage2: "",
      PANImage3: "",
      platform: "web",
      IsPartial: true,
    };
    saveClientImagesDetailsApi(body).then((data) => {
      console.log("data", data);
    });
  };

  useEffect(() => {
    setClientData(updateClientDetail?.ObjectResponse?.clientDetails);
    setFormDetails({
      pan: clientData?.clientMasterMFD?.CLIENT_PAN,
      email: clientData?.clientMasterMFD?.CLIENT_EMAIL,
      full_name: clientData?.clientMasterMFD?.CLIENT_APPNAME1,
      dob: date(clientData?.clientMasterMFD?.CLIENT_DOB),
      mobile: clientData?.clientMasterMFD?.CM_MOBILE,
      individual: clientData?.clientMasterMFD?.CLIENT_TAXSTATUS,
      gender: clientData?.clientMasterMFD?.CLIENT_GENDER,
      am: clientData?.clientFatcaReportUpload[0]?.PEP_FLAG,
      country_birth: clientData?.country_of_birth,
      city_birth: clientData?.city_of_birth,
      country: clientData?.clientMasterMFD?.CLIENT_COUNTRY,
      pinCode: clientData?.clientMasterMFD?.CLIENT_PINCODE,
      state: clientData?.clientMasterMFD?.CLIENT_STATE,
      address_line1: clientData?.clientMasterMFD?.CLIENT_ADD1,
      address_line2: clientData?.clientMasterMFD?.CLIENT_ADD2,
      address_line3: clientData?.clientMasterMFD?.CLIENT_ADD3,
      city: clientData?.clientMasterMFD?.CLIENT_CITY,
      occupation: clientData?.clientMasterMFD?.CLIENT_OCCUPATION_CODE,
      source_wealth: clientData?.clientFatcaReportUpload[0]?.SRCE_WEALT,
      income: parseInt(clientData?.clientFatcaReportUpload[0]?.INC_SLAB),
      holding_mode: clientData?.clientFatcaReportUpload[0]?.CLIENT_TYPE,
      nominee: clientData?.clientMasterMFD?.CLIENT_NOMINEE,
      holding_type: clientData?.clientMasterMFD?.CLIENT_HOLDING,
      relationShip: clientData?.clientMasterMFD?.CLIENT_NOMINEERELATION,
      minor: clientData?.clientMasterMFD?.Nominee1MinorFlag,
      nominee_dob: date(clientData?.clientMasterMFD?.Nominee1DOB),
      guardian: clientData?.clientMasterMFD?.CLIENT_FATHER_HUSBAND_GUARDIAN,
      communication: clientData?.clientMasterMFD?.CLIENT_COMMMODE,
      agree: "",
      signature_1: "",
    });

    setBankList([
      {
        default:
          clientData?.clientMasterMFD?.DEFAULT_BLANK_FLAG1 === endpoints?.Y
            ? true
            : false,
        account_number: clientData?.clientMasterMFD?.CLIENT_ACCNO1,
        account_type: clientData?.clientMasterMFD?.CLIENT_ACCTYPE1,
        ifsc: clientData?.clientMasterMFD?.CLIENT_NEFT_IFSCCODE1,
        verified: clientData?.clientMasterMFD?.IsValBank1,
      },
      {
        default:
          clientData?.clientMasterMFD?.DEFAULT_BLANK_FLAG2 === endpoints?.Y
            ? true
            : false,
        account_number: clientData?.clientMasterMFD?.CLIENT_ACCNO2,
        account_type: clientData?.clientMasterMFD?.CLIENT_ACCTYPE_2,
        ifsc: clientData?.clientMasterMFD?.CLIENT_NEFT_IFSCCODE2,
        verified: clientData?.clientMasterMFD?.IsValBank2,
      },
      {
        default:
          clientData?.clientMasterMFD?.DEFAULT_BLANK_FLAG3 === endpoints?.Y
            ? true
            : false,
        account_number: clientData?.clientMasterMFD?.CLIENT_ACCNO_3,
        account_type: clientData?.clientMasterMFD?.CLIENT_ACCTYPE_3,
        ifsc: clientData?.clientMasterMFD?.CLIENT_NEFT_IFSCCODE3,
        verified: clientData?.clientMasterMFD?.IsValBank3,
      },
      {
        default:
          clientData?.clientMasterMFD?.DEFAULT_BLANK_FLAG4 === endpoints?.Y
            ? true
            : false,
        account_number: clientData?.clientMasterMFD?.CLIENT_ACCNO_4,
        account_type: clientData?.clientMasterMFD?.CLIENT_ACCTYPE_4,
        ifsc: clientData?.clientMasterMFD?.CLIENTNEFT_IFSCCODE4,
        verified: clientData?.clientMasterMFD?.IsValBank4,
      },
      {
        default:
          clientData?.clientMasterMFD?.DEFAULT_BLANK_FLAG5 === endpoints?.Y
            ? true
            : false,
        account_number: clientData?.clientMasterMFD?.CLIENT_ACCNO_5,
        account_type: clientData?.clientMasterMFD?.CLIENT_ACCTYPE_5,
        ifsc: clientData?.clientMasterMFD?.CLIENTNEFT_IFSCCODE5,
        verified: clientData?.clientMasterMFD?.IsValBank5,
      },
    ]);

    setApplicantList([
      {
        applicant_name: clientData?.clientFatcaReportUpload[1]?.INV_NAME,
        applicant_pan: clientData?.clientFatcaReportUpload[1]?.PAN_RP,
        applicant_dob: clientData?.clientFatcaReportUpload[1]?.DOB,
        applicant_pep: clientData?.clientFatcaReportUpload[1]?.PEP_FLAG,
        applicant_occupation: clientData?.clientFatcaReportUpload[1]?.OCC_CODE,
        applicant_wealth: clientData?.clientFatcaReportUpload[1]?.SRCE_WEALT,
        applicant_income: parseInt(
          clientData?.clientFatcaReportUpload[1]?.INC_SLAB
        ),
        applicant_tax: clientData?.clientFatcaReportUpload[1]?.TAX_STATUS,
      },
      {
        applicant_name: clientData?.clientFatcaReportUpload[2]?.INV_NAME,
        applicant_pan: clientData?.clientFatcaReportUpload[2]?.PAN_RP,
        applicant_dob: clientData?.clientFatcaReportUpload[2]?.DOB,
        applicant_pep: clientData?.clientFatcaReportUpload[2]?.PEP_FLAG,
        applicant_occupation: clientData?.clientFatcaReportUpload[2]?.OCC_CODE,
        applicant_wealth: clientData?.clientFatcaReportUpload[2]?.SRCE_WEALT,
        applicant_income: parseInt(
          clientData?.clientFatcaReportUpload[2]?.INC_SLAB
        ),
        applicant_tax: clientData?.clientFatcaReportUpload[2]?.TAX_STATUS,
      },
    ]);
  }, [updateClientDetail, clientData]);

  useEffect(() => {
    let bankListLengthData = [
      clientData?.clientMasterMFD?.CLIENT_ACCNO1,
      clientData?.clientMasterMFD?.CLIENT_ACCNO2,
      clientData?.clientMasterMFD?.CLIENT_ACCNO_3,
      clientData?.clientMasterMFD?.CLIENT_ACCNO_4,
      clientData?.clientMasterMFD?.CLIENT_ACCNO_5,
    ];
    for (let i = 0; i <= bankListLengthData?.length; i++) {
      if (bankListLengthData[i] === "" || bankListLengthData[i] === undefined) {
        setBankListLength(i);
        bankList.length = i;
        return null;
      }
    }
  }, [clientData, bankListLength]);

  useEffect(() => {
    let applicantListLengthData = [
      clientData?.clientFatcaReportUpload[0]?.INV_NAME,
      clientData?.clientFatcaReportUpload[1]?.INV_NAME,
      clientData?.clientFatcaReportUpload[2]?.INV_NAME,
    ];
    for (let i = 0; i <= applicantListLengthData?.length; i++) {
      if (
        applicantListLengthData[i] === "" ||
        applicantListLengthData[i] === undefined
      ) {
        setapplicantListLength(i);
        applicantList.length = i;
        return null;
      }
    }
  }, [clientData, applicantListLength]);

  let handleInputChange = (e) => {
    const { name, value } = e.target || e || {};
    const tempErrors = { ...error };
    tempErrors[name] = undefined;
    setFormDetails({ ...formDetails, [name]: value });
    setErrors({ ...error, ...tempErrors });
  };

  useEffect(() => {
    var today = new Date();
    var selectedDay = new Date(formDetails?.dob);
    var day = selectedDay?.getDate();
    var month = selectedDay?.getMonth();
    var year = selectedDay?.getFullYear();
    let validate = new Date(year + 18, month - 1, day) <= today;
    if (validate === false) {
      formDetails.individual = "02";
      setMinor(true);
    } else {
      setMinor(false);
    }
  }, [formDetails]);

  useEffect(() => {
    for (let i = 0; i < bankList.length; i++) {
      if (bankList[i].default === true) {
        setActiveIndex(i);
        return null;
      }
    }
  }, [bankList]);

  const handleBankChange = (e, index) => {
    setBankIndex(index);
    const { name, value } = e.target || e || {};
    const tempErrors = { ...error };
    tempErrors[name] = undefined;
    const list = [...bankList];
    for (let i = 0; i < bankList.length; i++) {
      if (index !== activeIndex) {
        if (value === true) {
          bankList[i].default = false;
        }
      }
      bankList[index].default = true;
    }
    list[index][name] = value;
    setBankList(list);
    setErrors({ ...error, ...tempErrors });
  };

  let handleApplicantChange = (e, index) => {
    const { name, value } = e.target || e || {};
    const tempErrors = { ...error };
    tempErrors[name] = undefined;
    const list = [...applicantList];
    list[index][name] = value;
    setApplicantList(list);
    setErrors({ ...error, ...tempErrors });
  };

  const handleRemoveClick = (index, type) => {
    if (type === endpoints?.bank) {
      const bank = [...bankList];
      bank.splice(index, 1);
      setBankList(bank);
    } else if (type === endpoints?.applicant) {
      const applicant = [...applicantList];
      applicant.splice(index, 1);
      setApplicantList(applicant);
    }
  };

  const handleAddClick = (type) => {
    if (type === endpoints?.bank) {
      setBankList([
        ...bankList,
        {
          default: "",
          account_number: "",
          account_type: "",
          ifsc: "",
          verified: "",
        },
      ]);
    } else if (type === endpoints?.applicant) {
      setApplicantList([
        ...applicantList,
        {
          applicant_name: "",
          applicant_pan: "",
          applicant_dob: "",
          applicant_pep: "",
          applicant_occupation: "",
          applicant_wealth: "",
          applicant_income: "",
          applicant_tax: "",
        },
      ]);
    }
  };

  const dateRange = (current) => {
    return current > moment();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let requiredFields = [
      "pan",
      "email",
      "full_name",
      "dob",
      "mobile",
      "individual",
      "gender",
      "am",
      "country_birth",
      "city_birth",
      "country",
      "pinCode",
      "state",
      "address_line1",
      "city",
      "occupation",
      "source_wealth",
      "income",
      "holding_mode",
      "default",
      "account_number",
      "account_type",
      "ifsc",
      "nominee",
      "holding_type",
      "relationShip",
      "applicant_name",
      "applicant_pan",
      "applicant_pep",
      "applicant_occupation",
      "applicant_wealth",
      "applicant_income",
      "applicant_tax",
      "guardian",
      "communication",
      "signature_1",
      "agree",
    ];
    let validateRequiredFields = requiredFields.every((key) => {
      if (key === "email") {
        let re = /\S+@\S+\.\S+/;
        return formDetails[key] !== "" && re.test(formDetails[key]);
      }
      return formDetails[key] !== "";
    });
    if (validateRequiredFields) {
      return null;
    } else {
      requiredFields.forEach((key) => {
        if (
          formDetails[key] === endpoints?.emptyString ||
          bankList[0][key] === endpoints?.emptyString ||
          applicantList[0][key] === endpoints?.emptyString
        ) {
          error[key] = errorText?.createFamilyErrors[key];
        } else if (key === "pan") {
          var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
          var panNumber = formDetails[key];
          if (regpan.test(panNumber)) {
            error[key] = "";
          } else {
            error[key] = "Invalid Pan Number";
          }
        } else if (key === "mobile") {
          var regx = /^[6-9]\d{9}$/;
          var mobile_number = formDetails[key];
          var valid = regx.test(mobile_number);
          var mobile_length = formDetails[key].length;
          if (mobile_length === 10 && valid === false) {
            error[key] = "Invalid Mobile Number";
          } else if (mobile_length === 10 && valid === true) {
            error[key] = "";
          } else if (mobile_length < 10) {
            error[key] = "Number below 10 digits";
          }
        } else if (key === "email") {
          let re = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
          let validateEmail = re.test(formDetails[key]);
          if (validateEmail) {
            error[key] = "";
          } else {
            error[key] = "Please enter valid emial id";
          }
        } else {
          error[key] = "";
        }
      });
    }
    setErrors({ ...error });
    let body = {
      ...clientData,
      email: formDetails?.pan,
      mobile: formDetails?.mobile,
      country_of_birth: formDetails?.country_birth,
      city_of_birth: formDetails?.city_birth,
      clientMasterMFD: {
        ...clientData?.clientMasterMFD,
        CLIENT_PAN: formDetails?.pan,
        CLIENT_EMAIL: formDetails?.pan,
        CLIENT_APPNAME1: formDetails?.full_name,
        CLIENT_DOB: formDetails?.dob,
        CLIENT_TAXSTATUS: formDetails?.individual,
        CLIENT_GENDER: formDetails?.gender,
        CLIENT_COUNTRY: formDetails?.country,
        CLIENT_PINCODE: formDetails?.pinCode,
        CLIENT_STATE: formDetails?.state,
        CLIENT_ADD1: formDetails?.address_line1,
        CLIENT_ADD2: formDetails?.address_line2,
        CLIENT_ADD3: formDetails?.address_line3,
        CLIENT_CITY: formDetails?.city,
        CLIENT_OCCUPATION_CODE: formDetails?.occupation,
        CLIENT_TYPE: formDetails?.holding_mode,
        CLIENT_NOMINEE: formDetails?.nominee,
        CLIENT_NOMINEERELATION: formDetails?.relationShip,
        Nominee1MinorFlag: formDetails?.minor,
        Nominee1DOB: formDetails?.nominee_dob,
        CLIENT_FATHER_HUSBAND_GUARDIAN: formDetails?.guardian,
        CLIENT_COMMMODE: formDetails?.communication,
        CLIENT_ACCTYPE1: bankList[0]?.account_type,
        CLIENT_ACCTYPE_2:
          bankList[1]?.account_type !== undefined
            ? bankList[1]?.account_type
            : "",
        CLIENT_ACCTYPE_3:
          bankList[2]?.account_type !== undefined
            ? bankList[2]?.account_type
            : "",
        CLIENT_ACCTYPE_4:
          bankList[3]?.account_type !== undefined
            ? bankList[3]?.account_type
            : "",
        CLIENT_ACCTYPE_5:
          bankList[4]?.account_type !== undefined
            ? bankList[4]?.account_type
            : "",
        CLIENT_ACCNO1: bankList[0]?.account_number,
        CLIENT_ACCNO2:
          bankList[1]?.account_number !== undefined
            ? bankList[1]?.account_number
            : "",
        CLIENT_ACCNO_3:
          bankList[2]?.account_number !== undefined
            ? bankList[2]?.account_number
            : "",
        CLIENT_ACCNO_4:
          bankList[3]?.account_number !== undefined
            ? bankList[3]?.account_number
            : "",
        CLIENT_ACCNO_5:
          bankList[4]?.account_number !== undefined
            ? bankList[4]?.account_number
            : "",
        CLIENT_NEFT_IFSCCODE1: bankList[0]?.ifsc,
        CLIENT_NEFT_IFSCCODE2:
          bankList[1]?.ifsc !== undefined ? bankList[1]?.ifsc : "",
        CLIENT_NEFT_IFSCCODE3:
          bankList[2]?.ifsc !== undefined ? bankList[2]?.ifsc : "",
        CLIENTNEFT_IFSCCODE4:
          bankList[3]?.ifsc !== undefined ? bankList[3]?.ifsc : "",
        CLIENTNEFT_IFSCCODE5:
          bankList[4]?.ifsc !== undefined ? bankList[4]?.ifsc : "",
        DEFAULT_BLANK_FLAG1:
          bankList[0]?.default === true ? endpoints?.Y : endpoints?.N,
        DEFAULT_BLANK_FLAG2:
          bankList[1]?.default === true ? endpoints?.Y : endpoints?.N,
        DEFAULT_BLANK_FLAG3:
          bankList[2]?.default === true ? endpoints?.Y : endpoints?.N,
        DEFAULT_BLANK_FLAG4:
          bankList[3]?.default === true ? endpoints?.Y : endpoints?.N,
        DEFAULT_BLANK_FLAG5:
          bankList[4]?.default === true ? endpoints?.Y : endpoints?.N,
        IsValBank1: bankList[0]?.verified,
        IsValBank2:
          bankList[1]?.verified !== undefined ? bankList[1]?.verified : "",
        IsValBank3:
          bankList[2]?.verified !== undefined ? bankList[2]?.verified : "",
        IsValBank4:
          bankList[3]?.verified !== undefined ? bankList[3]?.verified : "",
        IsValBank5:
          bankList[4]?.verified !== undefined ? bankList[4]?.verified : "",
      },
      clientFatcaReportUpload: [
        {
          ...clientData?.clientFatcaReportUpload[0],
          PEP_FLAG: formDetails?.am,
          SRCE_WEALT: formDetails?.source_wealth,
          INC_SLAB: formDetails?.income,
          INV_NAME: formDetails?.full_name,
          PAN_RP: formDetails?.pan,
          DOB: formDetails?.dob,
          OCC_CODE: formDetails?.occupation,
          TAX_STATUS: formDetails?.individual,
        },
        {
          ...clientData?.clientFatcaReportUpload[1],
          PEP_FLAG: applicantList[0]?.applicant_pep,
          SRCE_WEALT: applicantList[0]?.applicant_wealth,
          INC_SLAB: applicantList[0]?.applicant_income,
          INV_NAME: applicantList[0]?.applicant_name,
          PAN_RP: applicantList[0]?.applicant_pan,
          DOB: applicantList[0]?.applicant_dob,
          OCC_CODE: applicantList[0]?.applicant_occupation,
          TAX_STATUS: applicantList[0]?.applicant_tax,
        },
        {
          ...clientData?.clientFatcaReportUpload[2],
          PEP_FLAG: applicantList[1]?.applicant_pep,
          SRCE_WEALT: applicantList[1]?.applicant_wealth,
          INC_SLAB: applicantList[1]?.applicant_income,
          INV_NAME: applicantList[1]?.applicant_name,
          PAN_RP: applicantList[1]?.applicant_pan,
          DOB: applicantList[1]?.applicant_dob,
          OCC_CODE: applicantList[1]?.applicant_occupation,
          TAX_STATUS: applicantList[1]?.applicant_tax,
        },
      ],
    };
    console.log("body", body);
    // getClientDetailApi(body);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="client-create-page" id="client-create-page-input">
      <div className="page-content">
        <div className="mb-5">
          <BreadCrumbs breadCrumbsList={breadCrumbsList} />
        </div>
        <form className="page-form">
          <div className="form-header">
            <span>
              <img alt="clipBoardIcon" src={ClipBoardIcon} />
              {Labels.KYC} {Labels.information}
            </span>
          </div>
          <div className="input-section grey-input-ui">
            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  label={Labels?.pan}
                  name="pan"
                  placeholder={Labels?.panPlaceholder}
                  value={formDetails?.pan?.toUpperCase()}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.pan && errorText?.createFamilyErrors?.pan
                  }
                />
                {formDetails?.pan?.length === 10
                  ? panCheck?.APP_STATUS === endpoints?.kraVerified
                    ? Labels?.kycVerified
                    : Labels?.kycNotVerified
                  : null}
              </div>
              <div className="col-md-6">
                <CommonInput
                  type="email"
                  label={Labels?.email}
                  name="email"
                  placeholder={Labels?.emailPlaceholder}
                  value={formDetails.email}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.email && errorText?.createFamilyErrors?.email
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  label={Labels?.fullName}
                  name="full_name"
                  placeholder={Labels?.fullNamePlaceholder}
                  value={
                    panCheck?.APP_STATUS === endpoints?.kraVerified
                      ? panCheck?.APP_NAME
                      : formDetails.full_name
                  }
                  onChange={handleInputChange}
                  readOnly={
                    panCheck?.APP_STATUS === endpoints?.kraVerified
                      ? true
                      : false
                  }
                  errorMessage={
                    error?.full_name && errorText?.createFamilyErrors?.full_name
                  }
                />
              </div>
              <div className="col-md-6">
                <DatePicker
                  label={Labels?.dob}
                  name="dob"
                  value={formDetails.dob}
                  dateFormat="dd/MM/yyyy"
                  onChange={handleInputChange}
                  selected={formDetails.dob}
                  shouldCloseOnSelect={true}
                  disabledDate={dateRange}
                  errorMessage={
                    error?.dob && errorText?.createFamilyErrors?.dob
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  label={Labels?.mobile}
                  name="mobile"
                  placeholder={Labels?.mobilePlaceholder}
                  value={formDetails.mobile}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.mobile && errorText?.createFamilyErrors?.mobile
                  }
                />
              </div>
              <div className="col-md-6">
                <CommonSelect
                  options={taxType}
                  name="individual"
                  value={formDetails.individual}
                  label={Labels?.taxStatus}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.individual &&
                    errorText?.createFamilyErrors?.individual
                  }
                />
              </div>
            </div>

            {minor === true && (
              <div className="row w-100 align-items-center">
                <div className="col-md-6">
                  <CommonInput
                    label={Labels?.guardianName}
                    name="guardian_name"
                    placeholder={Labels?.guardianNamePlaceholder}
                    value={formDetails.guardian_name}
                    onChange={handleInputChange}
                    errorMessage={
                      error?.guardian_name &&
                      errorText?.createFamilyErrors?.guardian_name
                    }
                  />
                </div>
                <div className="col-md-6">
                  <CommonInput
                    label={Labels?.guardianPan}
                    name="guardian_pan"
                    placeholder={Labels?.guardianPanPlaceholder}
                    value={formDetails.guardian_pan}
                    onChange={handleInputChange}
                    errorMessage={
                      error?.guardian_pan &&
                      errorText?.createFamilyErrors?.guardian_pan
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div className="form-header">
            <span>
              <img alt="userIcon" src={UserIcon} />
              {Labels?.personalDetails}
            </span>
          </div>
          <div className="input-section grey-input-ui">
            <div className="row w-100 align-items-center">
              <label className="side-heading">{Labels?.gender}</label>
              <div className="d-flex">
                <NormalRadioButton
                  id="gender"
                  checked={formDetails.gender === endpoints?.M}
                  onChange={() => {
                    let body = {
                      target: {
                        name: "gender",
                        value: endpoints?.M,
                      },
                    };
                    handleInputChange(body);
                  }}
                  label={Labels?.male}
                />
                <NormalRadioButton
                  id="gender"
                  checked={formDetails.gender === endpoints?.F}
                  onChange={() => {
                    let body = {
                      target: {
                        name: "gender",
                        value: endpoints?.F,
                      },
                    };
                    handleInputChange(body);
                  }}
                  label={Labels?.female}
                />
              </div>
              {error.gender && <ErrorComponent message={error.gender} />}
            </div>

            <div className="row w-100 align-items-center mt-2">
              <div className="col-md-6">
                <CommonSelect
                  options={pepType}
                  name="am"
                  value={formDetails.am}
                  label={Labels?.iAm}
                  onChange={handleInputChange}
                  errorMessage={error?.am && errorText?.createFamilyErrors?.am}
                />
              </div>
              <div className="col-md-6">
                <CommonInput
                  type="text"
                  label={Labels?.countryBirth}
                  name="country_birth"
                  placeholder={Labels?.countryBirthPlaceholder}
                  value={formDetails.country_birth}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.country_birth &&
                    errorText?.createFamilyErrors?.country_birth
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  type="text"
                  label={Labels?.cityBirth}
                  name="city_birth"
                  placeholder={Labels?.cityBirthPlaceholder}
                  value={formDetails.city_birth}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.city_birth &&
                    errorText?.createFamilyErrors?.city_birth
                  }
                />
              </div>
            </div>

            <div className="inputs-title">
              <h6>{Labels?.address}</h6>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={COUNTRY}
                  name="country"
                  value={formDetails.country}
                  label={Labels?.country}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.country && errorText?.createFamilyErrors?.country
                  }
                />
              </div>
              <div className="col-md-6">
                <CommonInput
                  type="number"
                  label={Labels?.pinCode}
                  name="pinCode"
                  placeholder={Labels?.pinCodePlaceholder}
                  value={formDetails.pinCode}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.pinCode && errorText?.createFamilyErrors?.pinCode
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={stateType}
                  name="state"
                  value={formDetails.state}
                  label={Labels?.state}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.state && errorText?.createFamilyErrors?.state
                  }
                />
              </div>
              <div className="col-md-6">
                <CommonInput
                  label={Labels?.address_line1}
                  name="address"
                  placeholder={Labels?.addressPlaceholder1}
                  value={formDetails.address_line1}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.address_line1 &&
                    errorText?.createFamilyErrors?.address_line1
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={cityType}
                  name="city"
                  value={formDetails.city}
                  label={Labels?.city}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.city && errorText?.createFamilyErrors?.city
                  }
                />
              </div>
              <div className="col-md-6">
                <CommonInput
                  label={Labels?.address_line2}
                  name="address"
                  placeholder={Labels?.addressPlaceholder2}
                  value={formDetails.address_line2}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.address_line2 &&
                    errorText?.createFamilyErrors?.address_line3
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={occupationType}
                  name="occupation"
                  value={formDetails.occupation}
                  label={Labels?.occupation}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.occupation &&
                    errorText?.createFamilyErrors?.occupation
                  }
                />
              </div>
              <div className="col-md-6">
                <CommonInput
                  label={Labels?.address_line3}
                  name="address"
                  placeholder={Labels?.addressPlaceholder3}
                  value={formDetails.address_line3}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.address_line3 &&
                    errorText?.createFamilyErrors?.address_line3
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={incomeType}
                  name="income"
                  value={formDetails.income}
                  label={Labels?.income}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.income && errorText?.createFamilyErrors?.income
                  }
                />
              </div>
              <div className="col-md-6">
                <CommonSelect
                  options={sourceType}
                  name="source_wealth"
                  value={formDetails.source_wealth}
                  label={Labels?.sourceWealth}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.source_wealth &&
                    errorText?.createFamilyErrors?.source_wealth
                  }
                />
              </div>
            </div>

            <div className="inputs-title bank_account_border"></div>

            <div className="row w-100 align-items-center mt-3">
              <div className="col-md-6">
                <CommonSelect
                  options={HOLDING_MODE}
                  name="holding_mode"
                  value={formDetails.holding_mode}
                  label={Labels?.holdingMode}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.holding_mode &&
                    errorText?.createFamilyErrors?.holding_mode
                  }
                />
              </div>
            </div>

            <div className="inputs-title">
              <h6>{Labels?.bankAccount}</h6>
              <label className="side-heading">{Labels?.accountDetails}</label>
            </div>

            {bankList.map((item, index) => {
              if (index === 5) return null;
              return (
                <React.Fragment key={index}>
                  <div className="row w-100 align-items-center">
                    <div className="col-md-6">
                      <NormalCheckbox
                        className="custom-checkbox check-box"
                        name="default"
                        onChange={(e) => {
                          handleBankChange(e, index, item);
                          setActiveIndex(index);
                        }}
                        value={item?.default}
                        label={Labels?.markDefault}
                        checked={index === activeIndex}
                      />
                      {error?.default && (
                        <ErrorComponent message={error.default} />
                      )}
                    </div>
                    <div className="col-md-6">
                      <CommonInput
                        type="number"
                        label={Labels?.accountNo}
                        name="account_number"
                        placeholder={Labels?.accountNoPlaceholder}
                        value={item?.account_number}
                        onChange={(e) => handleBankChange(e, index, item)}
                        errorMessage={
                          error?.account_number &&
                          errorText?.createFamilyErrors?.account_number
                        }
                      />
                      {bankList[bankIndex]?.account_number?.length > 9 &&
                      bankList[bankIndex]?.account_number?.length < 17
                        ? bankVerify === endpoints?.verified
                          ? Labels?.verified
                          : Labels?.nonVerified
                        : bankList[index]?.account_number?.length > 9 &&
                          bankList[index]?.account_number?.length < 17
                        ? bankList[index]?.verified === 1
                          ? Labels?.verified
                          : Labels?.nonVerified
                        : null}
                    </div>
                  </div>

                  <div className="row w-100 align-items-end">
                    <div className="col-md-6">
                      <CommonSelect
                        label={Labels?.accountType}
                        options={accountType}
                        name="account_type"
                        value={item?.account_type}
                        onChange={(e) => handleBankChange(e, index, item)}
                        errorMessage={
                          error?.account_type &&
                          errorText?.createFamilyErrors?.account_type
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <CommonInput
                        label={Labels?.IFSC}
                        name="ifsc"
                        placeholder={Labels?.ifscPlaceholder}
                        value={item?.ifsc}
                        onChange={(e) => handleBankChange(e, index, item)}
                        errorMessage={
                          error?.ifsc && errorText?.createFamilyErrors?.ifsc
                        }
                      />
                    </div>
                  </div>

                  <div className="row w-100 align-items-end">
                    <div className="col-md-6"></div>
                    <div className="col-md-6 d-flex justify-content-end">
                      {bankList.length !== 1 && (
                        <button
                          className="primary-btn flex-end"
                          onClick={() =>
                            handleRemoveClick(index, endpoints?.bank)
                          }
                        >
                          {Labels?.removeItem} {index + 1}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    {index === 4
                      ? null
                      : bankList.length - 1 === index && (
                          <div className="account-detail-button mt-3">
                            <button
                              onClick={() => {
                                handleAddClick(endpoints?.bank);
                              }}
                              className="primary-btn green bordered"
                            >
                              {Labels?.addAnotherAccount}
                            </button>
                          </div>
                        )}
                  </div>
                </React.Fragment>
              );
            })}

            <div className="w-100 bank_account_border"></div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  label={Labels?.nominee}
                  name="nominee"
                  placeholder={Labels?.nomineePlaceholder}
                  value={formDetails.nominee}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.nominee && errorText?.createFamilyErrors?.nominee
                  }
                />
              </div>
              <div className="col-md-6">
                <CommonSelect
                  options={holdingType}
                  name="holding_type"
                  value={formDetails.holding_type}
                  label={Labels?.accountHoldingType}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.holding_type &&
                    errorText?.createFamilyErrors?.holding_type
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  label={Labels?.relationship}
                  name="relationShip"
                  placeholder={Labels?.relationshipPlaceholder}
                  value={formDetails.relationShip}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.relationShip &&
                    errorText?.createFamilyErrors?.relationShip
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center my-3">
              <div className="col-md-6">
                <NormalCheckbox
                  className="custom-checkbox check-box"
                  name="minor"
                  onChange={handleInputChange}
                  value={formDetails.minor}
                  label={Labels?.minor}
                  checked={formDetails.minor === endpoints?.Y}
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <DatePicker
                  label={Labels?.nomineeDOB}
                  name="nominee_dob"
                  dateFormat="dd/MM/yyyy"
                  value={formDetails.nominee_dob}
                  onChange={handleInputChange}
                  selected={formDetails.nominee_dob}
                  shouldCloseOnSelect={true}
                  disabledDate={dateRange}
                />
              </div>
              <div className="col-md-6">
                <CommonInput
                  label={Labels?.guardianName}
                  name="guardian"
                  placeholder={Labels?.namePlaceholder}
                  value={formDetails.guardian}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.guardian && errorText?.createFamilyErrors?.guardian
                  }
                />
              </div>
            </div>

            {formDetails.holding_type === endpoints?.AS &&
              applicantList.map((item, index) => {
                if (index === 2) return null;
                return (
                  <React.Fragment key={index}>
                    <h1 className="applicant-text">
                      {Labels?.applicant} {index + 2}
                    </h1>
                    <div className="row w-100 align-items-center">
                      <div className="col-md-6">
                        <CommonInput
                          label={Labels?.applicantName}
                          name="applicant_name"
                          placeholder={Labels?.applicantNamePlaceholder}
                          value={item.applicant_name}
                          onChange={(e) => handleApplicantChange(e, index)}
                          errorMessage={
                            error?.applicant_name &&
                            errorText?.createFamilyErrors?.applicant_name
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <CommonInput
                          type="text"
                          label={Labels?.pan}
                          name="applicant_pan"
                          placeholder={Labels?.panPlaceholder}
                          value={item.applicant_pan}
                          onChange={(e) => handleApplicantChange(e, index)}
                          errorMessage={
                            error?.applicant_pan &&
                            errorText?.createFamilyErrors?.applicant_pan
                          }
                        />
                      </div>
                    </div>

                    <div className="row w-100 align-items-center">
                      <div className="col-md-6">
                        <DatePicker
                          label={Labels?.applicantDOB}
                          name="applicant_dob"
                          dateFormat="dd/MM/yyyy"
                          value={item.applicant_dob}
                          onChange={(e) => handleApplicantChange(e, index)}
                          selected={item.applicant_dob}
                          shouldCloseOnSelect={true}
                          disabledDate={dateRange}
                        />
                      </div>
                      <div className="col-md-6">
                        <CommonSelect
                          options={pepType}
                          value={item.applicant_pep}
                          label={Labels?.iAm}
                          name="applicant_pep"
                          onChange={(e) => handleApplicantChange(e, index)}
                          errorMessage={
                            error?.applicant_pep &&
                            errorText?.createFamilyErrors?.applicant_pep
                          }
                        />
                      </div>
                    </div>

                    <div className="row w-100 align-items-center mt-2">
                      <div className="col-md-6">
                        <CommonSelect
                          options={occupationType}
                          value={item.applicant_occupation}
                          label={Labels?.occupation}
                          name="applicant_occupation"
                          onChange={(e) => handleApplicantChange(e, index)}
                          errorMessage={
                            error?.applicant_occupation &&
                            errorText?.createFamilyErrors?.applicant_occupation
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <CommonSelect
                          options={sourceType}
                          value={item.applicant_wealth}
                          label={Labels?.sourceWealth}
                          name="applicant_wealth"
                          onChange={(e) => handleApplicantChange(e, index)}
                          errorMessage={
                            error?.applicant_wealth &&
                            errorText?.createFamilyErrors?.applicant_wealth
                          }
                        />
                      </div>
                    </div>

                    <div className="row w-100 align-items-center mt-2">
                      <div className="col-md-6">
                        <CommonSelect
                          options={incomeType}
                          value={item.applicant_income}
                          label={Labels?.income}
                          name="applicant_income"
                          onChange={(e) => handleApplicantChange(e, index)}
                          errorMessage={
                            error?.applicant_income &&
                            errorText?.createFamilyErrors?.applicant_income
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <CommonSelect
                          options={taxType}
                          value={item.applicant_tax}
                          label={Labels?.taxStatus}
                          name="applicant_tax"
                          onChange={(e) => handleApplicantChange(e, index)}
                          errorMessage={
                            error?.applicant_tax &&
                            errorText?.createFamilyErrors?.applicant_tax
                          }
                        />
                      </div>
                    </div>

                    <div className="row w-100 align-items-end">
                      <div className="col-md-6"></div>
                      <div className="col-md-6 d-flex justify-content-end">
                        {applicantList.length !== 1 && (
                          <button
                            className="primary-btn flex-end"
                            onClick={() =>
                              handleRemoveClick(index, endpoints?.applicant)
                            }
                          >
                            {Labels?.removeApplicant} {index + 2}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      {index === 1
                        ? null
                        : applicantList.length - 1 === index && (
                            <div className="account-detail-button mt-3">
                              <button
                                onClick={() =>
                                  handleAddClick(endpoints?.applicant)
                                }
                                className="primary-btn green bordered"
                              >
                                {Labels?.addApplicant}
                              </button>
                            </div>
                          )}
                    </div>
                  </React.Fragment>
                );
              })}
          </div>

          <div className="form-header">
            <span>
              <img alt="shieldIcon" src={ShieldIcon} />
              {Labels?.documents}
            </span>
          </div>

          <div className="list-bottom-section">
            <div>
              <div className="upload-file">
                <input name="signature_1" type="file" />
                <div className="title">Signature of the member</div>
              </div>
              {error.signature_1 && (
                <ErrorComponent message={error.signature_1} />
              )}
            </div>
          </div>

          <div className="form-header">
            <span>
              <img alt="shieldIcon" src={ShieldIcon} />
              {Labels.verification}
            </span>
          </div>

          <div className="input-section grey-input-ui">
            <div className="row w-100 align-items-center">
              <label className="side-heading">
                {Labels?.communicationPreference}
              </label>
              <div className="d-flex">
                <NormalRadioButton
                  id="communication"
                  checked={formDetails.communication === endpoints?.P}
                  onChange={() => {
                    let body = {
                      target: {
                        name: "communication",
                        value: endpoints?.P,
                      },
                    };
                    handleInputChange(body);
                  }}
                  label={Labels?.physical}
                />
                <NormalRadioButton
                  id="communication"
                  checked={formDetails.communication === endpoints?.E}
                  onChange={() => {
                    let body = {
                      target: {
                        name: "communication",
                        value: endpoints?.E,
                      },
                    };
                    handleInputChange(body);
                  }}
                  label={Labels?.email}
                />
                {communicationType?.length > 2 ? (
                  <NormalRadioButton
                    id="communication"
                    checked={formDetails.communication === endpoints?.M}
                    onChange={() => {
                      let body = {
                        target: {
                          name: "communication",
                          value: endpoints?.M,
                        },
                      };
                      handleInputChange(body);
                    }}
                    label={Labels?.mobileText}
                  />
                ) : null}
              </div>
              {error.communication && (
                <ErrorComponent message={error.communication} />
              )}
            </div>

            <div className="row w-100 align-items-center my-3 mt-5">
              <div className="col-md-6">
                <NormalCheckbox
                  className="custom-checkbox check-box"
                  name="agree"
                  value={formDetails.agree}
                  onChange={handleInputChange}
                  label={Labels?.termsAndConditions}
                />
              </div>
              {error.agree && <ErrorComponent message={error.agree} />}
            </div>
          </div>

          <div className="button-section">
            <button className="primary-btn bordered grey primary-btn-fontweight">
              {Labels.cancel}
            </button>
            <button
              className="primary-btn primary-btn-fontweight"
              onClick={handleSubmit}
            >
              {Labels?.addAccount}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getPanCheckDetailsApi: getPanCheckDetails,
      getBankValidationDetailsApi: getBankValidationDetails,
      getBankValidationStatusDetailsApi: getBankValidationStatusDetails,
      getAllMasterDetailsApi: getAllMasterDetails,
      getStateMasterDetailsApi: getStateMasterDetails,
      getClientDetailApi: getClientDetail,
      getCityDetailsApi: getCityDetails,
      getClientDocumentsListDetailsApi: getClientDocumentsListDetails,
      saveClientImagesDetailsApi: saveClientImagesDetails,
      clientSaveDetailsApi: clientSaveDetails,
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    kycData: state.dashboardStore.kycList,
    updateClientDetail: state.dashboardStore.ClientDetail,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
