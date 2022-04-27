// import { HomeActionType } from "service/actionType"

const initialState = {
  userDetail: "",
  staffAndRoles: {
    roles: true,
    staffs: false,
  },
  importMedicine: {
    newOrder: true,
    underProcess: false,
    completed: false,
    cancelled: false,
  },
  email: "",
  forgotToken: "",
  drawer: false,
  sessionExpire: false,
  userInfo: {},
  selectedPrescription: [],
  uploadPrescription: [],
  docDetails: {
    doctorName: "",
    patientName: "",
    purchaseValidity: "",
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_DATA":
      return {
        ...state,
        userDetail: payload,
      };
    case "STAFF_AND_ROLES":
      return {
        ...state,
        staffAndRoles: payload,
      };
    case "ORDER_MANAGEMENT":
      return {
        ...state,
        orderManagement: payload,
      };
    case "IMPORT_MEDICINE":
      return {
        ...state,
        importMedicine: payload,
      };
    case "EMAIL":
      return {
        ...state,
        email: payload,
      };
    case "FORGOT_TOKEN":
      return {
        ...state,
        forgotToken: payload,
      };
    case "DRAWER":
      return {
        ...state,
        drawer: payload,
      };
    case "SESSION_EXPIRE":
      return {
        ...state,
        sessionExpire: payload,
      };
    case "USER_INFO":
      return {
        ...state,
        userInfo: payload,
      };
    case "SELECTED_PRESCRIPTION":
      return {
        ...state,
        selectedPrescription: payload,
      };
    case "DOCTOR_DETAILS":
      return {
        ...state,
        docDetails: payload,
      };
    case "UPLOAD_PRESCRIPTION":
      return {
        ...state,
        uploadPrescription: payload,
      };
    default:
      return state;
  }
};
