import React from "react";
import { Radio } from "antd";
import "./style.scss";

export const NormalRadioButton = ({
  label = "",
  onChange = {},
  id = "",
  name = "",
  disabled = false,
  checked = false,
  className = "",
}) => {
  return (
    <div className={`custom-radio-button ${className}`}>
      <Radio
        id={id}
        disabled={disabled}
        name={name}
        checked={checked}
        onChange={() => {
          let body = {
            target: {
              value: name,
            },
          };
          onChange(body);
        }}
      >
        {label}
      </Radio>
    </div>
  );
};
