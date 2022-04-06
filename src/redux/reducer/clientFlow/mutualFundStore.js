import { ClientMutualFundType } from "service/actionType";

const initialState = {
  mutualFundDetails: undefined,
  transactionHistory: undefined,
  downloadRTAStatement: undefined,
  scrollPositionId: undefined,
};

const mutualFundStore = (
  state = Object.assign({}, initialState),
  { type, payload }
) => {
  switch (type) {
    case ClientMutualFundType.updateMutualFundDetails:
      return {
        ...state,
        mutualFundDetails: payload,
      };
    case ClientMutualFundType.updateDownloadRTA:
      return {
        ...state,
        downloadRTAStatement: payload,
      };
    case ClientMutualFundType.scrollPositionId:
      return {
        ...state,
        scrollPositionId: payload,
      };
    default:
      return state;
  }
};

export default mutualFundStore;
