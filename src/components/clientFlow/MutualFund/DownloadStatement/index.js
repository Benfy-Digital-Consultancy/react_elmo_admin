import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import moment from "moment";
import { getDataFromStorage } from "service/helperFunctions";
import { DatePicker } from "components/Common";
import Popup from "components/Common/Popup/Popup";
import ErrorComponent from "components/Common/ErrorComponent";
import { downloadRTA } from "redux/action/clientFlow/MutualFundAct";
import { dateRules } from "../validateRules";
import validate from "validate.js";
import { FromDate } from "service/helpers/Constants";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { Toast } from "service/toast";
import { ToolTip } from "components/Common/ToolTip";

const DownloadStatement = (props) => {
  const { Labels, errorText } = useLang();
  const { item, popup, setPopup, downloadRTAApi } = props;
  const [response, setResponse] = useState("");
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [error, setErrors] = useState({});
  const { error_title } = endpoints.response_error_msg;
  const { date_message } = errorText?.download_error_message || {};
  const [statementDetails, setStatementDetails] = useState({
    fromdate: FromDate,
    todate: "",
  });

  const handleChangeFromDate = (date, type) => {
    const tempErrors = { ...error };
    tempErrors[type] = undefined;
    setStatementDetails({ ...statementDetails, [type]: date.target.value });
    setErrors({ ...error, ...tempErrors });
  };

  const validateFields = (data) => {
    const fieldInvalidList = validate(data, dateRules());
    if (fieldInvalidList !== undefined) {
      const errors = {
        ...fieldInvalidList,
      };
      setErrors({ ...errors, ...fieldInvalidList });
    }
    return !fieldInvalidList;
  };

  const generateStatement = (folio_no) => {
    const { fromdate, todate } = statementDetails;
    let body = { fromdate, todate };
    if (!validateFields(body)) return;
    if (
      new Date(fromdate) >= new Date(todate) ||
      new Date(todate) <= new Date(fromdate)
    ) {
      Toast({
        type: error_title,
        message: date_message,
      });
      return null;
    }
    var setfromdate = moment(fromdate).format("DD/MM/YYYY");
    var settodate = moment(todate).format("DD/MM/YYYY");
    const userRoleDataValue = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    if (userRoleDataValue) {
      let client_code = userRoleDataValue?.ClientCode;
      let payload = {
        ClientCode: client_code,
        folio: folio_no,
        CreatedBy: client_code,
        detailed: "Y",
        todate: setfromdate,
        fromdate: settodate,
      };
      downloadRTAApi(payload).then((data) => {
        if (data === null || data?.ObjectResponse?.PdfPath === null) {
          setPopup(false);
          setDownloadPopup(true);
          setResponse(data?.ObjectResponse.Message);
          setStatementDetails({ fromdate: FromDate, todate: "" });
        }
      });
    }
  };

  const dateRange = (current) => {
    const start = moment(FromDate, "YYYY-MM-DD");
    return current < start || current > moment();
  };

  return (
    <React.Fragment>
      <div className="after-tab-buttons d-flex align-items-center justify-content-end">
        <div>
          <Link
            onClick={() => setPopup(true)}
            className="primary-btn bordered green zindex-0"
          >
            <ToolTip
              children={
                <span className="cursor-pointer">
                  {Labels.downloadStatement}
                </span>
              }
              label={Labels.mutualFund.fundStatement}
            />
          </Link>
        </div>
        <div>
          <Link
            to={`/dashboard/mutual-fund/transaction-history?RTASchemeCode=${item?.RTASchemeCode}&FolioNo=${item?.FolioNo}&PAN=${item?.PANNo}`}
            className="primary-btn bordered green zindex-0"
          >
            <ToolTip
              children={
                <span className="cursor-pointer">
                  {Labels.transactionHistory}
                </span>
              }
              label={Labels.mutualFund.previousStatement}
            />
          </Link>
        </div>
      </div>
      {popup && (
        <div className="download-statement-popup">
          <Popup
            overflowChange="overflowChange"
            isOpen={popup}
            setPopup={setPopup}
          >
            <div className="current-popup-title">
              {Labels.downloadStatement}
            </div>
            <div className="popup-width">
              <div className="download-sattement">
                <div className="input-section">
                  <div>
                    <DatePicker
                      label={Labels.fromDate}
                      name={"fromdate"}
                      value={statementDetails?.fromdate}
                      onChange={(date) =>
                        handleChangeFromDate(date, "fromdate")
                      }
                      placeholderText={Labels.fromDate}
                      selected={statementDetails.fromdate}
                      shouldCloseOnSelect={true}
                      disabledDate={dateRange}
                    />
                    {error.fromdate && (
                      <ErrorComponent message={error.fromdate[0]} />
                    )}
                  </div>
                  <DatePicker
                    label={Labels.toDate}
                    name={"todate"}
                    value={statementDetails?.todate}
                    onChange={(date) => handleChangeFromDate(date, "todate")}
                    placeholderText={Labels.toDate}
                    selected={statementDetails.todate}
                    shouldCloseOnSelect={true}
                    disabledDate={dateRange}
                  />
                  {error.todate && <ErrorComponent message={error.todate[0]} />}
                </div>
              </div>
              <div className="buttons">
                <button
                  className="primary-btn"
                  onClick={() => generateStatement(item?.FolioNo)}
                >
                  {Labels.generate}
                </button>
              </div>
            </div>
          </Popup>
        </div>
      )}
      <div className="info-popup-outer">
        {downloadPopup && (
          <Popup
            isOpen={downloadPopup}
            setPopup={(value) => {
              setDownloadPopup(value);
            }}
          >
            <div className="title left-aligned m-2">{response}</div>
          </Popup>
        )}
      </div>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      downloadRTAApi: downloadRTA,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(DownloadStatement));
