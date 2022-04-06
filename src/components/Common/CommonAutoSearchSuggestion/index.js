import { AutoComplete } from "antd";
import React from "react";
import ErrorComponent from "../ErrorComponent";
import "./style.scss";

const { Option } = AutoComplete;

export const CommonAutoSearchSuggestion = ({
  placeholder = "",
  label = "",
  onChange,
  value = "",
  name,
  disabled = false,
  type = "text",
  isSubTextRequired = false,
  errorMessage = null,
  readOnly,
  customClass = "",
  sublabel = "",
  optionsList = [],
  onSelectOption,
  headerClassName = "",
  subClassName = "",
  defaultValue,
}) => {
  return (
    <div className={"normal-auto-search-section " + headerClassName}>
      {label && <label>{label}</label>}
      <div className={isSubTextRequired ? "with-input-label" : "input-label"}>
        <AutoComplete
          defaultValue={defaultValue}
          className={subClassName}
          onSearch={(value) => {
            let body = {};
            body = {
              target: {
                name: name,
                value: value,
              },
            };
            onChange(body);
          }}
          onSelect={(value, option) => onSelectOption(value, option)}
          name={name}
          type={type}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
        >
          {optionsList?.length > 0 &&
            optionsList.map(({ label, value }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
        </AutoComplete>

        {sublabel && <p className="mb-0 sub-label">{sublabel}</p>}
      </div>
      {errorMessage && <ErrorComponent message={errorMessage} />}
    </div>
  );
};
