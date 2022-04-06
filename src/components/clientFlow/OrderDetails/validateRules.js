export const generateChellanRules = () => {
  return {
    chequeNumber: {
      presence: {
        allowEmpty: false,
        message: "^Cheque number is required",
      },
      length: {
        minimum: 10,
        message: "must be at least 10 characters",
      },
      numericality: true,
    },
    date: {
      presence: {
        allowEmpty: false,
        message: "^Date is required",
      },
    },
  };
};
