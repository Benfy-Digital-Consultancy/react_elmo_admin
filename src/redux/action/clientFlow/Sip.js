import { clientFlowApi } from "service/apiVariables";
import { api } from "service/api";
import { errorToast } from "service/helperFunctions";

// getSipDetails
export const getSipDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getSipDetails, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

// getSipDetails
export const GetFamilyHeadClientList = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetFamilyHeadClientList, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
