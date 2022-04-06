import moment from "moment";
import UPARROW from "assets/images/up-arrow-green.svg";
import DOWNARROW from "assets/images/downarrow-red.svg";

export { UPARROW, DOWNARROW };

export const MonthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const ImageBaseUrl = "https://app.nivesh.com/";
// Nav table header

export const NavTableHeader = [{ label: "Date" }, { label: "Nav(Rs)" }];

// mandate header

export const MandateHeader = [
  { label: "Mandate_Code" },
  { label: "Client_Code" },
  { label: "ClientName" },
  { label: "Status" },
  { label: "Remarks" },
  { label: "RMName" },
  { label: "SubBroker" },
  { label: "MandateCreationDate" },
  { label: "Amount" },
  { label: "MandateType" },
  { label: "ApproveDate" },
];

// cash flow
export const CashFlowHeader = [
  { label: "Year" },
  { label: "Month" },
  { label: "Cash Invested" },
  { label: "Investment Redeemed" },
  { label: "Net" },
  { label: "Cumulative Balance" },
  { label: "Dividend Recd" },
];

// Dividend Header

export const DividendHeader = [
  { label: "Category" },
  { label: "Total Dividend (RS.)" },
  { label: "Dividend Payout (RS.)" },
  { label: "Payout/Reinvestment(Rs.)" },
];

// scheme details
export const SchemeDetailsHeader = [
  { label: "1 Week" },
  { label: "1 Month" },
  { label: "3 Month" },
  { label: "6 Month" },
  { label: "9 Month" },
  { label: "1 Year" },
  { label: "2 Year" },
  { label: "3 Year" },
  { label: "5 Year" },
];

//sell/swp Details
export const sellSwpDetailsHeader = [
  {
    label: "One Time",
    colorActive: "#ED1F24",
    color: "#BDBDBD",
    id: 1,
    investType: "sell",
  },
  {
    label: "Recurring Withdrawal",
    colorActive: "#ED1F24",
    color: "#BDBDBD",
    id: 2,
    investType: "sellswp",
  },
];

// SIP PAUSE

export const PAUSEOPTION = [
  {
    id: 1,
    title: "stop-sip-1-month",
    active: "stop 1 Month",
    heading: "Stop SIP for 1 month",
  },
  {
    id: 2,
    title: "stop-sip-2-month",
    active: "stop 2 Month",
    heading: "Stop SIP for 2 month",
  },
  {
    id: 3,
    title: "stop-sip-3-month",
    active: "stop 3 Month",
    heading: "Stop SIP for 3 month",
  },
  {
    id: 4,
    title: "stop-sip-4-month",
    active: "stop 4 Month",
    heading: "Stop SIP for 4 month",
  },
  {
    id: 5,
    title: "stop-sip-5-month",
    active: "stop 5 Month",
    heading: "Stop SIP for 5 month",
  },
  {
    id: 6,
    title: "want-to-cancel",
    active: "cancel",
    heading: " Yes, I want to cancel",
  },
];

export const MutualFundTitles = [
  { title: "Current Investments" },
  { title: "Existed Investments" },
];

export const ActiveListTitles = [
  { title: "Active SIPs" },
  { title: "Active SWPs" },
  { title: "Active STPs" },
];

export const GoalTitles = [{ title: "Existing Goals" }, { title: "New Goals" }];

export const OrderDetailsTitles = [
  { title: "All" },
  { title: "Pending" },
  { title: "Inprogress" },
  { title: "Rejected" },
  { title: "Confirmed" },
];

export const FamilyTitles = [
  { title: "Member wise" },
  { title: "Scheme wise" },
];

export const FamilyMemberTableHeader = [
  { label: "Member \n name" },
  { label: "Investment value \n (Rs)" },
  { label: "Current value \n (Rs)" },
  { label: "Realised gain \n (Rs)" },
  { label: "Unrealised gain \n (Rs)" },
  { label: "Dividend payout \n (Rs)" },
  { label: "Total profit \n (Rs)" },
  { label: "Absolute return \n (%)" },
  { label: "Annualised Return \n (%)" },
];

export const FamilySchemeTableHeader = [
  { label: "Scheme Name & \n Category" },
  { label: "Investment value \n (Rs)" },
  { label: "Current value \n (Rs)" },
  { label: "Realised gain \n (Rs)" },
  { label: "Unrealised gain \n (Rs)" },
  { label: "Dividend payout \n (Rs)" },
  { label: "Total profit \n (Rs)" },
  { label: "Absolute return \n (%)" },
  { label: "Annualised Return \n (%)" },
];

