export const validationRules = () => {
  return {
    username: {
      presence: {
        allowEmpty: false,
        message: "^Please enter user id",
      },
      email: true,
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "^Please enter password",
      },
      length: {
        minimum: 6,
        tooShort: "must contain alteast 6 character",
        maximum: 15,
        tooLong: "must contain less than 15 character",
      },
    },
  };
};
