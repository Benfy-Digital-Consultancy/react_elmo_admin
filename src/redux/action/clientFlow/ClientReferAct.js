import { clientFlowApi } from "service/apiVariables";
import { api } from "service/api";
import { addQuery, errorToast } from "service/helperFunctions";

export const getClientRefer = (query) => () => {
  return new Promise((resolve, reject) => {
    addQuery(query, clientFlowApi.GetContentBasedReferralMapping);
    api({ ...clientFlowApi.GetContentBasedReferralMapping, query })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getUserReferralInfo = (query) => () => {
  return new Promise((resolve, reject) => {
    addQuery(query, clientFlowApi.GetUserReferralInfo);
    api({ ...clientFlowApi.GetUserReferralInfo, query })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
