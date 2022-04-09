import { createStore, applyMiddleware } from "redux";
import { reducers } from "../reducer";
import thunk from "redux-thunk";
import routers from "routes/routes";
import { Toast } from "service/toast";
import moment from "moment";

export const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument({ Toast }))
);
export const history = require("history").createBrowserHistory({});

let routerCache = {};

export const pageNavigationByName = (locationDetails) => {
  let { name: locationName, params = "", ...rest } = locationDetails;

  let pathname = "";

  let locationProps = rest || {};

  if (routerCache.hasOwnProperty(locationName)) {
    pathname = routerCache[locationName];
  } else {
    for (let i = 0; i < routers.length; i++) {
      let { name = "", childrens = [], path: parentPath } = routers[i];

      if (name === locationName) {
        pathname = parentPath;
        routerCache[locationName] = parentPath;
        break;
      } else {
        for (let j = 0; j < childrens.length; j++) {
          let { name = "", path = "" } = childrens[j];

          if (name === locationName) {
            let fullPath = `${parentPath}${path}`;
            pathname = fullPath;
            routerCache[locationName] = fullPath;
            break;
          }
        }
      }

      if (pathname) break;
    }
  }

  if (params) {
    pathname = Object.keys(params).reduce((acc, keyName) => {
      return acc.replace(`:${keyName}`, params[keyName]);
    }, pathname);
  }

  history.push({ pathname, ...locationProps });
};

export const getMonth = (month) => {
  switch (month) {
    case "Jan":
      return 0;
    case "Feb":
      return 1;
    case "Mar":
      return 2;
    case "Apr":
      return 3;
    case "May":
      return 4;
    case "Jun":
      return 5;
    case "Jul":
      return 6;
    case "Aug":
      return 7;
    case "Sep":
      return 8;
    case "Oct":
      return 9;
    case "Nov":
      return 10;
    case "Dec":
      return 11;
    default:
      return 1;
  }
};

export const dateDiff = (orderStartDate, orderEndDate = false) => {
  let finalValue;

  let currentDate = moment([
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ]);

  let startDate = moment([
    String(orderStartDate).split(",")[0].split(" ")[2],
    getMonth(String(orderStartDate).split(",")[0].split(" ")[1]),
    String(orderStartDate).split("th")[0],
  ]);

  let endDate = moment([
    String(orderEndDate).split(",")[0].split(" ")[2],
    getMonth(String(orderEndDate).split(",")[0].split(" ")[1]),
    String(orderEndDate).split("th")[0],
  ]);

  if (orderEndDate) {
    finalValue = endDate.diff(startDate, "days");
  } else {
    finalValue = currentDate.diff(startDate, "days");
  }

  return finalValue > 1 ? `${finalValue} days` : `${finalValue} day`;
};

export const isGeneralImage = (data) => {
  let urls = [];
  data.items.map((list) => {
    list.imgUrls.map((url) => {
      urls.push(url);
    });
  });
  let isGeneral = urls.some((list) => {
    return String(list).includes("General+New");
  });
  return isGeneral ? "Yes" : "No";
};
