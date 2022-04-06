import React, { useState, useEffect, useCallback } from "react";
import "./NavHistory.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NavTable from "./NavTable/NavTable";
import { getNavHistory } from "../../../../redux/action/clientFlow/MutualFundAct";
import NavChart from "./NavChart/Navchart";
import moment from "moment";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { getDataFromStorage } from "../../../../service/helperFunctions";
import { navChartOptions } from "service/helpers/Constants";
import { EmptyRecord } from "components/Common/EmptyRecord";
import { PageLoader } from "components/Common/PageLoader";
import { BreadCrumbs } from "components/Common/BreadCrumbs";

const NavHistory = (props) => {
  const { Labels } = useLang();
  const [navDetails, setNavDetails] = useState([]);
  const [chartOptions, setChartOptions] = useState({ ...navChartOptions });
  const [currentView, setCurrentView] = useState("1y");
  const [currentNavList, setNavCurrentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getNavHistoryApi, history } = props;

  // breadcrumbs
  const breadCrumbsList = [
    {
      redirection: () => history.goBack(),
      label: Labels.mutualFundTitle,
    },
    {
      label: Labels.navHistory,
    },
  ];

  const navHistoryFunc = useCallback(
    (FromDate) => {
      const { NAV_HISTORY_DATA, NAV_HISTORY_DATA_KEY } = endpoints.auth;
      let navHistoryData = getDataFromStorage(
        NAV_HISTORY_DATA_KEY,
        NAV_HISTORY_DATA
      );

      let currentDate = moment(new Date()).format("YYYY-MM-DD");
      let body = {
        SchemeCode: navHistoryData?.SchemeCode || navHistoryData?.RTASchemeCode,
        ToDate: currentDate,
        FromDate,
      };
      getNavHistoryApi(body)
        .then((data) => {
          setNavDetails(data.SchemeWiseList);
          let datas =
            data?.SchemeWiseList && data?.SchemeWiseList[0]
              ? [...data?.SchemeWiseList[0]?.NavList]
              : [];
          setNavCurrentList([...datas]);
          let optionData = datas.map((list) => {
            let dateValue = moment(list.NAVDate);
            return {
              y: list.NAV,
              x: dateValue.valueOf(),
            };
          });
          if (optionData.length === datas.length) {
            navChartOptions.series[0].data = optionData;
            setChartOptions({ ...navChartOptions });
            setIsLoading(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    },
    [getNavHistoryApi]
  );

  useEffect(() => {
    setIsLoading(true);
    let date = moment().subtract(1, endpoints.year);
    let payloadDate = moment(date).format("YYYY-MM-DD");
    navHistoryFunc(payloadDate);
  }, [navHistoryFunc]);

  const getCallBack = (callbackArg, filterData, filterType) => {
    setCurrentView(callbackArg);
    if (callbackArg === endpoints.all) {
      navHistoryFunc(endpoints.auth.chartDate);
    } else {
      let date = moment().subtract(filterData, filterType);
      let payloadDate = moment(date).format("YYYY-MM-DD");
      navHistoryFunc(payloadDate);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="nav-history-page">
      <div className="nav-page-title">
        <BreadCrumbs breadCrumbsList={breadCrumbsList} />
        <div className="right-side">
          <label
            className={currentView === "1m" && "active"}
            onClick={() => getCallBack("1m", 1, endpoints.month)}
          >
            1 {Labels.month}
          </label>
          <label
            className={currentView === "3m" && "active"}
            onClick={() => getCallBack("3m", 3, endpoints.month)}
          >
            3 {Labels.months}
          </label>
          <label
            className={currentView === "6m" && "active"}
            onClick={() => getCallBack("6m", 6, endpoints.month)}
          >
            6 {Labels.months}
          </label>
          <label
            className={currentView === "1y" && "active"}
            onClick={() => getCallBack("1y", 1, endpoints.year)}
          >
            1 {Labels.year}
          </label>
          <label
            className={currentView === "3y" && "active"}
            onClick={() => getCallBack("3y", 3, endpoints.year)}
          >
            3 {Labels.years}
          </label>
          <label
            className={currentView === "5y" && "active"}
            onClick={() => getCallBack("5y", 5, endpoints.year)}
          >
            5 {Labels.years}
          </label>
          <label
            className={currentView === endpoints.all && "active"}
            onClick={() => getCallBack(endpoints.all)}
          >
            {Labels.all}
          </label>
        </div>
      </div>
      {navDetails?.length !== 0
        ? navDetails.map((item, index) => (
          <div className="page-content" key={index}>
            <div className="page-content-bg">
              <div className="current-title">
                <div className="left">
                  <strong>{item.SchemeName}</strong>
                </div>
              </div>
              <NavChart chartOptions={chartOptions} />
            </div>
            <NavTable currentNavList={currentNavList} />
          </div>
        ))
        : !isLoading && <EmptyRecord />}
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getNavHistoryApi: getNavHistory,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(NavHistory));
