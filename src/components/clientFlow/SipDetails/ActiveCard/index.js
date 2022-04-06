import React from "react";
import { Popover } from "antd";
import MoreIcon from "assets/images/more-vertical.svg";
import ActiveCardFirstRow from "../ActiveCardFirstRow";
import { dateConvertFunction, numberToRupees } from "service/helperFunctions";
import { useLang } from "hooks/useLang";
import { ToolTip } from "components/Common/ToolTip";

export default function ActiveCard({ item, content, ClassNameCard }) {
  const { Labels } = useLang();
  return (
    <div className="box">
      <div className="box-title-container">
        <div>
          <h6 className="box-title">{item?.SchemeName}</h6>
          <span className="box-title1">
            {item?.clientName} ({item?.ClientCode})
          </span>
          <span className="box-title1">
            {Labels.folioNumber} : {item?.Folio}
          </span>
        </div>
        {ClassNameCard !== "TerminiatedClass" && (
          <ToolTip
            children={
              <div className="drop-down" id="sip-dropdown-popover">
                <Popover
                  content={content}
                  placement="bottomLeft"
                  overlayClassName="parent-popuover"
                >
                  <img src={MoreIcon} className="sip-menu-icon" alt="Sip" />
                </Popover>
              </div>
            }
            label={Labels.menu}
          />
        )}
      </div>
      <div className="box-content-container">
        <ActiveCardFirstRow
          title1={Labels.startDate}
          title1Value={
            item?.StartDate != null
              ? dateConvertFunction(item?.StartDate)
              : "Null"
          }
          title2={Labels.amount}
          title2Value={`${numberToRupees(item?.Amount)}`}
          title3={Labels.mandateId}
          title3Value={item?.MandateId}
          title4={Labels.sipDay}
          title4Value={item?.SipDay}
        />
        <ActiveCardFirstRow
          title1={Labels.regDate}
          title1Value={
            item?.RegistrationDate != null
              ? dateConvertFunction(item?.RegistrationDate)
              : "Null"
          }
          title2={Labels.frequency}
          title2Value={item?.Frequency}
          title3={Labels.mandatestatus}
          title3Value={item?.MandateStatus}
          title4={Labels.mode}
          title4Value={item?.Mode}
        />

        {ClassNameCard === "ActiveClass" && (
          <ActiveCardFirstRow
            title1={Labels.installmentCompleted}
            title1Value={item?.InstallmentsCompleted}
            title2={Labels.lastInstallment}
            title2Value={
              item?.LastInstallmentDate != null
                ? dateConvertFunction(item?.LastInstallmentDate)
                : "Null"
            }
            title3={Labels.lastPaymentStatus}
            title3Value={item?.LastPaymentStatus}
            title4={Labels.reason}
            title4Value={item?.Reason}
          />
        )}
        {ClassNameCard === "PausedClass" && (
          <ActiveCardFirstRow
            title1={Labels.pauseStartDate}
            title1Value={
              item?.PauseStartDate != null
                ? dateConvertFunction(item?.PauseStartDate)
                : "Null"
            }
            title2={Labels.pauseEndDate}
            title2Value={
              item?.PauseEndDate != null
                ? dateConvertFunction(item?.PauseEndDate)
                : "Null"
            }
            title3={Labels.reason}
            title3Value={item?.Reason}
          />
        )}

        {ClassNameCard === "TerminiatedClass" && (
          <ActiveCardFirstRow
            title1={Labels.installmentCompleted}
            title1Value={item?.InstallmentsCompleted}
            title2={Labels.lastInstallment}
            title2Value={
              item?.LastInstallmentDate != null
                ? dateConvertFunction(item?.LastInstallmentDate)
                : "Null"
            }
            title3={Labels.reason}
            title3Value={item?.Reason}
          />
        )}
      </div>
      {ClassNameCard === "ProvisionalClass" && item?.Reason !== "" && (
        <div className="row">
          <div className="col-md-12">
            <div className="box-reason-container">
              <h6 className="box-reason-title">{Labels.reason}</h6>
              <div className="row">
                <div className="col-md-8">
                  <h6 className="box-reason-desc">{item?.Reason}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
