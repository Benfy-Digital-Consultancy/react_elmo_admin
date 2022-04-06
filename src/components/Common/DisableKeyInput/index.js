import React from "react";
import { useLang } from "hooks/useLang";

export const DisableKeyInput = ({ handleChange, name }) => {
  const { Labels } = useLang();
  return (
    <div className="d-flex">
      <span
        className="ms-auto cursor-pointer mb-3"
        style={{ marginTop: "-6px" }}
        onClick={() => {
          let body = {
            target: { name: name, value: "" },
          };
          handleChange(body);
        }}
      >
        {Labels.clear}
      </span>
    </div>
  );
};
