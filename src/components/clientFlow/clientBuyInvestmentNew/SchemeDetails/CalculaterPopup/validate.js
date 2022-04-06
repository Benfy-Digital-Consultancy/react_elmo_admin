export const validationRules = () => {
  return {
    duration: {
      presence: {
        allowEmpty: false,
        message: "^Please enter duration",
      },
    },
    Frequency_Type: {
      presence: {
        allowEmpty: false,
        message: "^Please select frequency type",
      },
    },
    amount: {
      presence: {
        allowEmpty: false,
        message: "^Please enter amount",
      },
    },
    returnPercentage: {
      presence: {
        allowEmpty: false,
        message: "^Please enter percentage",
      },
    },
  };
};
