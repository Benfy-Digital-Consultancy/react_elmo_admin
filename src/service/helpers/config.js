export const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const BASE_URL_REPORT = process.env.REACT_APP_API_BASE_URL_REPORT;

export const endpoints = {
  auth: {
    TIME_STAMP: "time_stamp",
    TOKEN: "Token",
    IP: "ip",
    Year: "All",
    GENERATE_REPORT: "generate_report",
    WEB: "Web",
    Source: "nivesh",
    LanguageId: 1,
    pageLimit: 10,
    ISCUSTOMVALUE: "isCustomValue",
    TOKEN_CASE: "token",
    TOKEN_KEY: "TOKEN_KEY",
    USER_DETAILS_KEY: "USER_DETAILS_KEY",
    USER_DETAILS: "userDetails",
    USER_ROLE_kEY: "userRoleData",
    USER_ROLE_DATA: "USER_ROLE_DATA",
    SCHEME_DATA: "SCHEME_DATA_KEY",
    SCHEME_DETAILS: "schemeData",
    NAV_HISTORY_DATA: "NAV_HISTORY_DATA",
    NAV_HISTORY_DATA_KEY: "navHistoryData",
    SWITCH_STP_DATA: "switchStpData",
    SWITCH_STP_DATA_KEY: "SWITCH_STP_DATA_KEY",
    STP_DATA: "STP_DATA",
    STP_DATA_KEY: "STP_DATA_KEY",
    SELL_SWP_DETAILS: "sellswpData",
    SELL_SWP_DETAILS_KEY: "SELL_SWP_DATA",
    REDEEM_DETAILS: "redeemData",
    REDEEM_DETAILS_KEY: "REDEEM_DATA",
    SOCIAL_LOGIN_KEY: "SOCIAL_LOGIN_KEY",
    SOCIAL_LOGIN_DATA: "socail_login_data",
    FAMILY_DROPDOWN_KEY: "FAMILY_DROPDOWN_KEY",
    FAMILY_DROPDOWN_FLAG: "familyDropdownFlag",
    PARENT_INFO_KEY: "PARENT_ID_KEY",
    PARENT_INFO_DATA: "parentIDData",

    INVEST_DATA_KEY: "INVEST_DATA_KEY",
    INVEST_DATA: "investData",
    WHITELIST_SOURCE_KEY: "WHITELIST_SOURCE_KEY",
    WHITELIST_SOURCE_DATA: "whitelistsourcedata",
    PASSWORD: "Password",
    PASSWORD_KEY: "PASSWORD_KEY",
    SOCIAL_ID: "Social_Id",
    SOCIAL_ID_KEY: "SOCIAL_ID_KEY",
    BUY_INVESTMENT_KEY: "BUY_INVESTMENT_KEY",
    BUY_INVESTMENT_DATA: "buyInvestmentData",
    BUY_FORMDATA_KEY: "BUY_FORMDATA_KEY",
    BUY_FORMDATA_DATA: "buyFormData",
    BUY_SCHEME_KEY: "BUY_SCHEME_KEY",
    BUY_SCHEME_DATA: "buySchemeData",
    BUY_INVEST_KEY: "BUY_INVEST_KEY",
    BUY_INVEST_DATA: "buyInvest",

    chartDate: "1950-01-01",

    APIDEVICEINFO: {
      app_version: "",
      device_id: "",
      device_model: "",
      device_name: "",
      device_os_version: "",
      device_token: "",
      device_type: "Web",
      device_id_for_UMSId: "",
    },
    SOCIAL: {
      SOCIAL_LOGIN_GOOGLEID:
        "728744940192-g6gsb1jn741sk08ftu6k0410hl38qmt3.apps.googleusercontent.com",
      SOCIAL_LOGIN_FACEBOOKID: "337841031592553",
    },
    LOCALHOST: "http://localhost:3000",
    MANDATE_HELP: "https://app.nivesh.com/mandate-help",
    xlsxHeader: "https://api.nivesh.com/",
  },
  status_code: {
    code100: 100,
    code110: 110,
    code200: 200,
    code300: 300,
    code400: 400,
    code401: 401,
    code403: 403,
    code404: 404,
    code450: 450,
    code650: 650,
  },
  response_error_msg: {
    error_title: "error",
    success_title: "success",
  },
  fileDownload: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    pdf: "application/pdf",
  },
  mandate: {
    accountSelect: "Please select your preferred account",
    fileUpload: "Please Select File",
  },
  mailTo: "https://providential.in/webapi/",
  amount: "Amount",
  allUnit: "AllUnit",
  unit: "Unit",
  allUnits: "All Units",
  long: "long",
  short: "short",
  sell: "sell",
  switch: "switch",
  stp: "stp",
  swp: "swp",
  liquid: "Liquid",
  stop: "stop",
  success: "success",
  unsuccess: "unsuccess",
  Verified: "Verified",
  month: "month",
  all: "all",
  Home: "Home",
  Mandate_Type_key: "I",
  UMRN: "UMRN",
  Mandate_Id: "Mandate Id",
  mandateRegister: "MANDATE REGISTRATION DONE SUCCESSFULLY",
  mandatePhysical: "Physical Bank Mandate",
  approved: "APPROVED",
  mandateTypeKey_N: "N",
  button: "Button",
  video: "Video",
  pdf: "PDF",
  SliderTextBox: "SliderTextBox",
  RadioButtonList: "RadioButtonList",
  FreeTextBox: "FreeTextBox",
  Years: "Years",
  enter: "enter",
  number: "number",
  dateFormat: "YYYY-MM-DD",
  childEducation: "Child Education",
  login: "Login",
  username: "username",
  password: "password",
  mobile: "mobile",
  socailMobile: "socailMobile",
  selectProfile: "selectProfile",
  socailOtp: "socailOtp",
  mobileInput: "mobileInput",
  socialInput: "socialInput",
  otpInput: "otpInput",
  linkToGoal: "Link to a <GOAL>",
  Y: "Y",
  M: "M",
  N: "N",
  F: "F",
  P: "P",
  E: "E",
  AS: "AS",
  ninetyOne: "+91",
  one: "1",
  emptyDash: "-",
  comma: ", ",
  emptyString: "",
  kraVerified: "KRA Verified",
  verified: "Verified",
  notVerified: "Not Verified",
  bank: "bank",
  applicant: "applicant",
  profileObj: "profileObj",
  userInfo: "UserInfo",
  email: "email",
  referal: "referal",
  otpValue: "otpValue",
  redColorLogo: "RedColorLogo",
  dashboard: "dashboard",
  active: "active",
  family: "family",
  clientRefer: "client-refer",
  sip: "sip",
  orderDetails: "order-details",
  nfo: "nfo",
  report: "report",
  myProfile: "my-profile",
  bankMandate: "bankMandate",
  activeSIP: "ActiveSIP",
  activeClass: "ActiveClass",
  provisionalSIP: "ProvisionalSIP",
  provisionalClass: "ProvisionalClass",
  terminiated: "Terminiated",
  terminiatedClass: "TerminiatedClass",
  paused: "Paused",
  pausedClass: "PausedClass",
  suspended: "Suspended",
  suspendedClass: "SuspendedClass",
  StartDate: "StartDate",
  EndDate: "EndDate",
  blob: "blob",
  reportType: "reportType",
};
