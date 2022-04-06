import React from "react";
import { Breadcrumb } from "antd";
import "./style.scss";

export const BreadCrumbs = ({ breadCrumbsList = [] }) => {
  return (
    <div className="bread-crumbs">
      <Breadcrumb separator=">">
        {breadCrumbsList.map(({ redirection, label }, index) => (
          <Breadcrumb.Item
            onClick={() =>
              index + 1 !== breadCrumbsList.length ? redirection() : {}
            }
            className={`bread-crumbs-label ${
              index + 1 !== breadCrumbsList.length
                ? "cursor-pointer opacity-8"
                : ""
            }`}
            key={index}
          >
            {label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};
