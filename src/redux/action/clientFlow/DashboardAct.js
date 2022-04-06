import { clientFlowApi } from "../../../service/apiVariables";
import { api } from "../../../service/api";
import { addQuery, errorToast } from "../../../service/helperFunctions";
import { clientDashboardType } from "../../../service/actionType";

// Dashboard Main screen
export const getAllProductInvest = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getAllProductInvest, body })
      .then(({ ObjectResponse }) => {
        resolve(ObjectResponse);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

// Notification Bell api
export const getPushNotification = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getPushNotification, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//get Notification Count
export const getNotificationCount = (query) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addQuery(query, clientFlowApi.getNotificationCount);
    api({ ...clientFlowApi.getNotificationCount })
      .then((data) => {
        resolve(data);
        dispatch({
          type: clientDashboardType.noticationCount,
          payload: data?.Count,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//Dashboard Suggested Model
export const getSchemeDataFromProduct = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getSchemeDataFromProduct, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//Dashboard Header profile detail
export const getClientDetail = (body) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getClientDetail, body })
      .then((data) => {
        resolve(data);
        dispatch({
          type: clientDashboardType.kycDetail,
          payload: data?.ObjectResponse?.clientDetails,
        });
        dispatch({
          type: clientDashboardType.updateClientDetail,
          payload: data,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//get user List
export const getSubBrokerDetail = (query) => (dispatch) => {
  return new Promise((resolve, reject) => {
    addQuery(query, clientFlowApi.getSubBrokerDetails);
    api({ ...clientFlowApi.getSubBrokerDetails })
      .then((data) => {
        resolve(data);
        dispatch({
          type: clientDashboardType.subBrokerdetails,
          payload: data?.subBrokerdetails,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
