import React from "react";
import { Tooltip } from "antd";

export const ToolTip = ({ children, label, placement = "top" }) => {
  return (
    <Tooltip
      placement={placement}
      title={
        <span className="cursor-pointer" style={{ color: "#F49D37" }}>
          {label}
        </span>
      }
      color="#FFEFDC"
    >
      {children}
    </Tooltip>
  );
};
