import { ClientMutualFundType } from "service/actionType";
import { api } from "service/api";
import { clientFlowApi } from "service/apiVariables";
import { errorToast } from "service/helperFunctions";

export const getMutualFundDetails = (body) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getMutualFundDetails, body })
      .then((data) => {
        resolve(data);
        dispatch({
          type: ClientMutualFundType.updateMutualFundDetails,
          payload: data,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//other Investments Details
export const otherInvestmentsDetails = (body) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.otherInvestmentsDetails, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const downloadRTA = (body) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.downloadRTA, body })
      .then((data) => {
        resolve(data);
        dispatch({
          type: ClientMutualFundType.updateDownloadRTA,
          payload: data?.ObjectResponse,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getFactSheet = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getFactSheetApi, body })
      .then((response) => {
        resolve(response);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getViewTransactionHistory = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getViewTransactionHistory, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getNavHistory = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getNavHistroyDetails, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

// Scheme Details from mutual fund screen
export const getSchemeDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getSchemeDetails, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

// switch list api
export const getSwitchDetailsAction = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getSwitchDetails, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

// switch unit api

export const getSwitchTransactionCalc = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getSwitchCalc, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getSTPTransactionCalc = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getStpCalc, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getRedeem = (body) => async () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getRedeem, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getRedeemMaxAmount = (body) => async () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetIRDetailsForFolio, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getGoalsDetails = (body) => async () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getGoals, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getLinkToGoalDetails = (body) => async () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getLinkToGoal, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
