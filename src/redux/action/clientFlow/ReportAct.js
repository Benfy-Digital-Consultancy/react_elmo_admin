import { ClientReportType } from "service/actionType";
import { api } from "service/api";
import { clientFlowApi } from "service/apiVariables";
import { errorToast } from "service/helperFunctions";

export const getReportDetails = (body) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api({ ...clientFlowApi.getReportListApi, body })
            .then((data) => {
                resolve(data);
                dispatch({
                    type: ClientReportType.updateReportDetails,
                    payload: data?.ObjectResponse?.reports,
                });
            })
            .catch(({ message }) => {
                reject(errorToast(message));
            });
    });
};

// getFinancialYear 

export const getFinancialYearDetails = (body) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api({ ...clientFlowApi.getFinancialYear, body })
            .then((data) => {
                let options = [];
                // eslint-disable-next-line array-callback-return
                data.ObjectResponse.FinancialList.map((val) => {
                    options.push({
                        label: val.TransactionDate,
                        value: val.TransactionDate,
                    });
                });

                dispatch({
                    type: ClientReportType.updateFinancialList,
                    payload: options,

                });
                resolve(data);
            })
            .catch(({ message }) => {
                reject(errorToast(message));
            });
    });
};


// getReportFileType
export const getReportFileTypePdf = (body) => {
    return new Promise((resolve, reject) => {
        api({ ...clientFlowApi.getReportFileType, body })
            .then((data) => {
                resolve(data);
            })
            .catch(({ message }) => {
                reject(errorToast(message));
            });
    });
};

// getMandateReportList

export const getMandateReportAction = (body) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api({ ...clientFlowApi.getMandateReportList, body })
            .then((data) => {
                dispatch({
                    type: ClientReportType.updateReportDetails,
                    payload: data?.ObjectResponse?.reports,

                });
                resolve(data);
            })
            .catch(({ message }) => {
                reject(errorToast(message));
            });
    });
};

// getDividendReport

export const getDividendReportAction = (body) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api({ ...clientFlowApi.getDividendReport, body })
            .then((data) => {
                dispatch({
                    type: ClientReportType.updateDividendReport,
                    payload: data?.ObjectResponse,
                });
                resolve(data);
            })
            .catch(({ message }) => {
                reject(errorToast(message));
            });
    });
};

// getCashFlowReport

export const getCashFlowReportAction = (body) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        api({ ...clientFlowApi.getCashFlowReport, body })
            .then((data) => {
                dispatch({
                    type: ClientReportType.updateCashFlowReport,
                    payload: data?.ObjectResponse?.reports,
                });
                resolve(data);
            })
            .catch(({ message }) => {
                reject(errorToast(message));
            });
    });
};