import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import {
  ForgotPassword,
  Login,
  ClientDashboard,
  BuyInvestmentNew,
  BuyInvestment,
  MutualFundPage,
  TransactionHistoryPage,
  FamilyPage,
  Sip,
  Register,
  SellPage,
  RedeemPage,
  NavHistoryPage,
  SchemeDetailsPage,
  SwitchSTP,
  OrderDetailsMainPage,
  CutOffTimesPage,
  CreateFamilyPage,
  Notifications,
  Nfo,
  ReportPage,
  ViewReportTablePage,
  ProductList,
  ClientReferPage,
  ProductForm,
  MyProfilePage,
  RiskHistoryPage,
  EditProfilePage,
  OtherInvestments,
} from "../pages/index";
import planInvestmentView from "../components/clientFlow/clientBuyInvestmentNew/planInvestmentView";
import investmentPlan from "../components/clientFlow/clientBuyInvestmentNew/investmentPlan";
import schemeDetails from "../components/clientFlow/clientBuyInvestmentNew/SchemeDetails/index";
import productCategoryView from "../components/clientFlow/clientBuyInvestmentNew/ProductInvestment/index";
import BuyPurchaseAmount from "components/clientFlow/clientBuyInvestment/PurchaseAmount/index";
import BuyPurchaseStatus from "components/clientFlow/clientBuyInvestment/PurchaseStatus";

import { NotificationContainer } from "react-notifications";
import { bindActionCreators } from "redux";
import MainLayout from "layout/MainLayout";
import { getWhiteLabelingPartnerDetails } from "redux/action/LoginAct";
import { endpoints } from "service/helpers/config";
import {
  getDataFromStorage,
  setDataFromStorage,
} from "service/helperFunctions";
import investmentStatus from "components/clientFlow/clientBuyInvestmentNew/investmentStatus";
import BankMandate from "components/clientFlow/BankMandate";

