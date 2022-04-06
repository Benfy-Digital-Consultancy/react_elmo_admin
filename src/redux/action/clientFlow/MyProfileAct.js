import { ClientMyProfileType } from "service/actionType";
import { clientFlowApi } from "service/apiVariables";
import { api } from "service/api";
import { addQuery, errorToast } from "service/helperFunctions";

export const getBankDetailsIFSC = (query) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    addQuery(query, clientFlowApi.GetBankDetails);
    api({ ...clientFlowApi.GetBankDetails, query })
      .then((data) => {
        resolve(data);
        dispatch({
          type: ClientMyProfileType.updateBankDetails,
          payload: data,
        });
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getRiskProfileDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetRiskProfile, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getPanCheckDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.PanCheck, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getBankValidationDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.BankValidation, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getBankValidationStatusDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.BankValidationStatus, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getAllMasterDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetAllMaster, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getStateMasterDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetStateMaster, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getCityDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetCity, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getClientDocumentsListDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetClientDocumentsList, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const saveClientImagesDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.SaveClientImages, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const clientSaveDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.ClientSave, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};