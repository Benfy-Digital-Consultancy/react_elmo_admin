import React, { useState } from "react";
import "./PasswordInputBox.scss";

const PasswordInputBox = (props) => {
  let {
    placeholder = "",
    register = {},
    value = "",
    type = "password",
    onChange,
    name = "",
    maxlength = "",
    icons = false,
    GB = false,
    onWheel = "",
  } = props;


  const [passwordType,setType] = useState("password")
  const [passwordText,setPasswordText] = useState("Show")

  const onClickShow = () =>{
    if(passwordType == "password"){
      setType("text");
      setPasswordText("Hide")
    }else{
      setType("password");
      setPasswordText("Show")
    }
  }
  return (
    <div className="inputBoxContainer">
      <input
        name={name}
        placeholder={placeholder}
        ref={register}
        defaultValue={value}
        className={"inputBoxStyless"}
        type={passwordType}
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
      <p onClick={onClickShow} className="mt-3 mr-2">{passwordText}</p>
    </div>
  );
};
export default PasswordInputBox;
