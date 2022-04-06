export const validationRules = () => {
  return {
    username: {
      presence: {
        allowEmpty: false,
        message: "^Username is required",
      },
    },
    email: {
      presence: {
        allowEmpty: false,
        message: "^Email is required",
      },
      format: {
        pattern:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
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
    mobile: {
      presence: {
        allowEmpty: false,
        message: "^Mobile is required",
      },
      length: {
        minimum: 10,
        message: "must be at least 10 characters",
      },
      numericality: true,
    },
  };
};

export const otpValidation = () => {
  return {
    otpValue: {
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
};
