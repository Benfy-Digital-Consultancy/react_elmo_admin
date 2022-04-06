import React from "react";
import "./style.scss";

export const FeatureCard = ({ onClick = null, label, icon, key }) => {
  return (
    <div className="Feature-card mb-3 me-3 pe-1" key={key}>
      <div
        className={`list-buy${onClick ? " cursor-pointer" : ""}`}
        onClick={() => onClick && onClick()}
      >
        <img src={icon} alt="" width="50" height="50" />
        <span>{label}</span>
      </div>
    </div>
  );
};
