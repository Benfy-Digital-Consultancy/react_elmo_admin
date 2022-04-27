import { createStore, applyMiddleware } from "redux";
import { reducers } from "../../reducer";
import thunk from "redux-thunk";
// import { api } from "service/api";
import logger from "redux-logger";
import { Toast } from "service/toast";

export const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument({ Toast, logger }))
);

export const history = require("history").createBrowserHistory();
