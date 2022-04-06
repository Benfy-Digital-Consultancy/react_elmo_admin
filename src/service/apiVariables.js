import { generateQuery } from "./helperFunctions";

//auth Api
export const loginApi = {
  loginApi: {
    api: "AppLogin_V2",
    method: "post",
    baseURL: "normal",
  },
  forgotPasswordApi: {
    api: "ForgotPasswordApp_V2",
    method: "post",
    baseURL: "normal",
  },
  confirmOtp: {
    api: "ConfirmOTP",
    method: "post",
    baseURL: "normal",
  },
  resetPassword: {
    api: "ResetPassword_S",
    method: "post",
    baseURL: "normal",
  },
  GetWhiteLabeling: {
    url: "GetWhiteLabelingPartnerDetails",
    method: "post",
    baseURL: "normal",
    query: {
      Link: null,
      Code: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  socailLogin: {
    api: "AppLogin_V4",
    method: "post",
    baseURL: "normal",
  },
};

export const clientFlowApi = {
  // Dashboard header profile info
  getSubBrokerDetails: {
    url: "getSubBrokerDetails_S1",
    method: "get",
    baseURL: "normal",
    query: {
      SubBrokerCode: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  getPushNotification: {
    api: "GetPushNotificationData",
    method: "post",
    baseURL: "normal",
  },
  getNotificationCount: {
    url: "GetSubBrokerAlertReminderCount",
    method: "get",
    baseURL: "normal",
    query: {
      SubBrokerCode: null,
      ClientCode: null,
      LastDateTime: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  getAllProductInvest: {
    api: "GetAllProductInvestmentDetail",
    method: "post",
    baseURL: "normal",
  },
  getClientDetail: {
    api: "GetClientDetailV2_S",
    method: "post",
    baseURL: "normal",
  },
  getSchemeDataFromProduct: {
    api: "getSchemeDataFromProduct",
    method: "post",
    baseURL: "normal",
  },

  //Mutual Funds
  getMutualFundDetails: {
    api: "getInvestmentSummaryV5",
    method: "post",
    baseURL: "normal",
  },
  otherInvestmentsDetails: {
    api: "GetOtherProductInvestment",
    method: "post",
    baseURL: "normal",
  },
  downloadRTA: {
    api: "RTASOA",
    method: "post",
    baseURL: "normal",
  },

  getFactSheetApi: {
    api: "DownloadForm",
    method: "post",
    baseURL: "normal",
  },

  getViewTransactionHistory: {
    api: "getTransactionHistory",
    method: "post",
    baseURL: "normal",
  },

  getSipDetails: {
    api: "getSipMasterByRole_V5",
    method: "post",
    baseURL: "normal",
  },

  getGoals: {
    api: "GetGoals",
    method: "post",
    baseURL: "normal",
  },

  getLinkToGoal: {
    api: "LinkToGoal",
    method: "post",
    baseURL: "normal",
  },

  //Invest Module
  buyMoreMultipleScheme: {
    api: "BuyMoreForMultipleSchemes_V1",
    method: "post",
    baseURL: "normal",
  },
  InvestmentCalculator: {
    api: "InvestmentCalculator",
    method: "post",
    baseURL: "normal",
  },
  getSchemesData: {
    api: "getSchemesData",
    method: "post",
    baseURL: "normal",
  },
  GetFilterIFSCCode: {
    url: "FilterIFSCCode",
    method: "get",
    baseURL: "normal",
    query: {
      ClientCode: null,
      MandateType: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  GetGenerateClientMandate: {
    api: "GenerateClientMandate",
    method: "post",
    baseURL: "normal",
  },

  GetFolioNumberByCCandSchemeCode: {
    api: "GetFolioNumberByCCandSchemeCode",
    method: "post",
    baseURL: "normal",
  },

  GetClientMandateList: {
    url: "GetClientMandateList",
    method: "get",
    baseURL: "normal",
    query: {
      Client_Code: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  MandateFileUpload: {
    api: "MandateFileUpload",
    method: "post",
    baseURL: "normal",
  },
  MandateFileEmail: {
    api: "MandateFileEmail",
    method: "post",
    baseURL: "normal",
  },
  GetEMandateAuthURL: {
    api: "GetEMandateAuthURL",
    method: "post",
    baseURL: "normal",
  },
  DeleteMandate: {
    api: "DeleteMandate",
    method: "post",
    baseURL: "normal",
  },
  //Invest Module
  GetQuestion: {
    api: "GetQuestion",
    method: "post",
    baseURL: "normal",
  },
  SaveQuestionSurveyList: {
    api: "SaveQuestionSurveyList",
    method: "post",
    baseURL: "normal",
  },
  OneTimeOrderTransaction: {
    api: "OneTimeOrderTransaction_V1S1",
    method: "post",
    baseURL: "normal",
  },
  SIPTransaction: {
    api: "XSIPTransaction_V1S1",
    method: "post",
    baseURL: "normal",
  },
  SpreadTransaction: {
    api: "SpreadTransaction_S1",
    method: "post",
    baseURL: "normal",
  },
  getGainDetails: {
    api: "GetCapitalGainForSell",
    method: "post",
    baseURL: "normal",
  },
  getBankDetails: {
    api: "GetInitialBankDetailsAsPerFolio",
    method: "post",
    baseURL: "normal",
  },
  getReedemptionQuestionaire: {
    api: "GetReedemptionQuestionaire",
    method: "post",
    baseURL: "normal",
  },
  GetIRDetailsForFolio: {
    api: "GetIRDetailsForFolio",
    method: "post",
    baseURL: "normal",
  },
  sellOneTimeOrderTransaction: {
    api: "OneTimeOrderTransaction_V1S1",
    method: "post",
    baseURL: "normal",
  },
  sellRecurringTransaction: {
    api: "SWPTransaction_S1",
    method: "post",
    baseURL: "normal",
  },
  saveSellQuestionaireGoal: {
    api: "SaveSellQuestionaireGoal",
    method: "post",
    baseURL: "normal",
  },
  saveCallLog: {
    api: "SaveCallLog_V2",
    method: "post",
    baseURL: "normal",
  },
  getMoreSchemeDetails: {
    api: "getBuyMoreSchemeDetailsForSTP_V1",
    method: "post",
    baseURL: "normal",
  },
  getNavHistroyDetails: {
    api: "GetNAVHistory",
    method: "post",
    baseURL: "normal",
  },
  getSchemeDetails: {
    api: "GetSchemeView",
    method: "post",
    baseURL: "normal",
  },
  getSwitchDetails: {
    api: "QuickSearch",
    method: "post",
    baseURL: "normal",
  },
  getSwitchCalc: {
    api: "SwitchTransaction_S1",
    method: "post",
    baseURL: "normal",
  },
  getStpCalc: {
    api: "STPTransaction_S1",
    method: "post",
    baseURL: "normal",
  },
  getRedeem: {
    api: "BirlaIRWithdrawalAmount_S1",
    method: "post",
    baseURL: "normal",
  },

  //Order Details
  getOrderDetails: {
    api: "getViewOrderV5",
    method: "post",
    baseURL: "normal",
  },

  generateChellan: {
    api: "GenerateChallan",
    method: "post",
    baseURL: "normal",
  },

  generateChellanDetail: {
    api: "GetChallanDetail",
    method: "post",
    baseURL: "normal",
  },

  generateChellanFromGroupId: {
    api: "GenrateChallanFromGroupId",
    method: "post",
    baseURL: "normal",
  },

  getSMS: {
    api: "SMSPaymentURL",
    method: "post",
    baseURL: "normal",
  },
  GetFamilyHeadClientList: {
    api: "GetFamilyHeadClientList",
    method: "post",
    baseURL: "normal",
  },
  getInvestmentPlanDetails: {
    api: "getInvestmentPlan",
    method: "post",
    baseURL: "normal",
  },
  getInvestmentPlanAction: {
    api: "getInvestmentPlanAction",
    method: "post",
    baseURL: "normal",
  },
  getPreviousGoals: {
    api: "GetSurveyList",
    method: "post",
    baseURL: "normal",
  },
  GetHelpContent: {
    api: "GetHelpContent",
    method: "post",
    baseURL: "normal",
  },

  // Nfo Module
  nfoGetSchemesData: {
    api: "GetNFOSchemeData",
    method: "get",
    baseURL: "normal",
  },
  getQuickOrderSchemesSearch: {
    api: "QuickOrderSchemesSearch",
    method: "post",
    baseURL: "normal",
  },
  getFamilyDetails: {
    api: "GetFamilyDashboardSummary",
    method: "post",
    baseURL: "normal",
  },
  getFamilyDetailsMember: {
    api: "GetFamilyDashboardByMembersGrid",
    method: "post",
    baseURL: "normal",
    body: {},
  },
  getFamilyDetailsSchemeGrid: {
    api: "GetFamilyDashboardBySchemeGrid",
    method: "post",
    baseURL: "normal",
    body: {},
  },

  getReportListApi: {
    api: "GetReportList_S",
    method: "post",
    baseURL: "normal",
  },
  getSchemeListFromProduct: {
    api: "GetSchemeListFromProduct",
    method: "post",
    baseURL: "normal",
  },
  getSchemeProductDetails: {
    api: "GetSchemeListFromProductDetails",
    method: "post",
    baseURL: "normal",
  },
  getInvestmentPlan: {
    api: "getInvestmentPlanAction",
    method: "post",
    baseURL: "normal",
  },
  getFinancialYear: {
    api: "GetFinancialYear_S",
    method: "post",
    baseURL: "normal",
  },
  getReportFileType: {
    api: "https://api.nivesh.com/api/GetReportFile?FileType=pdf",
    method: "post",
    baseURL: "report",
  },
  GetContentBasedReferralMapping: {
    url: "GetContentBasedReferralMapping",
    method: "get",
    baseURL: "normal",
    query: {
      uid: null,
    },
    get api() {
      return (
        this.url + generateQuery(this.query) + "&ContentBasedReferralTypeId="
      );
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  getMandateReportList: {
    api: "GetMandateReport?clientCode=8872&RoleId=5",
    method: "get",
    baseURL: "normal",
  },
  getDividendReport: {
    api: "GetDividendPaidReport",
    method: "post",
    baseURL: "normal",
  },
  getCashFlowReport: {
    api: "GetCashFlowReport",
    method: "post",
    baseURL: "normal",
  },
  GetUserReferralInfo: {
    url: "GetUserReferralInfo",
    method: "get",
    baseURL: "normal",
    query: {
      UserCode: null,
      RoleId: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  //getSurveySchemeList
  GetSurveySchemeListInfo: {
    api: "GetSurveySchemeList",
    method: "post",
    baseURL: "normal",
  },
  DownloadGoalPlanPDF: {
    url: "DownloadGoalPlanPDF",
    method: "post",
    baseURL: "normal",
    query: {
      ClientCode: null,
      SurveyId: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  GetQuestionResponse: {
    url: "GetQuestionResponseListNew",
    method: "get",
    baseURL: "normal",
    query: {
      surveyID: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  SaveGoalForFuture: {
    api: "SaveGoalForFuture",
    method: "post",
    baseURL: "normal",
  },

  //My Profile
  GetBankDetails: {
    url: "GetBankDetailsFromIFSC",
    method: "get",
    baseURL: "normal",
    query: {
      ifscCode: null,
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, payload }) {
      this.query[key] = payload;
    },
  },
  GetRiskProfile: {
    api: "GetRiskProfile",
    method: "post",
    baseURL: "normal",
  },
  PanCheck: {
    api: "PanCheck_S",
    method: "post",
    baseURL: "normal",
  },
  BankValidation: {
    api: "BankValidationAPI_S",
    method: "post",
    baseURL: "normal",
  },
  BankValidationStatus: {
    api: "Save_BankValidationStatus_S",
    method: "post",
    baseURL: "normal",
  },
  GetAllMaster: {
    api: "GetAllMaster",
    method: "get",
    baseURL: "normal",
  },
  GetStateMaster: {
    api: "GetStateMaster",
    method: "post",
    baseURL: "normal",
  },
  GetCity: {
    api: "GetCity",
    method: "post",
    baseURL: "normal",
  },
  GetClientDocumentsList: {
    api: "GetClientDocumentsList",
    method: "post",
    baseURL: "normal",
  },
  SaveClientImages: {
    api: "saveClientImagesForTiffFileV2",
    method: "post",
    baseURL: "normal",
  },
  ClientSave: {
    api: "Client_SaveV5",
    method: "post",
    baseURL: "normal",
  },
};
