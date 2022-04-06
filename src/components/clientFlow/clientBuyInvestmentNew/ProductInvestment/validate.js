export const validationRules = () => {
  return {
    motherName: {
      presence: {
        allowEmpty: false,
        message: "^Please enter mother name",
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
    tenure: {
      presence: {
        allowEmpty: false,
        message: "^Please select tenure",
      },
    },
    fatherName: {
      presence: {
        allowEmpty: false,
        message: "^Please enter father name",
      },
    },
    cheque: {
      presence: {
        allowEmpty: false,
        message: "^Please upload cheque",
      },
    },
    identity: {
      presence: {
        allowEmpty: false,
        message: "^Please upload identity proof",
      },
    },
    address: {
      presence: {
        allowEmpty: false,
        message: "^Please upload address proof",
      },
    },
  };
};
