import React from "react";
import EmptyData from "assets/images/emptydata.png";

import "./style.scss";
import { useLang } from "hooks/useLang";

export const EmptyRecord = ({ label }) => {
  const { Labels } = useLang();
  return (
    <div className="empty-record-data">
      <img src={EmptyData} alt="Empty Data" className="empty-record-img" />
      <h6 className="empty-record-title">
        {label ? label : Labels.noDataFound}
      </h6>
    </div>
  );
};
