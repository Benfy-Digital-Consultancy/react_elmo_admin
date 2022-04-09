import React, { useState } from "react";

import "./LimitFilter.scss";

const LimitFilter = ({ onChange, value = 10 }) => {
  const options = [10, 15, 20, 25, 30];

  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="page-limit">
      <span>Show</span>
      <div
        className="custom_select"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex="0"
        onBlur={() => setIsOpen(false)}
      >
        <div className="select_value">
          <span>{value}</span>
          <span
            className="fas fa-chevron-down"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          ></span>
        </div>
        <div
          className="select_options"
          style={{ display: isOpen ? "block" : "none" }}
        >
          {options.map((list, index) => {
            return (
              <div
                key={index}
                className="options"
                onClick={() => onChange(list)}
              >
                <span>{list}</span>
              </div>
            );
          })}
        </div>
      </div>
      <span> items per page</span>
    </div>
  );
};

export default LimitFilter;
