import { clientFlowApi } from "service/apiVariables";
import { api } from "service/api";
import { errorToast } from "service/helperFunctions";

//Buy Invest help Guide
export const nfoGetSchemesData = () => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.nfoGetSchemesData })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
