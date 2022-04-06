import React from "react";
import { useLang } from "hooks/useLang";
import { NormalRadioButton } from "../NormalRadioButton";
import Popup from "../Popup/Popup";
import { endpoints } from "service/helpers/config";

export const PopupSelectProfile = ({
  visible,
  handlePopuModalCancel,
  clientDetails,
  handleSetRoleId,
}) => {
  const { Labels } = useLang();
  return (
    <Popup close={false} isOpen={visible} setPopup={handlePopuModalCancel}>
      <div className="popup-selectprofile-wrap">
        <h4 className="popup-select-title mb-0">{Labels.selectProfile}</h4>
        <div className="popup-select-wrap mx-auto">
          {clientDetails?.map((val, index) => {
            return (
              <div key={index} className="popup-select-profile">
                <NormalRadioButton
                  label={val.client_name}
                  name={endpoints.amount}
                  onChange={() => handleSetRoleId(val, index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Popup>
  );
};
