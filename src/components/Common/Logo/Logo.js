import React from "react";
import LogoIcon from "assets/images/logo.png";
import RedColorLogo from "assets/images/logo.svg";

import "./logo.scss";

export function Logo({ url, onClick = {} }) {
  return (
    <div className="logo">
      <img
        onClick={() => (onClick ? onClick() : {})}
        src={
          url === "Login"
            ? LogoIcon
            : url === "RedColorLogo"
            ? RedColorLogo
            : url
        }
        alt="nivesh logo"
        className={`logo_width ${onClick ? "cursor-pointer" : ""}`}
      />
    </div>
  );
}
