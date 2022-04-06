import { clientFlowApi } from "service/apiVariables";
import { api } from "service/api";
import { addQuery, errorToast } from "service/helperFunctions";

export const buyMoreMultipleScheme = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.buyMoreMultipleScheme, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const GetClientMandateList = (query) => () => {
  return new Promise((resolve, reject) => {
    addQuery(query, clientFlowApi.GetClientMandateList);
    api({ ...clientFlowApi.GetClientMandateList, query })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const OneTimeOrderTransaction = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.OneTimeOrderTransaction, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

// GetFolioNumberBySchemeCode
export const GetFolioNumberByCCandSchemeCode = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetFolioNumberByCCandSchemeCode, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const SIPTransaction = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.SIPTransaction, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const SpreadTransaction = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.SpreadTransaction, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getInvestmentPlanDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getInvestmentPlanDetails, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getFilterIFSCCode = (query) => () => {
  return new Promise((resolve, reject) => {
    addQuery(query, clientFlowApi.GetFilterIFSCCode);
    api({ ...clientFlowApi.GetFilterIFSCCode, query })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getPreviousGoals = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getPreviousGoals, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//Buy Invest help Guide
export const getBuyInvestHelpContent = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetHelpContent, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
//Buy Invest plan your investment
export const getInvestmentPlan = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getInvestmentPlan, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//Buy Invest plan your investment
export const getInvestmentPlanAction = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getInvestmentPlanAction, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//Buy Invest Question flow
export const GetQuestion = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetQuestion, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
//Buy Invest Save Question Survey List flow
export const SaveQuestionSurveyList = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.SaveQuestionSurveyList, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const buyInvestmentSearchBar = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getQuickOrderSchemesSearch, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getSchemeListFromProduct = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getSchemeListFromProduct, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getSchemeProductDetails = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getSchemeProductDetails, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const InvestmentCalculator = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.InvestmentCalculator, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//Invest plan page get api
export const getSurveySchemeList = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetSurveySchemeListInfo, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const getSchemesData = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.getSchemesData, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

export const GetGenerateClientMandate = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetGenerateClientMandate, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//download pdf file - invest plan
export const downloadInvestPlanPdf = (query) => () => {
  return new Promise((resolve, reject) => {
    addQuery(query, clientFlowApi.DownloadGoalPlanPDF);
    api({ ...clientFlowApi.DownloadGoalPlanPDF, query })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//header part for investPlan page
export const GetQuestionResponseList = (query) => () => {
  return new Promise((resolve, reject) => {
    addQuery(query, clientFlowApi.GetQuestionResponse);
    api({ ...clientFlowApi.GetQuestionResponse, query })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//SaveGoalForFuture button api call
export const SaveGoalForFuture = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.SaveGoalForFuture, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//MandateFileUpload api call
export const MandateFileUpload = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.MandateFileUpload, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//MandateFileEmail api call
export const MandateFileEmail = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.MandateFileEmail, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
//GetEMandateAuthURL api call
export const GetEMandateAuthURL = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.GetEMandateAuthURL, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};

//DeleteMandate api call
export const DeleteMandate = (body) => () => {
  return new Promise((resolve, reject) => {
    api({ ...clientFlowApi.DeleteMandate, body })
      .then((data) => {
        resolve(data);
      })
      .catch(({ message }) => {
        reject(errorToast(message));
      });
  });
};
