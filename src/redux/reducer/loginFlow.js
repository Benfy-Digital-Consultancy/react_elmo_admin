import { Login } from "../../service/actionType";

const initialState = {
  getWhiteLabelDetails: undefined,
};

const LoginFlow = (
  state = Object.assign({}, initialState),
  { type, payload }
) => {
  switch (type) {
    case Login.getWhiteLabel:
      return {
        ...state,
        getWhiteLabelDetails: payload,
      };

    default:
      return state;
  }
};

export default LoginFlow;
