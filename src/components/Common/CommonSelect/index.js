import React from "react";
import { Select } from "antd";
import ErrorComponent from "../ErrorComponent";
import "./style.scss";

export const CommonSelect = ({
  label = "",
  onChange = {},
  onClear = {},
  id = "",
  name = "",
  disabled = false,
  value,
  errorMessage,
  showSearch = false,
  options = [],
  placeholder = "",
  subClassName = null,
  allowClear = false,
  defaultValue,
}) => {
  return (
    <div className={`common-select${subClassName ? " mt-md-1" : ""}`}>
      {label && <label>{label}</label>}
      <Select
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        id={id}
        value={value ? value : null}
        onClear={onClear}
        onChange={(e) => {
          let body = {
            target: {
              name,
              value: e,
            },
          };
          onChange(body);
        }}
        showSearch={showSearch}
        options={options}
        allowClear={allowClear}
        defaultValue={defaultValue ? defaultValue : ""}
      />
      {errorMessage && <ErrorComponent message={errorMessage} />}
    </div>
  );
};
