import { ClientFamilyType } from "service/actionType";

const initialState = {
  familySummaryDetails: undefined,
  familyMemberDetails: undefined,
  familyGridDetails: undefined,
};

const familyStore = (
  state = Object.assign({}, initialState),
  { type, payload }
) => {
  switch (type) {
    case ClientFamilyType.updateFamilySummary:
      return {
        ...state,
        familySummaryDetails: payload,
      };
    case ClientFamilyType.updateFamilyMember:
      return {
        ...state,
        familyMemberDetails: payload,
      };
    case ClientFamilyType.updateFamilyGrid:
      return {
        ...state,
        familyGridDetails: payload,
      };
    default:
      return state;
  }
};

export default familyStore;
