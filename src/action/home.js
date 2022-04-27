export const userDetail = (data) => {
  return {
    type: "USER_DATA",
    payload: data,
  };
};

export const staffAndRoles = (data) => {
  return {
    type: "STAFF_AND_ROLES",
    payload: data,
  };
};

export const orderManagement = (data) => {
  return {
    type: "ORDER_MANAGEMENT",
    payload: data,
  };
};

export const importMedicine = (data) => {
  return {
    type: "IMPORT_MEDICINE",
    payload: data,
  };
};

export const forgotEmail = (data) => {
  return {
    type: "EMAIL",
    payload: data,
  };
};

export const forgotToken = (data) => {
  return {
    type: "FORGOT_TOKEN",
    payload: data,
  };
};

export const sideMenu = (data) => {
  return {
    type: "DRAWER",
    payload: data,
  };
};

export const sessionExpire = (data) => {
  return {
    type: "SESSION_EXPIRE",
    payload: data,
  };
};

export const userInfo = (data) => {
  return {
    type: "USER_INFO",
    payload: data,
  };
};

export const selectedPres = (data) => {
  return {
    type: "SELECTED_PRESCRIPTION",
    payload: data,
  };
};

export const uploadPrescription = (data) => {
  return {
    type: "UPLOAD_PRESCRIPTION",
    payload: data,
  };
};

export const doctorDetail = (data) => {
  return {
    type: "DOCTOR_DETAILS",
    payload: data,
  };
};
