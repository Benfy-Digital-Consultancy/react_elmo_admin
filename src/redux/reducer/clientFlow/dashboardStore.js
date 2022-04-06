import { clientDashboardType } from "../../../service/actionType";

const initialState = {
  kycList: null,
  ClientDetail: undefined,
  subBrokerdetails: null,
  noticationCount: null,
};

const dashboardStore = (
  state = Object.assign({}, initialState),
  { type, payload }
) => {
  switch (type) {
    case clientDashboardType.kycDetail:
      return {
        ...state,
        kycList: payload,
      };
    case clientDashboardType.updateClientDetail:
      return {
        ...state,
        ClientDetail: payload,
      };
    case clientDashboardType.subBrokerdetails:
      return {
        ...state,
        subBrokerdetails: payload,
      };
    case clientDashboardType.noticationCount:
      return {
        ...state,
        noticationCount: payload,
      };
    default:
      return state;
  }
};

export default dashboardStore;
