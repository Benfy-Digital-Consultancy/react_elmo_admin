import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import "./style.scss";

export const AppBack = ({ onClick = {}, label }) => {
  return (
    <div className="app-back">
      <div className="content-title">
        <div
          className="d-flex align-items-center cursor-pointer"
          onClick={() => onClick()}
        >
          <AiOutlineLeft className="text-danger" />
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};
