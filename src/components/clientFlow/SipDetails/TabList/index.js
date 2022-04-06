import React from "react";
import { endpoints } from "service/helpers/config";

export default function TabList({
  tabList,
  sipFilterList,
  activeTab,
  handleToActiveTab,
}) {
  return (
    <div className="tab-bar">
      {tabList?.map((item, id) => {
        let tabLengthValue = sipFilterList[item].length;
        return (
          <div
            key={id}
            className={"tab " + (activeTab === item ? endpoints.active : "")}
            onClick={() => handleToActiveTab(item)}
          >
            {item}{" "}
            <span className="tab-bar-count">({item ? tabLengthValue : 0})</span>
          </div>
        );
      })}
    </div>
  );
}
