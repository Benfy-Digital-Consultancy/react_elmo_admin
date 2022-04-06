import React from "react";
import { numberToRupees, date } from "service/helperFunctions";
import { useLang } from "hooks/useLang";

export const MandateListDropdownCard = ({ item }) => {
  const { Labels } = useLang();
  return (
    <div className="box-block order-Type">
      <div className="mandate-box">
        <div className="mandate-box-header">
          <div className="primary">{item?.BANK} </div>
          <span>{Labels.mandateId} : </span>
          <strong className="pl-2"> {item?.MandateId}</strong>
        </div>
        <div className="mandate-box-content">
          <div className="list">
            <div className="label">{Labels.mandateType} : </div>
            <div className="value">{item?.Mandate_Type_Name}</div>
          </div>
          <div className="list">
            <div className="label">{Labels.mandateDate} : </div>
            <div className="value">{date(item?.Created_date)}</div>
          </div>
          <div className="list size-sm">
            <div className="label">{Labels.IFSC} : </div>
            <div className="value">{item?.IFSC_code}</div>
          </div>
          <div className="list">
            <div className="label">{Labels.mandateAmount} : </div>
            <div className="value">{numberToRupees(item?.Amount)}</div>
          </div>
          <div className="list">
            <div className="label">{Labels.status} : </div>
            <div className="value">{item?.Status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
