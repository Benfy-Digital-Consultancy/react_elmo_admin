import React, { Component } from "react";
// import styles from "./button.module.scss";
import "./normalButton.scss";
export class NormalButton extends Component {
  render() {
    const {
      className = "",
      label = "",
      onClick,
      id,
      type = "submit",
      disabled = false,
      authButton = false,
      loginButton = false,
      rightIcon = "",
    } = this.props;

    return (
      <div>
        <button
          id={id}
          type={type}
          className={`cursor-pointer 
                     ${authButton ? "authButton" : ""}
                     ${loginButton ? "loginButton" : ""}

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

export default NormalButton;
