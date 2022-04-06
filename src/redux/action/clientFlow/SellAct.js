import { clientFlowApi } from "service/apiVariables";
import { api } from "service/api";
import { errorToast } from "service/helperFunctions";

//get Gain Details
export const getGainDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getGainDetails, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//get Bank Details
export const getBankDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getBankDetails, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//get Reedemption Questionaire
export const getReedemptionQuestionaire = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getReedemptionQuestionaire, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//sell One Time Order Transaction
export const sellOneTimeOrderTransaction = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.sellOneTimeOrderTransaction, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//sell Recurring Transaction
export const sellRecurringTransaction = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.sellRecurringTransaction, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//save Sell Questionaire Goal
export const saveSellQuestionaireGoal = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.saveSellQuestionaireGoal, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//save Call Log
export const saveCallLog = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.saveCallLog, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//get More Scheme Details
export const getMoreSchemeDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getMoreSchemeDetails, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
