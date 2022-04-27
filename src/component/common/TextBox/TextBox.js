import React from "react";
import "./textbox.scss";

const TextBox = ({
  placeholder = "",
  register = {},
  value = "",
  type = "text",
  onChange,
  name = "",
  maxlength = "",
  error = "",
  icons = false,
  GB = false,
  onWheel = "",
  messages,
}) => {
  return (
    <>
      <textarea rows={1} cols={10} className="textBoxStyle"></textarea>
      <span className="text-danger fs-13">
        {error?.type && messages[error.type]}
      </span>
    </>
  );
};
export default TextBox;
