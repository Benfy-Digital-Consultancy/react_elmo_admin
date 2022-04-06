import React from "react";
import { Progress } from "antd";

const AssetAllocationProgress = ({ completion }) => {
  return (
    <div>
      <Progress percent={100} success={{ percent: completion }} />
    </div>
  );
};

export default AssetAllocationProgress;
