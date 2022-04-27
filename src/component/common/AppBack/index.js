import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";

export const AppBack = ({ onClick = {}, label }) => {
  return (
    <div className="app-back">
      <div className="content-title">
        <div
          className="d-flex align-items-center cursor-pointer"
          onClick={() => onClick()}
        >
          <BsArrowLeft color="#208e5as" />
          <span className="font-bold-16">{label}</span>
        </div>
      </div>
    </div>
  );
};
