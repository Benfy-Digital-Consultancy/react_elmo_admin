import React from "react";
import LoaderIcon from "assets/images/spinner.gif";
import "./style.scss";

export const PageLoader = () => {
  return (
    <div className="page-loader">
      <img alt="loaderIcon" src={LoaderIcon} />
    </div>
  );
};