export const ClientReferalHeader = [
  { label: "" },
  { label: "No.of clicks" },
  { label: "No.of Transaction" },
  { label: "" },
];

export const ReferredUsersHeader = [
  { label: "Name" },
  { label: "Email" },
  { label: "Phone" },
  { label: "Created Date" },
];

export const MyProfileHeaders = [
  { title: "Accounts" },
  { title: "Bank" },
  { title: "Work & Income" },
  { title: "Risk Profile" },
];

export const RiskProfileHeader = [
  { label: "Risk Profile" },
  { label: "Review Date" },
  { label: "Asset Class" },
  { label: "Recommended" },
  { label: "Portfolio" },
];

export const RiskHistoryHeader = [
  { label: "Risk Profile" },
  { label: "Review Date" },
  { label: "Asset Class" },
  { label: "Recommended" },
];

export const ContentType = [
  { code: "P", value: "Physical" },
  { code: "E", value: "Electronic" },
  { code: "M", value: "Mobile" },
];

export const RedeemMinAmount = 100;

export const sellMaxAmount = 20000;

export const FromDate = "2021-04-21";

export const SipTotalObjectKey = [
  "sipInstallmentAmount",
  "sipDate",
  "sipAmount",
  "select_period",
  "oneTimePurChaseAmount",
];
export const SipObjectKey = [
  "sipInstallmentAmount",
  "sipDate",
  "sipAmount",
  "select_period",
];
export const SipOneTimeObjectKey = ["oneTimePurChaseAmount"];

export const SipOneTimeAndLiquidObjectKey = [
  "oneTimePurChaseAmount",
  "LiquidSellDate",
];

export const errorSTP = {
  Frequency_Type: "Please Select Frequency",
  NoInstallment: "Please Enter No of Installment",
  MinAmount: "Please Enter Amount",
  Installment_Date: "Please Select Date",
};

export const requiredFieldsStp = [
  "Frequency_Type",
  "NoInstallment",
  "MinAmount",
  "Installment_Date",
];

export const requiredFieldsSell = [
  "Frequency_Type",
  "NoInstallment",
  "RecurringAmount",
  "Installment_Date",
];

export const navChartOptions = {
  chart: { zoomType: "x" },
  title: { text: null },
  subtitle: {
    text:
      document.ontouchstart === undefined
        ? "Click and drag in the plot area to zoom in"
        : "Pinch the chart to zoom in",
  },
  xAxis: {
    title: {
      text: "Date",
      margin: 30,
      style: {
        color: "#F49D37",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: 22,
      },
    },
    labels: {
      style: {
        fontSize: 16,
        color: "#000",
        fontWeight: 600,
        lineHeight: 22,
      },
    },
    crosshair: { snap: true },
    type: "datetime",
  },
  yAxis: {
    title: {
      text: "Nav value (Rs)",
      style: {
        color: "#F49D37",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: 22,
      },
    },
    labels: {
      style: {
        fontSize: 16,
        color: "#000",
        fontWeight: 600,
        lineHeight: 22,
      },
    },
  },
  legend: { enabled: false },
  credits: { enabled: false },
  exporting: {
    buttons: {
      contextButton: {
        align: "right",
        x: -30,
        y: 0,
        verticalAlign: "top",
        theme: {
          "stroke-width": 1,
          stroke: "silver",
          r: 0,
          states: {
            hover: { fill: "#bada55" },
            select: { stroke: "#039", fill: "#bbadab" },
          },
        },
        menuItems: [
          // "printChart",
          "downloadPNG",
          "downloadPDF",
        ],
      },
    },
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, "#b7cafb"],
          [1, "#ebf1fd"],
        ],
      },
      marker: { radius: 2 },
      lineWidth: 1,
      states: { hover: { lineWidth: 1 } },
      threshold: null,
    },
  },

  tooltip: {
    background: "#FFEFDC",
    borderRadius: "2px",
    useHTML: true,
    formatter: function () {
      return (
        `<p style="margin-bottom:0;font-weight: 600; font-size: 13px; line-height: 22px; color: #828282;">${moment(
          new Date(this.x)
        ).format("DD MMM, YYYY")}</p>` +
        '<p style="margin-bottom:0;font-weight: 600; font-size: 13px; line-height: 22px; color: #000000;">' +
        "NAV  Value (Rs) : " +
        parseFloat(this.y) +
        "</p>"
      );
    },
  },
  series: [{ type: "area", color: "#2A468D", data: [] }],
};

