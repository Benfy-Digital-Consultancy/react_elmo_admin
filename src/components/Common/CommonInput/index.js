import React from "react";
import { useLang } from "hooks/useLang";
import ErrorComponent from "../ErrorComponent";
import "./style.scss";

export const CommonInput = ({
  className = "",
  placeholder = "",
  label = "",
  onChange,
  value = "",
  name,
  disabled = false,
  type = "text",
  max = "",
  min = "",
  isSubTextRequired = false,
  errorMessage = null,
  handleKeypress,
  readOnly,
  customClass = "",
  sublabel = "",
  autoFocus,
  defaultValue,
}) => {
  const { Labels } = useLang();
  // handleEnterSubmit
  const handleKeypressInput = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      handleKeypress && handleKeypress(e);
    }
  };
  return (
    <div className={`normal-input-section ${customClass}`}>
      {label && <label>{label}</label>}
      <div className={isSubTextRequired ? "with-input-label" : "input-label"}>
        <input
          defaultValue={defaultValue}
          className={"form-control w-100" + className}
          autoFocus={autoFocus}
          name={name}
          type={type}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          min={min}
          maxLength={max}
          onChange={(e) => {
            let body = {};
            let tempVal = e.target.value;
            if (e.target.maxLength !== -1 && type === "number") {
              tempVal = tempVal.slice(0, e.target.getAttribute("maxlength"));
            }
            body = {
              target: {
                name: e.target.name,
                value: tempVal,
              },
            };

            onChange(body);
          }}
          required
          onKeyPress={handleKeypressInput}
          readOnly={readOnly}
          onWheel={(event) => event.currentTarget.blur()}
        />
        {sublabel && <p className="mb-0 sub-label">{sublabel}</p>}
        {isSubTextRequired && <span className="input-label">{Labels.rs}</span>}
      </div>
      {errorMessage && <ErrorComponent message={errorMessage} />}
    </div>
  );
};
