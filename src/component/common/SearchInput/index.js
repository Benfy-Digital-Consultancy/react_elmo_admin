import React from "react";
import SearchIcon from "assets/images/search.svg";
import "./style.scss";

export default function SearchInput(props) {
  let {
    className = "",
    placeholder = "",
    type = "text",
    value = "",
    onChange,
  } = props;

  return (
    <div id="search-input-parent">
      <div className="search-input-layout">
        <div className="search-input-container">
          <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={`search-input-style ${className}`}
          />
          <img src={SearchIcon} alt="search icon" className="search-img" />
        </div>
      </div>
    </div>
  );
}