export const createFamilyErrors = {
  pan: "Please Enter Pan",
  individual: "Please Select Individual",
  full_name: "Please Enter Name",
  email: "Please Enter Email Address",
  mobile: "Please Enter Phone Number",
  am: "Please Select am",
  pinCode: "Please Enter PinCode",
  address: "Please Enter Address",
  income: "Please Select Income",
  account_number: "Please Enter Account Number",
  ifsc: "Please Enter IFSC",
  nominee: "Please Enter Nominee",
  guardian: "Please Enter Guardian",
  dob: "Please Select Date of Birth",
  gender: "Please Select Gender",
  country_birth: "Please Select Country Birth",
  city_birth: "Please Select City Birth",
  city: "Please Select City",
  country: "Please Select Country",
  state: "Please Select State",
  occupation: "Please Select Occupation",
  source_wealth: "Please Select Source Wealth",
  holding_mode: "Please Select Holding Mode",
  default: "Please Select Default Account",
  account_type: "Please Select Account Type",
  holding_type: "Please Select Account Holding Type",
  relationShip: "Please Select RelationShip",
  applicant_name: "Please Enter Applicant Name",
  applicant_pan: "Please Enter Applicant Pan",
  applicant_pep: "Please Enter Applicant Pep Type",
  applicant_occupation: "Please Enter Applicant Occupation",
  applicant_wealth: "Please Enter Applicant Wealth",
  applicant_income: "Please Enter Applicant Income",
  applicant_tax: "Please Enter Applicant Tax Type",
  communication: "Please Select Communication",
  agree: "Please Select Terms and Condition",
  signature_1: "Please upload Member Signature",
  guardian_name: "Please Enter Guardian Name",
  guardian_pan: "Please Enter Guardian PAN",
};

export const HOLDING_TYPE = [
  {
    name: "Single",
    value: "Single",
  },
  {
    name: "Joint",
    value: "Joint",
  },
  {
    name: "Anyone or Survivor",
    value: "Anyone or Survivor",
  },
];

export const INDIVIDUAL_ARRAY = [
  {
    name: "Individual",
    value: "Individual",
  },
  {
    name: "On behalf of minor",
    value: "On behalf of minor",
  },
  {
    name: "HUF",
    value: "HUF",
  },
  {
    name: "Company",
    value: "Company",
  },
  {
    name: "AOP/BOI",
    value: "AOP/BOI",
  },
  {
    name: "Partnership firm",
    value: "Partnership firm",
  },
  {
    name: "Body corporate",
    value: "Body corporate",
  },
  {
    name: "Trust",
    value: "Trust",
  },
  {
    name: "Society",
    value: "Society",
  },
  {
    name: "Others",
    value: "Others",
  },
];

export const AM_ARRAY = [
  {
    name: "A politically exposed person",
    value: "A politically exposed person",
  },
  {
    name: "A politically not exposed person",
    value: "A politically not exposed person",
  },
  {
    name: "A relative of politically  exposed person",
    value: "A relative of politically  exposed person",
  },
];

export const INCOME_ARRAY = [
  {
    name: "Below 1 Lakh",
    value: "Below 1 Lakh",
  },
  {
    name: ">1<=5 Lacs",
    value: ">1<=5 Lacs",
  },
  {
    name: ">5<=10 Lacs",
    value: ">5<=10 Lacs",
  },
  {
    name: ">10<=25 Lacs",
    value: ">10<=25 Lacs",
  },
  {
    name: ">25<=1 Crore",
    value: ">25<=1 Crore",
  },
  {
    name: "Above 1 Crore",
    value: "Above 1 Crore",
  },
];

export const COUNTRY_BIRTH = [
  {
    name: "India",
    value: "India",
  },
];

export const CITY_BIRTH = [
  {
    name: "City 1",
    value: "City 1",
  },
  {
    name: "City 2",
    value: "City 2",
  },
];

export const CITY = [
  {
    name: "City 1",
    value: "City 1",
  },
  {
    name: "City 2",
    value: "City 2",
  },
];

export const COUNTRY = [
  {
    name: "India",
    value: "India",
  },
];

