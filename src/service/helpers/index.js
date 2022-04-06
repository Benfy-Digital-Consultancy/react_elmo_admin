import { createStore, applyMiddleware } from "redux";
import { reducers } from "redux/reducer";
import thunk from "redux-thunk";
import { api } from "service/api";
import { Toast } from "service/toast";

//create Store
export const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument({ api, Toast }))
);

//history
export const history = require("history").createBrowserHistory();
