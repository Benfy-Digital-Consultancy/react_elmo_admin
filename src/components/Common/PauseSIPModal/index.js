import React from "react";
import Popup from "../Popup/Popup";
import { PAUSEOPTION } from "service/helpers/Constants";
import { NormalRadioButton } from "../NormalRadioButton";
import { useLang } from "hooks/useLang";
import "./pauseSIPModal.scss";

const PauseSIPModal = ({
  isOpen,
  setPopup,
  resPopupStatus,
  pauseSIPTitle,
  onChange,
  pauseConfirmSIP,
  responseStatus,
  popupModalErrMsg,
}) => {
  const { Labels } = useLang();

  return (
    <Popup isOpen={isOpen} setPopup={setPopup}>
      {resPopupStatus === false ? (
        <div className="pause-sip-popup">
          <div className="pause-sip-title">
            {pauseSIPTitle ? Labels.pause : Labels.cancel}
          </div>
          <div className="pause-cancel-popup">
            <div className="description">
              {Labels?.pauSIPM1} {pauseSIPTitle ? Labels.pause : Labels.cancel})
              {Labels?.pauSIPM2} {pauseSIPTitle ? Labels.pause : Labels.cancel}
              {Labels?.pauSIPM3}
            </div>
            <div className="checkbox-list">
              {PAUSEOPTION.map((item, index) => {
                if (pauseSIPTitle === true && item.id === 6) return null;
                return (
                  <div key={index} className="custom-checkbox pb-2">
                    <NormalRadioButton
                      id={item}
                      label={item.heading}
                      name="pause/cancel"
                      onChange={() => onChange(item.active)}
                    />
                  </div>
                );
              })}
            </div>
            {popupModalErrMsg && (
              <p className="error-text">{popupModalErrMsg}</p>
            )}
            <button className="primary-btn" onClick={() => pauseConfirmSIP()}>
              {Labels.confirm}
            </button>
          </div>
        </div>
      ) : (
        <div className="title text-center pb-3">{responseStatus}</div>
      )}
    </Popup>
  );
};

export default PauseSIPModal;
