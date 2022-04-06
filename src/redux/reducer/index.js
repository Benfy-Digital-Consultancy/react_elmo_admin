import { combineReducers } from "redux";
import loginFlow from "./loginFlow";
import mutualFundStore from "./clientFlow/mutualFundStore";
import dashboardStore from "./clientFlow/dashboardStore";
import orderDetailsStore from "./clientFlow/orderDetailsStore";
import familyStore from "./clientFlow/familyStore";
import reportStore from "./clientFlow/reportStore";
import myProfileStore from "./clientFlow/myProfileStore";

export const reducers = combineReducers({
  loginFlow,
  mutualFundStore,
  orderDetailsStore,
  dashboardStore,
  familyStore,
  reportStore,
  myProfileStore,
});
