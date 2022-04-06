import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import "./assets/scss/style.scss";
import { Provider } from "react-redux";
import { store } from "./service/helpers/index";
import "react-notifications/lib/notifications.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { ProvideLang } from "hooks/useLang";

ReactDOM.render(
  <ProvideLang>
    <Provider store={store}>
      <Routes />
    </Provider>
  </ProvideLang>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
