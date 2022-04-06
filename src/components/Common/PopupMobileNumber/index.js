import React from "react";
import { NormalButton } from "components/Common";
import { CommonInput } from "components/Common/CommonInput";
import Popup from "../Popup/Popup";

export const PopupMobileNumber = ({
  visible,
  handleInputModalCancel,
  title,
  type,
  name,
  max,
  value,
  placeholder,
  onChange,
  handleKeypress,
  mobileNumberVadiationStatus,
  mobileNumberErroMsg,
  label,
  handleCheckMobile,
  isButtonClicked,
}) => {
  return (
    <Popup close={false} isOpen={visible} setPopup={handleInputModalCancel}>
      <div className="popup-selectprofile-wrap">
        <h4 className="popup-select-title mb-0">{title}</h4>
        <div className="popup-select-wrap mx-auto">
          <div className="inputModalContainer">
            <div className="inputModalPadding">
              <CommonInput
                autoFocus
                type={type}
                name={name}
                max={max}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                errorMessage={
                  mobileNumberVadiationStatus ? mobileNumberErroMsg : null
                }
                handleKeypress={handleKeypress}
              />
            </div>

            <div className="inputModalPadding">
              <NormalButton
                label={label}
                isPrimay={true}
                className="w-100"
                onClick={handleCheckMobile}
                disabled={isButtonClicked}
              />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};
