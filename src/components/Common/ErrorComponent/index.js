import React from "react";

const ErrorComponent = ({ message }) => (
  <div className="text-left">
    <h6 className="text-danger mb-3 pt-2" style={{ fontSize: 14 }}>
      {message}
    </h6>
  </div>
);

export default ErrorComponent;