export const STATE = [
  {
    name: "State 1",
    value: "State 1",
  },
  {
    name: "State 2",
    value: "State 2",
  },
];

export const OCCUPATION = [
  {
    name: "Business",
    value: "Business",
  },
  {
    name: "Services",
    value: "Services",
  },
  {
    name: "Professional",
    value: "Professional",
  },
  {
    name: "Agriculture",
    value: "Agriculture",
  },
  {
    name: "Retired",
    value: "Retired",
  },
  {
    name: "House Wife",
    value: "House Wife",
  },
  {
    name: "Student",
    value: "Student",
  },
  {
    name: "Others",
    value: "Others",
  },
  {
    name: "Not Specified",
    value: "Not Specified",
  },
];

export const SOURCE_WEALTH = [
  {
    name: "Salary",
    value: "Salary",
  },
  {
    name: "Business Income",
    value: "Business Income",
  },
  {
    name: "Gift",
    value: "Gift",
  },
  {
    name: "Ancestral Property",
    value: "Ancestral Property",
  },
  {
    name: "Rental Income",
    value: "Rental Income",
  },
  {
    name: "Prize Money",
    value: "Prize Money",
  },
  {
    name: "Royalty",
    value: "Royalty",
  },
  {
    name: "Others",
    value: "Others",
  },
];

export const HOLDING_MODE = [
  {
    name: "P",
    value: "Physical",
  },
];

export const ACCOUNT_TYPE = [
  {
    name: "Current Bank",
    value: "Current Bank",
  },
  {
    name: "NRE Account",
    value: "NRE Account",
  },
  {
    name: "NRO Account",
    value: "NRO Account",
  },
  {
    name: "Saving Bank",
    value: "Saving Bank",
  },
];

// report view table headers
export const ViewReportIDSixEither = [
  {
    label: "Sub broker name",
  },
  {
    label: "Client name",
  },
  {
    label: "Client code",
  },
  {
    label: "Status",
  },
];

export const ViewReportIDSix = [
  {
    label: "Client name",
  },
  {
    label: "Scheme name",
  },
  {
    label: "Current NAV",
  },
  {
    label: "Current Val(Rs)",
  },
  {
    label: "Previous Unit",
  },
  {
    label: "Previous NAV",
  },
  {
    label: "Previous Val",
  },
  {
    label: "Charge",
  },
];

export const SipFormAndErrorRestConst = {
  sipFormRest: [
    {
      label: "sipDate",
      formValue: "",
    },
    {
      label: "sipDateOption",
      formValue: [],
    },
    {
      label: "select_period",
      formValue: "",
    },
    {
      label: "sipSelectPeriodOption",
      formValue: [],
    },
    {
      label: "sipAmount",
      formValue: "",
    },
    {
      label: "sipInstallmentAmount",
      formValue: "",
    },
  ],
  sipErrorRest: [
    {
      label: "sipInstallmentAmount",
      formValue: false,
    },
    {
      label: "select_period",
      formValue: false,
    },
    {
      label: "sipDate",
      formValue: false,
    },
    {
      label: "sipAmount",
      formValue: false,
    },
  ],
};

export const OneTimeFormAndErrorRestConst = {
  oneTimeFormRest: [
    {
      label: "oneTimePurChaseAmount",
      formValue: "",
    },
    {
      label: "LiquidSellCheckbox",
      formValue: false,
    },
    {
      label: "LiquidSellRadioBtn",
      formValue: "",
    },
    {
      label: "LiquidSellMinAmount",
      formValue: "",
    },
    {
      label: "LiquidSellDate",
      formValue: "",
    },
  ],
  oneTimeErrorRest: [
    {
      label: "oneTimePurChaseAmount",
      formValue: false,
    },
    {
      label: "LiquidSellMinAmount",
      formValue: false,
    },
  ],
};

export const LiquidSellCheckboxRestForm = {
  liquidOneTimeFormRest: [
    {
      label: "LiquidSellCheckbox",
      formValue: false,
    },
    {
      label: "LiquidSellRadioBtn",
      formValue: "",
    },
    {
      label: "LiquidSellMinAmount",
      formValue: "",
    },
    {
      label: "LiquidSellDate",
      formValue: "",
    },
  ],
  liquidOneTimeErrorRest: [
    {
      label: "LiquidSellMinAmount",
      formValue: false,
    },
    {
      label: "LiquidSellDate",
      formValue: false,
    },
  ],
};
