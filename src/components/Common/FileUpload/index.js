import React from "react";
import AddIcon from "assets/images/plus-circle-blue.svg";
import "./style.scss";
import ErrorComponent from "../ErrorComponent";

export const FileUpload = ({
  onChange = null,
  label,
  subClassName = false,
  errorMessage = null,
}) => {
  return (
    <div className={`file-upload${subClassName ? " mt-md-1" : ""}`}>
      {label && <label>{label}</label>}
      <div className="upload">
        <div className="placeholder">Choose file</div>
        <input placeholder="Enter here" type="file" onChange={onChange} />
        <img src={AddIcon} alt="AddIcon" className="ms-auto" />
      </div>
      {errorMessage && <ErrorComponent message={errorMessage} />}
    </div>
  );
};
