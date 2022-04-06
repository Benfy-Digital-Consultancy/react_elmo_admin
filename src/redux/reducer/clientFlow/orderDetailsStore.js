import { ClientOrderDetailsType } from "service/actionType";

const initialState = {
  ViewOrderListWeb: undefined,
};

const orderDetailStore = (
  state = Object.assign({}, initialState),
  { type, payload }
) => {
  switch (type) {
    case ClientOrderDetailsType.updateOrderDetails:
      return {
        ...state,
        ViewOrderListWeb: payload,
      };
    default:
      return state;
  }
};

export default orderDetailStore;
