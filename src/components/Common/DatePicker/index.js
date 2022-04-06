import React from "react";
import { DatePicker as DateSelecter } from "antd";
import ErrorComponent from "../ErrorComponent";
import "./style.scss";
import moment from "moment";

export const DatePicker = ({
  label = "",
  onChange = {},
  id = "",
  name = "",
  disabled = false,
  value = null,
  errorMessage,
  disabledDate,
  customClass = "",
  placeholder,
  allowClear = true,
  showToday = true,
}) => {
  return (
    <div className={`common-datepicker ${customClass}`}>
      {label && <label>{label}</label>}
      <DateSelecter
        onChange={(date, dateString) => {
          let body = {
            target: {
              name,
              value: dateString,
              date,
            },
          };
          onChange(body);
        }}
        disabledDate={disabledDate}
        disabled={disabled}
        name={name}
        id={id}
        selected={value}
        allowClear={allowClear}
        showToday={showToday}
        value={value !== null && value !== "" ? moment(value) : value}
        placeholder={placeholder}
      />
      {errorMessage && <ErrorComponent message={errorMessage} />}
    </div>
  );
};
