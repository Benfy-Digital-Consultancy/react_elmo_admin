import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { getViewTransactionHistory } from "redux/action/clientFlow/MutualFundAct";
import Pagination from "components/Common/Pagination/Pagination";
import { PageLoader } from "components/Common/PageLoader";
import { MonthList } from "service/helpers/Constants";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import {
  percentageValidator,
  numberToRupees,
  getDataFromStorage,
  amountWithRs,
  amountWithoutRs,
  imageConditionValidate,
} from "service/helperFunctions";
import "./TransactionHistory.scss";
import { BreadCrumbs } from "components/Common/BreadCrumbs";

const TransactionHistory = (props) => {
  const { Labels } = useLang();
  const { getViewTransactionHistoryApi, history } = props;
  const [page, setPage] = useState(1);
  const [folioNumber, setFolioNumber] = useState();
  const [panNumber, setPanNumber] = useState();
  const [schemeCode, setSchemeCode] = useState();
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(endpoints.auth.pageLimit);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const breadCrumbsList = [
    {
      redirection: () => history.push("/dashboard"),
      label: Labels.dashboard,
    },
    {
      redirection: () => history.goBack(),
      label: Labels.mutualFundTitle,
    },
    {
      label: Labels.transactionHistory,
    },
  ];

  useEffect(() => {
    setLoading(true);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setFolioNumber(params.get("FolioNo"));
    setPanNumber(params.get("PAN"));
    setSchemeCode(params.get("RTASchemeCode"));
    const userRoleDataValue = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    if (userRoleDataValue && folioNumber && schemeCode) {
      let client_code = userRoleDataValue?.ClientCode;
      let body = {
        ClientCode: client_code,
        FolioNo: folioNumber,
        PAN: panNumber,
        RTASchemeCode: schemeCode,
      };
      getViewTransactionHistoryApi(body)
        .then((data) => {
          setTransactionHistory(data?.transactionDetailsList);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [folioNumber, panNumber, schemeCode, getViewTransactionHistoryApi]);

  const { investments, transactionHistorylist } =
    transactionHistory?.length > 0 ? transactionHistory[0] : {};

  const finalDate = (date) => {
    let splitDate = date.split("/");
    if (splitDate.length === 3) {
      return `${splitDate[0]} ${MonthList[Number(splitDate[1]) - 1].substring(
        0,
        3
      )} ${splitDate[2]}`;
    } else {
      return date;
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <div className="transaction-history">
        <div className="current-page-title">
          <h1 className="page-name">
            <BreadCrumbs breadCrumbsList={breadCrumbsList} />
          </h1>
        </div>
        <div className="page-content">
          <div className="title-block">
            <h1>{investments?.SchemeName}</h1>
            <div className="list">
              <div>
                {Labels.folioNumber} :{" "}
                <span className="fw-600">{investments?.FolioNo}</span>
              </div>
              <div>
                {investments?.SchemeCategoryType.split(":")[0]}
                {":"}
                <span className="fw-600">
                  {investments?.SchemeCategoryType.substring(
                    investments?.SchemeCategoryType.indexOf(":") + 1
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="middle-block">
            <div>
              {Labels.latestNav} :{" "}
              <strong>{amountWithRs(investments?.NAV)}</strong>
            </div>
            <div>
              {Labels.avgPurchasePrice} :{" "}
              <strong>{amountWithRs(investments?.PurchasePrice)}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <div>{Labels.investment} :</div>
              <strong>{numberToRupees(investments?.TotalInvestment)}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <div>{Labels.absoluteReturn} :</div>
              <strong
                className={
                  investments?.AbsoluteReturn > 1
                    ? "green-text ps-3"
                    : "red-text ps-3"
                }
              >
                {percentageValidator(investments?.AbsoluteReturn)}
              </strong>
              {imageConditionValidate(investments?.AbsoluteReturn)}
            </div>
            <div>
              {Labels.units} : <strong>{investments?.Units}</strong>
            </div>
            <div>
              {Labels.navDate} : <strong>{investments?.Nav_Date}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <div>{Labels.currentValue} : </div>
              <strong>{numberToRupees(investments?.CurrentTotalValue)}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <div>{Labels.annualizedReturn} :</div>
              <strong
                className={investments?.XIRR > 1 ? "green-text" : "red-text"}
              >
                {percentageValidator(investments?.XIRR)}
              </strong>
              {imageConditionValidate(investments?.XIRR)}
            </div>
          </div>
          <div className="table-block">
            <table cellPadding="0" cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th width="30%"></th>
                  <th width="20%" className="text-left">
                    {Labels.date}
                  </th>
                  <th width="30%" className="text-center">
                    {Labels.value} ({Labels.rs}) (#{Labels.units})
                  </th>
                  <th width="20%" className="text-right">
                    {Labels.nav} ({Labels.rs})
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="empty-height" height="12"></td>
                </tr>
                {transactionHistorylist?.map((item, index) => {
                  return (
                    page * pageCount >= index + 1 &&
                    (page - 1) * pageCount < index + 1 && (
                      <React.Fragment key={index}>
                        <tr className="transaction-table-ui">
                          <td className="transaction-table-title">
                            <span
                              className={
                                item?.TransactionType === "BUY"
                                  ? "green"
                                  : item?.TransactionType === "SELL"
                                  ? "red"
                                  : "blue"
                              }
                            >
                              {item?.TransactionType}
                            </span>
                            {item?.TransactionDescription}
                          </td>
                          <td className="text-left">
                            <div>{finalDate(item?.TransactionDate)}</div>
                          </td>
                          <td className="text-center">
                            <div className="transaction-table-strong">
                              {amountWithoutRs(item?.Amount)}{" "}
                              <span className="transaction-table-span">
                                (# {item?.Units})
                              </span>
                            </div>
                          </td>
                          <td className="text-right">
                            <div>{amountWithoutRs(item?.PurchasePrice)}</div>
                          </td>
                        </tr>
                        <tr>
                          <td className="empty-height" height="6"></td>
                        </tr>
                      </React.Fragment>
                    )
                  );
                })}
              </tbody>
            </table>
          </div>
          {transactionHistorylist && transactionHistorylist?.length > 0 && (
            <Pagination
              pageNumber={page}
              pageChange={setPage}
              handlePageSize={(limit) => {
                setPageCount(limit);
                setPage(1);
              }}
              totalPages={transactionHistorylist?.length / pageCount}
            />
          )}
          <div className="mb-5"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getViewTransactionHistoryApi: getViewTransactionHistory,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(TransactionHistory));
