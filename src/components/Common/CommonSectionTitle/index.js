import React from "react";
import "./style.scss";

const CommonSectionTitle = ({ titleText = "" }) => {
  return (
    <div className="section-title">
      <span>{titleText}</span>
    </div>
  );
};

export default CommonSectionTitle;
