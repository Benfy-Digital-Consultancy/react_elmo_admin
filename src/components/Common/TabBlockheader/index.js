import React from "react";
import "./style.scss";

export const TabBlockheader = ({ label = [], icon, isBlueBg = false }) => {
  return (
    <div
      className="tab-block-header"
      style={
        isBlueBg
          ? { background: "#f5f8ff" }
          : { background: "#f9f9f9", margin: `0 -20px` }
      }
    >
      {icon && <img src={icon} alt={icon} />} {label}
    </div>
  );
};
