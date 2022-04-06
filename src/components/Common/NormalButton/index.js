import React, { Component } from "react";
import "./style.scss";

export class NormalButton extends Component {
  render() {
    const {
      className = "",
      label = "",
      onClick,
      id,
      disabled = false,
      outline = false,
      mainbg = false,
      normal = false,
      danger = false,
      greyBg = false,
      successBg = false,
      outlineDanger = false,
      isPrimay = false,
      isViewTableButton = false,
      rightIcon = "",
    } = this.props;

    return (
      <div className="w-100 btn1">
        <button
          id={id}
          className={`btn cursor-pointer 
          ${outline ? "outline-btn" : ""} 
          ${outlineDanger ? "outline-btn-danger" : ""} 
          ${mainbg ? "mainbg-btn" : ""} 
          ${normal ? "normal-btn" : ""}
          ${danger ? "danger-btn" : ""} 
          ${greyBg ? "grey-btn" : ""}
          ${successBg ? "success-btn" : ""}
          ${isPrimay ? "primary-btn" : ""}
          ${isViewTableButton ? "view-table-btn" : ""}
          ${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {label}
          {rightIcon !== "" ? (
            <span className={`btn-right-icon ${rightIcon}`}></span>
          ) : null}
        </button>
      </div>
    );
  }
}
