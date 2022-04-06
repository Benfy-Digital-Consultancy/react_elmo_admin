import React, { Component } from "react";
import "./checkbox.scss";
import TickIcon from "assets/images/tick.svg";
export class NormalCheckbox extends Component {
  render() {
    let {
      className = "custom-checkbox",
      label = "",
      value = "",
      name = "",
      onChange,
      checked,
      disabled = false,
      inputclassName = "",
      hightlightTextColor,
    } = this.props;
    return (
      <label className={className}>
        <input
          className={inputclassName}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={({ target: { name, checked: Checked } }) => {
            onChange &&
              onChange({ target: { name, value: Checked, type: "checkbox" } });
          }}
        />
        <span className="checkbox-tick">
          <img alt="TickIcon" src={TickIcon} />
        </span>
        {label ? (
          <span className={`label-txt ${hightlightTextColor}`}>{label}</span>
        ) : null}
      </label>
    );
  }
}
