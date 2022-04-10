import React from "react";
import "./styles.scss";

const FileUploadButton = ({
    placeholder = "",
    register = {},
    value = "",
    type = "file",
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
            <input
                name={name}
                placeholder={placeholder}
                className="fileInputBox font-regular-14"
                ref={register}
                defaultValue={value}
                type={type}
                maxlength={maxlength}
                onWheel={(event) => event.currentTarget.blur()}
            />
            <span className="text-danger fs-13">
                {error?.type && messages[error.type]}
            </span>
        </>
    );
};
export default FileUploadButton;
