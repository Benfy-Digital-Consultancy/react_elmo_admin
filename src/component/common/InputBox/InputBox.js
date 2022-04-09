import React from "react";
import "./InputBox.scss";

const InputBox = (props) => {
  let {
    placeholder = "",
    register = {},
    value = "",
    type = "text",
    onChange,
    name = "",
    maxlength = "",
    icons = false,
    GB = false,
    onWheel = "",
  } = props;
  return (
    <>
      <input
        name={name}
        placeholder={placeholder}
        className={"inputBoxStyle"}
        ref={register}
        defaultValue={value}
        type={type}
        maxlength={maxlength}
        onWheel={(event) => event.currentTarget.blur()}
        // onChange={(e) => {
        //     let body = {};

        //     body = {
        //         target: {
        //             name: e.target.name,
        //             value: e.target.value,
        //         },
        //     };

        //     onChange(body);
        // }}
      />
    </>
  );
};
export default InputBox;
