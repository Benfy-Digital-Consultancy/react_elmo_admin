export const dateRules = () => {
  return {
    fromdate: {
      presence: {
        allowEmpty: false,
        message: "^Please select from date",
      },
    },
    todate: {
      presence: {
        allowEmpty: false,
        message: "^Please select to date",
      },
    },
  };
};
