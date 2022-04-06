export const emailValidation = {
  Email_Id: {
    presence: {
      allowEmpty: false,
      message: "^Email is required",
    },
    format: {
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
  },
};
export const otpValidation = {
  OTP: {
    presence: {
      allowEmpty: false,
      message: "^Otp is required",
    },
    numericality: true,
    length: {
      minimum: 4,
    },
  },
};

export const confirmValidation = {
  password: {
    presence: {
      allowEmpty: false,
      message: "^Password is required",
    },
    format: {
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_#%*?&])[A-Za-z\d@_#$!%*?&]*$/,
      flags: "i",
      message:
        "^Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    },
    length: {
      minimum: 8,
      tooShort: "^Must be atleast 8 characters",
      maximum: 15,
      tooLong: "^Must contain less than 15 character",
    },
  },
  reEnterNewPassword: {
    presence: {
      allowEmpty: false,
      message: "^Confirm password is required",
    },
    equality: {
      attribute: "password",
      message: "^Both password must match",
      comparator: function (v1, v2) {
        return JSON.stringify(v1) === JSON.stringify(v2);
      },
    },
  },
};
