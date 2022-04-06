import { axiosInstance, logout } from "./utilities";
import { decryptData } from "./helperFunctions";
import { BASE_URL, endpoints, BASE_URL_REPORT } from "./helpers/config";
// import { getFreshTokenFunction } from "service/utilities";

//api
export const api = async function ({
  method = "get",
  api,
  body,
  status = false,
  baseURL = "normal",
}) {
  return await new Promise((resolve, reject) => {
    if (sessionStorage.getItem(endpoints.auth.TOKEN)) {
      let getToken = sessionStorage.getItem(endpoints.auth.TOKEN);
      let token = decryptData(getToken, endpoints.auth.TOKEN_KEY);
      axiosInstance.defaults.headers.common[endpoints.auth.TOKEN_CASE] = token;
    }
    axiosInstance[method](`${getServiceUrl(baseURL)}${api}`, body ? body : "")
      .then((data) => {
        resolve(statusHelper(status, data));
      })
      .catch((error) => {
        try {
          if (error.response) {
            reject(statusHelper(status, error.response));
          } else {
            reject(error);
          }
        } catch (err) {
          reject(err);
        }
      });
  });
};

//status Helper
var statusHelper = (status, data) => {
  const { code200, code650, code450, code401, code403 } = endpoints.status_code;
  let { data: responseData } = data || {};
  let { response } = responseData || {};
  if (
    data.status === code401 ||
    data.status === code403 ||
    response?.status_code === code450 ||
    response?.status_code === code650
  ) {
    logout();
  }
  // else if (response?.status_code === code650) {
  //   getFreshTokenFunction();
  // }
  if (status && response?.status_code === code200) {
    return {
      status: data.status,
      ...data.data,
    };
  } else {
    return data.data;
  }
};

//get Service Url
let getServiceUrl = (baseURL) => {
  let finalURL = "";
  if (baseURL === "normal") {
    finalURL = BASE_URL;
  } else if (BASE_URL_REPORT === "report") {
    finalURL = BASE_URL_REPORT;
  } else {
    finalURL = BASE_URL;

  }
  return finalURL;
}