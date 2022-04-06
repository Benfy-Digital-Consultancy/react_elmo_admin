import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import "./View.scss";
import { CommonSelect } from "components/Common/CommonSelect";
import { endpoints } from "service/helpers/config";
import { getDataFromStorage } from "service/helperFunctions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router";
import { EmptyRecord } from "components/Common/EmptyRecord";
import {
  getFinancialYearDetails,
  getCashFlowReportAction,
  getDividendReportAction
} from "redux/action/clientFlow/ReportAct";
import { DatePicker } from "components/Common";
import { useLang } from "hooks/useLang";
import MandateTable from "../MandateTable";
import CashFlowTable from "../CashFlowTable";
import DividendFlowTable from "../DividendFlowTable";
import excel from "assets/images/excel.svg";
import pdf from "assets/images/pdf-new.png";
import { PageLoader } from "components/Common/PageLoader";
import { BreadCrumbs } from "components/Common/BreadCrumbs";

const ViewReportTable = (props) => {
  const { Labels, errorText } = useLang();
  const { reportId, reportName } = useParams();
  const {
    financialList, getFinancialYearDetailsApi,
    getDividendReportActionApi, getCashFlowReportActionApi } = props;
  let history = useHistory();
  const [value, setValue] = useState("");
  const [noData, setNoData] = useState(false);
  const [dividendData, setDividendData] = useState([])
  const [StartDate, setStartDate] = useState('')
  const [Enddate, setEnddate] = useState('')
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredSearch, setFilteredSearch] = useState("");
  const [cashFlowData, setCashFlowData] = useState([])
  const [showError, setShowError] = useState(false)
  const [showStartDateError, setStartDateError] = useState(false)
  const [loadData, setLoadData] = useState(true)
  const [loadReport, setLoadReport] = useState(false)
  const [xlxsData, setXlXsData] = useState([])
  const [xlxsDividendData, setxlxsDividendData] = useState([])

  const handleChange = (e) => {
    let { value } = e.target;
    setValue(value);
    setShowError(false)
  };

  const handleDateChange = (e, key) => {
    let { value } = e.target
    if (key === endpoints.StartDate) {
      setStartDateError(false)
      setStartDate(value)
    } else {
      setEnddate(value)
      setShowError(false)
    }
  }

  // breadcrumbs
  const breadCrumbsList = [
    {
      redirection: () => history.goBack(),
      label: Labels.Reports,
    },
    {
      label: reportName,
    },
  ];

  // finacial array list
  const financialDataList = useCallback(() => {
    const { USER_DETAILS, USER_DETAILS_KEY } = endpoints.auth;
    let userClientCode = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
    let body = {
      clientCode: userClientCode?.UserReferralInfo.ClientCode,
    };
    getFinancialYearDetailsApi(body)
      .then(() => {

      })
  }, [getFinancialYearDetailsApi])

  // cash flow api
  const cashFlowDataTable = useCallback(() => {
    setLoadData(true)
    const { USER_DETAILS, USER_DETAILS_KEY } = endpoints.auth;
    let userClientCode = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
    let body = {
      clientCode: userClientCode?.UserReferralInfo.ClientCode,
      Year: endpoints.all
    };
    getCashFlowReportActionApi(body)
      .then((response) => {
        setLoadData(false)
        setCashFlowData(response.ObjectResponse.cashflowlist);
        setFilteredSearch(response.ObjectResponse.cashflowlist);
        setXlXsData(response.ObjectResponse.Path)
      })
      .catch(() => {
        setLoadData(false)
      });
  }, [getCashFlowReportActionApi]);

  const onClickExcel = (data) => {
    var a = window.document.createElement("a");
    a.href = data
    a.download = data
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const onClickExcelBlob = () => {
    var a = window.document.createElement("a");
    a.href = document.getElementById("iframe").src
    a.download = document.getElementById("iframe").src
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // handleToSearch
  const searchHandler = () => {
    if (!value) {
      setShowError(true)
    } else {
      setShowError(false);
      setSearchInputValue(value);
      const searchFilteredData = filteredSearch.filter(({ Year }) => {
        return value.includes(Year + '')
      });
      setCashFlowData(searchFilteredData);
    }
  };

  const validationFields = (reportId) => {
    switch (reportId) {
      case "2": {
        if (!value) {
          setShowError(true)
          return false
        } else {
          setShowError(false)
          return true
        }
      }
      case "3": {
        if (!StartDate) {
          setStartDateError(true)
          return false
        } else if (!Enddate) {
          setStartDateError(false)
          setShowError(true)
          return false
        }
        else {
          setStartDateError(false)
          setShowError(false)
          return true
        }
      }
      case "4": {
        if (!StartDate) {
          setStartDateError(true)
          return false
        } else if (!Enddate) {
          setStartDateError(false)
          setShowError(true)
          return false
        }
        else {
          setStartDateError(false)
          setShowError(false)
          return true
        }
      }
      default:
        break;
    }
  }

  const handleClickGenerate = async () => {
    let isValid = validationFields(reportId);
    if (isValid) {
      const { USER_DETAILS, USER_DETAILS_KEY, TOKEN, TOKEN_KEY } = endpoints.auth;
      let userClientCode = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
      let token = getDataFromStorage(TOKEN, TOKEN_KEY);
      let data = {
        ReportId: reportId,
        SelectedClientIds: [userClientCode.UserReferralInfo.ClientCode],
        FinancialYear: " ",
        FromDate: "",
        ToDate: "",
        IsConsolidateReport: false,
        SubbrokerCode: [userClientCode.subBrokerDetails.SubBroker_Code],
        ReportType: ""
      };
      switch (reportId) {
        case "2": {
          data.FinancialYear = value
          break;
        }
        case "3": {
          data.FromDate = StartDate;
          data.ToDate = Enddate;
          break;
        }
        case "4": {
          data.FromDate = StartDate;
          data.ToDate = Enddate;
          break;
        }
        default: {
          break;
        }
      }
      let fileType =
        endpoints.reportType === endpoints.fileDownload.xlsx
          ? endpoints.fileDownload.xlsx
          : endpoints.fileDownload.pdf;
      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL_REPORT + endpoints.reportType,
        responseType: endpoints.blob,
        headers: { token: token },
        data: data,
      };
      let response = await axios(config);
      const file = new Blob([response.data], { type: fileType });
      if (file.size !== 0) {
        var blob_url = URL.createObjectURL(file);
        setNoData(false);
        setLoadReport(true)
        document.getElementById("iframe").src = blob_url;
      } else {
        setNoData(true);
        setLoadReport(false)
        if (document.getElementById("iframe")) {
          document.getElementById("iframe").src = ""
        }
      }
    }

  };

  // dividend api call
  const handleClickDividend = () => {
    if (!StartDate) {
      setStartDateError(true)
      return
    } else if (!Enddate) {
      setStartDateError(false)
      setShowError(true)
      return
    }
    setStartDateError(false)
    setShowError(false)
    const { USER_DETAILS, USER_DETAILS_KEY } = endpoints.auth;
    let userClientCode = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
    let sDate = moment(StartDate).format('MM/DD/YYYY');
    let eDate = moment(Enddate).format('MM/DD/YYYY');
    let body =
    {
      clientCode: userClientCode.UserReferralInfo.ClientCode,
      Startdate: sDate,
      Enddate: eDate,
    }
    getDividendReportActionApi(body)
      .then((response) => {
        if (response.ObjectResponse.DividentPaidList) {
          setLoadReport(true)
          setNoData(false)
          setDividendData(response.ObjectResponse.DividentPaidList)
          setxlxsDividendData(response.ObjectResponse.Path)
        } else {
          setLoadReport(false)
          setNoData(true)
        }
      })
      .catch(() => {
        setLoadReport(false)
        setNoData(true)
      });
  }

  useEffect(() => {
    financialDataList()
    cashFlowDataTable();

  }, [financialDataList, cashFlowDataTable]);

  if (loadData) {
    return <PageLoader />;
  }

  return (
    <div className="view-report-view">
      <BreadCrumbs breadCrumbsList={breadCrumbsList} />
      {reportId === "1" &&
        <div className="reportId-div">
          {
            noData ?
              <div>
                <div className="excel-pdf" onClick={() => onClickExcelBlob()}>
                  <img src={excel} alt="excel" className="excel-img" />
                  <img src={pdf} alt="pdf" />
                </div>
                <iframe
                  id="iframe"
                  title={Labels.Report}
                  style={{ width: "100%", height: 500 }}
                />
              </div>
              :
              <EmptyRecord />
          }
        </div>
      }

      {reportId === "2" &&
        <div className=" reportId-div">
          <div className="row">
            <div className="col-3">
              <CommonSelect
                placeholder={Labels.SelectTheYear}
                options={financialList}
                name="Financial_Date"
                value={value}
                label={Labels.FinancialYear}
                onChange={(e) => handleChange(e)}
                customClass="mt-3"
                allowClear
                onClear={() => setValue("")}
                errorMessage={
                  showError &&
                  errorText?.pleaseSelectTheValue
                }
              />
            </div>
            <div className=" col-3 button-input btn-generate">
              <button
                className="primary-btn button-fontsize"
                onClick={() => handleClickGenerate()}
              >
                {Labels.GenerateReport}
              </button>
            </div>
          </div>
          {loadReport &&
            (<div>
              <div className="excel-pdf" onClick={() => onClickExcelBlob()}>
                <img src={excel} alt="excel" className="excel-img" />
                <img src={pdf} alt="pdf" />
              </div>
              <iframe
                id="iframe"
                title={Labels.Report}
                style={{ width: "100%", height: 500 }}
              />
            </div>)}
          {noData && (
            <EmptyRecord />
          )}
        </div>
      }

      {reportId === "3" &&
        <div className="reportId-div">
          <div className="row">
            <div className="col-3">
              <DatePicker
                label={Labels.fromDate}
                onChange={(e) => handleDateChange(e, endpoints.StartDate)}
                name="Startdate"
                errorMessage={
                  showStartDateError && errorText?.pleaseSelectTheValue
                }
                value={StartDate}
              />
            </div>
            <div className="col-3">
              <DatePicker
                label={Labels.toDate}
                onChange={(e) => handleDateChange(e, endpoints.EndDate)}
                value={Enddate}
                errorMessage={
                  showError && errorText?.pleaseSelectTheValue
                }
                name="Enddate"
              />
            </div>
            <div className="col-3 btn-generate-four">
              <div className=" col-3 button-input btn-generate-four">
                <button
                  className="primary-btn button-fontsize"
                  onClick={() => handleClickGenerate()}>
                  {Labels.GenerateReport}
                </button>
              </div>
            </div>
          </div>
          {loadReport &&
            (<div><div className="excel-pdf" onClick={() => onClickExcelBlob()}>
              <img src={excel} alt="excel" className="excel-img" />
              <img src={pdf} alt="pdf" />
            </div>
              <iframe
                id="iframe"
                title={Labels.Report}
                style={{ width: "100%", height: 500 }}
              />
            </div>)}
          {noData && (
            <EmptyRecord />
          )}
        </div>
      }

      {reportId === "4" &&
        <div className="reportId-div">
          <div className="row">
            <div className="col-3">
              <DatePicker
                label={Labels.fromDate}
                onChange={(e) => handleDateChange(e, endpoints.StartDate)}
                name="Startdate"
                errorMessage={
                  showStartDateError && errorText?.pleaseSelectTheValue
                }
                value={StartDate}
              />
            </div>
            <div className="col-3">
              <DatePicker
                label={Labels.toDate}
                onChange={(e) => handleDateChange(e, endpoints.EndDate)}
                value={Enddate}
                errorMessage={
                  showError && errorText?.pleaseSelectTheValue
                }
                name="Enddate"
              />
            </div>
            <div className="col-3 btn-generate-four">
              <div className=" col-3 button-input btn-generate-four">
                <button
                  className="primary-btn button-fontsize"
                  onClick={() => handleClickGenerate()}
                >
                  {Labels.search}

                </button>
              </div>
            </div>
          </div>
          {loadReport &&
            (<div><div className="excel-pdf" onClick={() => onClickExcelBlob()}>
              <img src={excel} alt="excel" className="excel-img" />
              <img src={pdf} alt="pdf" />
            </div>
              <iframe
                id="iframe"
                title={Labels.Report}
                style={{ width: "100%", height: 500 }}
              />
            </div>)}
          {noData && (
            <EmptyRecord />
          )}
        </div>
      }

      {reportId === "6" &&
        <div className="reportId-div">
          {noData ? <div>
            <EmptyRecord />
          </div> : <div>
            <MandateTable />
          </div>}
        </div>
      }

      {reportId === "8" &&
        <div className="reportId-div">
          {
            noData ?
              <div className="reportId-div">
                <div className="excel-pdf" onClick={() => onClickExcelBlob()}>
                  <img src={excel} alt="excel" className="excel-img" />
                  <img src={pdf} alt="pdf" />
                </div>
                <iframe
                  id="iframe"
                  title={Labels.Report}
                  style={{ width: "100%", height: 500 }}
                />
              </div>
              :
              <EmptyRecord />
          }
        </div>
      }

      {reportId === "9" &&
        <div className="reportId-div">
          <div className="row">
            <div className="col-3">
              <DatePicker
                label={Labels.fromDate}
                onChange={(e) => handleDateChange(e, endpoints.StartDate)}
                name="Startdate"
                value={StartDate}
                errorMessage={
                  showStartDateError && errorText?.pleaseSelectTheValue
                }
              />
            </div>
            <div className="col-3">
              <DatePicker
                label={Labels.toDate}
                onChange={(e) => handleDateChange(e, endpoints.EndDate)}
                value={Enddate}
                errorMessage={
                  showError && errorText?.pleaseSelectTheValue
                }
                name="Enddate"
              />
            </div>
            <div className="col-3 btn-generate-four">
              <div className=" col-3 button-input btn-generate-four">
                <button
                  className="primary-btn button-fontsize"
                  onClick={() => handleClickDividend()}
                >
                  {Labels.search}
                </button>
              </div>
            </div>
          </div>
          {loadReport &&
            (<div>
              <div className="excel-pdf" onClick={() => onClickExcel(endpoints?.auth?.xlsxHeader + xlxsDividendData)}>
                <img src={excel} alt="excel" className="excel-img" />
              </div>
              <DividendFlowTable
                dividendData={dividendData}
              />
            </div>)}
          {noData && (
            <EmptyRecord />
          )}
        </div>
      }

      {reportId === "10" &&
        <div className="reportId-div">
          <div className="row ">
            <div className="col-3">
              <CommonSelect
                placeholder={Labels.SelectTheYear}
                options={financialList}
                name="Financial_Date"
                value={value}
                label={Labels.FinancialYear}
                onChange={(e) => handleChange(e)}
                onClear={() => setValue("")}
                customClass="mt-3"
                allowClear
                errorMessage={
                  showError &&
                  errorText?.pleaseSelectTheValue
                }
              />
            </div>
            <div className="col-3 btn-generate-four">
              <div className=" col-3 button-input btn-generate-four">
                <button
                  className="primary-btn button-fontsize"
                  value={searchInputValue}
                  onClick={() => {
                    searchHandler();
                  }}>
                  {Labels.search}
                </button>
              </div>
            </div>
          </div>
          {
            noData ?
              <EmptyRecord /> :
              <div>
                <div className="excel-pdf" onClick={() => onClickExcel(endpoints?.auth?.xlsxHeader + xlxsData)}>
                  <img src={excel} alt="excel" className="excel-img" />
                </div>
                <div>
                  <CashFlowTable
                    cashFlowData={cashFlowData}
                    setFilteredSearch={(data) => setFilteredSearch(data)}
                  />
                </div>
              </div>
          }
        </div>
      }
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getFinancialYearDetailsApi: getFinancialYearDetails,
      getCashFlowReportActionApi: getCashFlowReportAction,
      getDividendReportActionApi: getDividendReportAction
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    financialList: state.reportStore.financialList,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewReportTable));
