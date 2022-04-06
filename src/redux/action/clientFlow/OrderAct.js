import { ClientOrderDetailsType } from "service/actionType";
import { api } from "service/api";
import { clientFlowApi } from "service/apiVariables";
import { errorToast } from "service/helperFunctions";

export const getOrderDetails = (body) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getOrderDetails, body })
      .then((data) => {
        resolve(data);
        dispatch({
          type: ClientOrderDetailsType.updateOrderDetails,
          payload: data.ObjectResponse,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const generateChellan = (body) => async () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.generateChellan, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const generateChellanDetail = (body) => async () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.generateChellanDetail, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const generateChellanFromGroupId = (body) => async () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.generateChellanFromGroupId, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getSMS = (body) => async () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getSMS, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
