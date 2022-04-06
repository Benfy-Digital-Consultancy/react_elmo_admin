import { loginApi } from "service/apiVariables";
import { api } from "service/api";
import { Toast } from "service/toast";
import { Login } from "service/actionType";
import {
  addQuery,
  setDataFromStorage,
  errorToast,
} from "service/helperFunctions";
import { endpoints } from "service/helpers/config";

const { code300, code400, code200 } = endpoints.status_code;
const { error_title, success_title } = endpoints.response_error_msg;

// forgot Password
export const forgotPassword = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...loginApi.forgotPasswordApi, body })
      .then((data) => {
        resolve(data);
        Toast({
          type:
            data?.response?.status_code === code400
              ? error_title
              : success_title,
          message: data?.response?.message,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const confirmOtp = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...loginApi.confirmOtp, body })
      .then((data) => {
        resolve(data);
        Toast({
          type: data?.status_code === code400 ? error_title : success_title,
          message: data?.message,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const resetPassword = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...loginApi.resetPassword, body })
      .then(({ ObjectResponse, response }) => {
        resolve(ObjectResponse);
        Toast({
          type: response?.status_code === code400 ? error_title : success_title,
          message: ObjectResponse?.message,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

// Login
export const login = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...loginApi.loginApi, body })
      .then((data) => {
        resolve(data);

        if (data?.response?.status_code === code200) {
          Toast({ type: success_title, message: success_title });

          let userDetails = {
            UserReferralInfo: data?.UserReferralInfo,
            apploginRole: data?.apploginRole,
            objClinetDetailList: data?.objClinetDetailList,
            subBrokerDetails: data?.subBrokerDetails,
          };

          let user_RoleId = userDetails?.apploginRole[0].role_id;
          if (user_RoleId === 2) {
            alert("RM FLOW");
          }
          if (user_RoleId === 3 || user_RoleId === 4) {
            alert("PARTNER FLOW");
          } else if (user_RoleId === 5) {
            const Token = data?.Token;

            const { USER_DETAILS, USER_DETAILS_KEY, TOKEN, TOKEN_KEY } =
              endpoints.auth;
            setDataFromStorage(Token, TOKEN, TOKEN_KEY);
            setDataFromStorage(userDetails, USER_DETAILS, USER_DETAILS_KEY);
          }
        }

        if (data?.response?.status_code === code300) {
          Toast({
            type: error_title,
            message: data?.response?.message,
          });
        }
      })

      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getWhiteLabelingPartnerDetails = (query) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addQuery(query, loginApi.GetWhiteLabeling);

    api({ ...loginApi.GetWhiteLabeling, query })
      .then((data) => {
        resolve(data);
        dispatch({ type: Login.getWhiteLabel, payload: data });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

// Social LoginWith Google

export const socialLogin = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...loginApi.socailLogin, body })
      .then((data) => {
        resolve(data);
        if (data.response.status_code === code200) {
          Toast({ type: success_title, message: success_title });
          let userDetails = {
            UserReferralInfo: data.UserReferralInfo,
            apploginRole: data.apploginRole,
            objClinetDetailList: data.objClinetDetailList,
            subBrokerDetails: data.subBrokerDetails,
          };
          if (userDetails.apploginRole) {
            const Token = data.Token;
            const { USER_DETAILS, USER_DETAILS_KEY, TOKEN, TOKEN_KEY } =
              endpoints.auth;

            setDataFromStorage(Token, TOKEN, TOKEN_KEY);
            setDataFromStorage(userDetails, USER_DETAILS, USER_DETAILS_KEY);
          }
          if (data.response.status_code === code300) {
            Toast({
              type: error_title,
              message: data.response.message,
            });
          }
        }
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
