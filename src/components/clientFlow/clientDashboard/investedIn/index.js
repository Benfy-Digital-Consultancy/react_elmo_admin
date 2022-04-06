import React from "react";
import LoaderIcon from "assets/images/spinner.gif";
import InfoIcon from "assets/images/info.svg";
import { useHistory } from "react-router-dom";
import { Tooltip } from "antd";
import {
  objectFieldValidate,
  imageConditionValidate,
} from "service/helperFunctions";
import { useLang } from "hooks/useLang";

export default function InvestedIn({
  otherInvestmentDetail,
  handleInfo,
  loaderId,
  loader,
}) {
  const history = useHistory();
  const { Labels } = useLang();
  return (
    <>
      {otherInvestmentDetail?.map((item, index) => (
        <React.Fragment key={index}>
          {item?.Investment > 0 && (
            <div className="middle-list">
              <div
                className={`d-flex w-100 align-items-center cursor-pointer`}
                onClick={() =>
                  item?.ProductName === "Mutual Funds"
                    ? history.push("/dashboard/mutual-fund")
                    : history.push(
                        `/other-investments/${item.ProductName}/${item.ProductId}`
                      )
                }
              >
                <div className="left w-30">
                  <span>{item?.ProductName}</span>
                </div>
                <div className="center">
                  <div className="list">
                    <strong>{objectFieldValidate(item?.CurrentValue)}</strong>
                    <span>{Labels.currentValue}</span>
                  </div>
                  <div className="list">
                    <strong>{objectFieldValidate(item?.Investment)} </strong>
                    <span>{Labels.investedValue}</span>
                  </div>
                  <div className="list">
                    <strong>
                      {objectFieldValidate(item?.XIRR, true)}
                      {imageConditionValidate(item?.XIRR)}
                    </strong>
                    <span>{Labels.XIRR}</span>
                  </div>
                  <div className="list">
                    <strong>
                      {objectFieldValidate(item?.AbsoluteReturn, true)}
                      {imageConditionValidate(item?.AbsoluteReturn)}
                    </strong>
                    <span>{Labels.absolute}</span>
                  </div>
                </div>
              </div>
              <div className="right">
                <Tooltip
                  title={
                    <span
                      className="cursor-pointer"
                      style={{ color: "#F49D37" }}
                    >
                      {Labels.productDetail}
                    </span>
                  }
                  color="#FFEFDC"
                >
                  {loaderId === item.ProductId && loader ? (
                    <img
                      src={LoaderIcon}
                      alt="LoaderIcon"
                      className="loaderIcon"
                    />
                  ) : (
                    <img
                      className="cursor-pointer"
                      src={InfoIcon}
                      alt="InfoIcon"
                      onClick={() => {
                        handleInfo(item.ProductId);
                      }}
                    />
                  )}
                </Tooltip>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
