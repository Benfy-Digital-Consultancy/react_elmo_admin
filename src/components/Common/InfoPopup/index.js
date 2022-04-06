import React from "react";
import ReportIcon from "assets/images/report.svg";
import Popup from "components/Common/Popup/Popup";
import { useLang } from "hooks/useLang";
import "./style.scss";

export const InfoPopup = ({ schemeData, handlePopup, infoPopup }) => {
  const { Labels } = useLang();
  return (
    <div className="info-popup-outer">
      <Popup
        isOpen={infoPopup}
        setPopup={(value) => {
          handlePopup(value);
        }}
      >
        <div className="info-popup">
          <div className="title-block">
            <span className="pb-3">{Labels?.productDetail}</span>
            <div className="title">
              <img src={ReportIcon} alt="reportIcon" className="me-2" />
              <strong>{schemeData?.Title}</strong>
            </div>
          </div>
          <div
            className="info-section"
            dangerouslySetInnerHTML={{
              __html: schemeData?.TitleDescription,
            }}
          />
        </div>
      </Popup>
    </div>
  );
};
