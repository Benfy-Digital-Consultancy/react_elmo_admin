import React, { useEffect, useRef } from "react";
import "./Popup.scss";
import CloseIcon from "../../../assets/images/circled-close.svg";

export default function Popup({
  children,
  setPopup,
  isOpen,
  close = true,
  overflowChange,
  popupwidth,
}) {
  const myRef = useRef(null);

  useEffect(() => {
    myRef.current.scrollTop = 0;
  }, [isOpen]);

  return (
    <div className="popup" style={{ display: isOpen ? "block" : "none" }}>
      {setPopup && (
        <div className="popup-overlay" onClick={() => setPopup(false)} />
      )}
      <div
        className={popupwidth ? "popup-content popupwidth" : "popup-content"}
      >
        <div
          ref={myRef}
          className={overflowChange ? "overflowChange" : "popup-scroll-content"}
        >
          {close && (
            <div
              className="popup-close"
              onClick={() => {
                setPopup(false);
              }}
            >
              <img alt="CloseIcon" src={CloseIcon} />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