const Routes = (props) => {
  let routes = [],
    redirectPath = "/dashboard",
    currentFlow = "LOGINFLOW";
  const { USER_ROLE_kEY, USER_ROLE_DATA } = endpoints.auth;
  let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
  let apploginRole;
  if (userRoleData) {
    apploginRole = userRoleData;
    let rolename = apploginRole?.rolename;
    if (rolename) {
      if (rolename === "Customer") {
        currentFlow = "CLIENTFLOW";
      } else if (rolename === "Advisor") {
        currentFlow = "RMFLOW";
      } else if (rolename === "Partner") {
        currentFlow = "PARTNERFLOW";
      }
    }
  }

  const loginFlowRoutes = [
    {
      path: "/login",
      PageComponent: Login,
      layout: "login",
    },
    {
      path: "/forgot-password",
      PageComponent: ForgotPassword,
      layout: "login",
    },
    {
      path: "/register",
      PageComponent: Register,
      layout: "login",
    },
  ];

  const clientFlowRoutes = [
    {
      path: "/dashboard",
      PageComponent: ClientDashboard,
    },
    {
      path: "/bankMandate",
      PageComponent: BankMandate,
    },
    {
      path: "/dashboard/mutual-fund",
      PageComponent: MutualFundPage,
    },
    {
      path: "/other-investments/:fundType/:productId",
      PageComponent: OtherInvestments,
    },
    {
      path: "/dashboard/mutual-fund/transaction-history",
      PageComponent: TransactionHistoryPage,
    },
    {
      path: "/buyInvestment",
      PageComponent: BuyInvestment,
    },
    {
      path: "/buyInvestmentPurchase",
      PageComponent: BuyPurchaseAmount,
    },
    {
      path: "/buyInvestmentPurchaseStatus",
      PageComponent: BuyPurchaseStatus,
    },
    {
      path: "/sip",
      PageComponent: Sip,
    },
    {
      path: "/dashboard/mutual-fund/:investmentType",
      PageComponent: SellPage,
    },
    {
      path: "/mutual-fund/nav-history",
      PageComponent: NavHistoryPage,
    },
    {
      path: "/mutual-fund/scheme-details",
      PageComponent: SchemeDetailsPage,
    },
    {
      path: "/mutual-fund/:investmentType",
      PageComponent: SwitchSTP,
    },
    {
      path: "/investment/mutual-fund/redeem",
      PageComponent: RedeemPage,
    },
    {
      path: "/order-details",
      PageComponent: OrderDetailsMainPage,
    },
    {
      path: "/order-details/cut-off-times",
      PageComponent: CutOffTimesPage,
    },
    {
      path: "/buy-investment",
      PageComponent: BuyInvestmentNew,
    },
    {
      path: "/planInvestmentView/:Id?/:NextQuestionId?/:QuestionSurveyListId?",
      PageComponent: planInvestmentView,
    },
    {
      path: "/investmentPlan/:client_code/:surveyId/:isPreviousGoal",
      PageComponent: investmentPlan,
    },
    {
      path: "/investmentStatus",
      PageComponent: investmentStatus,
    },
    {
      path: "/scheme-details/:schemeLabel",
      PageComponent: schemeDetails,
    },
    {
      path: "/buy-investment-product",
      PageComponent: productCategoryView,
    },

    {
      path: "/family",
      PageComponent: FamilyPage,
    },
    {
      path: "/notifications",
      PageComponent: Notifications,
    },
    {
      path: "/report",
      PageComponent: ReportPage,
    },
    {
      path: "/report/view-report/:reportId/:reportName",
      PageComponent: ViewReportTablePage,
    },
    {
      path: "/family/create-family",
      PageComponent: CreateFamilyPage,
    },
    {
      path: "/notifications",
      PageComponent: Notifications,
    },
    {
      path: "/nfo",
      PageComponent: Nfo,
    },
    {
      path: "/productlist/:productId/:productName",
      PageComponent: ProductList,
    },
    {
      path: "/scheme-invest/:productId/:productName/:schemeName",
      PageComponent: ProductForm,
    },
    {
      path: "/client-refer",
      PageComponent: ClientReferPage,
    },
    {
      path: "/my-profile",
      PageComponent: MyProfilePage,
    },
    {
      path: "/my-profile/risk-history",
      PageComponent: RiskHistoryPage,
    },
    {
      path: "/my-profile/edit-profile",
      PageComponent: EditProfilePage,
    },
  ];

  if (currentFlow === "LOGINFLOW") {
    routes = loginFlowRoutes.slice();
    redirectPath = "/login";
  } else if (currentFlow === "CLIENTFLOW") {
    routes = clientFlowRoutes.slice();
    redirectPath = "/dashboard";
  } else {
    routes = [...clientFlowRoutes, ...loginFlowRoutes];
  }

  const { getWhiteLabelApiCall } = props;
  useEffect(() => {
    if (window?.location?.origin !== endpoints?.auth?.LOCALHOST) {
      let query = {
        Link: window?.location?.origin,
        Code: "code",
      };
      getWhiteLabelApiCall(query).then((data) => {
        let PartnerName = data?.ObjectResponse?.PartnerName || "Nivesh";
        const linkElement = document.querySelector("link[rel=icon]");
        if (data?.ObjectResponse?.Favicon !== null) {
          linkElement.href = data?.ObjectResponse?.Favicon;
        }
        document.title = PartnerName;
        setDataFromStorage(
          PartnerName,
          endpoints?.auth?.WHITELIST_SOURCE_DATA,
          endpoints?.auth?.WHITELIST_SOURCE_KEY
        );
      });
    }
  }, [getWhiteLabelApiCall]);

  return (
    <Router>
      <div>
        <Switch>
          {routes.map(
            ({ path, PageComponent, exact = true, layout }, index) => {
              return (
                <Route path={path} exact={exact} key={"Routes_" + index}>
                  {layout === "login" ? (
                    <PageComponent
                      currentFlow={currentFlow}
                      apploginRole={apploginRole}
                    />
                  ) : (
                    <MainLayout
                      currentFlow={currentFlow}
                      apploginRole={apploginRole}
                    >
                      <PageComponent currentFlow={currentFlow} />
                    </MainLayout>
                  )}
                </Route>
              );
            }
          )}
          <Redirect to={redirectPath} />
        </Switch>
      </div>
      <NotificationContainer />
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWhiteLabelApiCall: getWhiteLabelingPartnerDetails,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Routes);
