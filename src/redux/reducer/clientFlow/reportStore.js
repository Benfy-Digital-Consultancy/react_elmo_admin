import { ClientReportType } from "service/actionType";

const initialState = {
    reportDetailedList: undefined,
    financialList: undefined,
    cashFlowReport: undefined,
    dividendReport: undefined,
    mandateReportList: undefined
};

const reportStore = (
    state = Object.assign({}, initialState),
    { type, payload }
) => {
    switch (type) {
        case ClientReportType.updateReportDetails:
            return {
                ...state,
                reportDetailedList: payload,
            };
        case ClientReportType.updateFinancialList:
            return {
                ...state,
                financialList: payload,
            };
        case ClientReportType.updateCashFlowReport:
            return {
                ...state,
                cashFlowReport: payload,
            };
        case ClientReportType.updateDividendReport:
            return {
                ...state,
                dividendReport: payload,
            }
        case ClientReportType.updateMandateReportList:
            return {
                ...state,
                mandateReportList: payload
            }
        default:
            return state;
    }
};

export default reportStore;
