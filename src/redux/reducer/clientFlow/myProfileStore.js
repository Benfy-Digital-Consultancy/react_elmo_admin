import { ClientMyProfileType } from "service/actionType";

const initialState = {
  bankDetailsData: undefined,
};

const myProfileStore = (
  state = Object.assign({}, initialState),
  { type, payload }
) => {
  switch (type) {
    case ClientMyProfileType.updateBankDetails:
      return {
        ...state,
        bankDetailsData: payload,
      };
    default:
      return state;
  }
};

export default myProfileStore;
