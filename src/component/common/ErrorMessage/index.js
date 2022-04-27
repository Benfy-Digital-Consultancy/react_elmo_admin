import React from "react";

const FormErrorMessage = ({ error, type, messages }) => {
  if (!error) return null;

  return (
    <span className="text-danger fs-13">
      {messages[error.type] ? messages[error.type] : "Error in field"}
    </span>
  );
};
export default FormErrorMessage;
