import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import "./style.scss";
import { getPushNotification } from "redux/action/clientFlow/DashboardAct";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppBack } from "components/Common/AppBack";
import { getDataFromStorage, date } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { PageLoader } from "components/Common/PageLoader";
import Pagination from "components/Common/Pagination/Pagination";
import SearchInput from "components/Common/SearchInput";
import { EmptyRecord } from "components/Common/EmptyRecord";

function Notification(props) {
  const { Labels } = useLang();
  let { history, getPushNotificationApiCall } = props;
  const [notificationList, SetNotificationList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(endpoints.auth.pageLimit);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const getNotificationFn = useCallback(
    (userRoleData) => {
      let { role_id, code } = userRoleData;
      let body = { RoleId: role_id, CustomCode: code };
      setLoading(true);
      getPushNotificationApiCall(body)
        .then(({ MessageList }) => {
          setFilteredList(MessageList);
          SetNotificationList(MessageList);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    },
    [getPushNotificationApiCall]
  );

  useEffect(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    if (userRoleData) {
      getNotificationFn(userRoleData);
    }
  }, [getNotificationFn]);

  if (loading) {
    return <PageLoader />;
  }

  // handleToSearch
  const searchHandler = (key) => {
    setSearchInputValue(key);
    const searchFilteredData = notificationList.filter(
      ({ message: { data } }) => {
        return data?.Title.toLowerCase().indexOf(key.toLowerCase()) !== -1;
      }
    );
    setFilteredList([...searchFilteredData]);
  };

  let today = new Date();

  let currentDate = date(today);

  return (
    <>
      <AppBack
        onClick={() => history.push("/dashboard/mutual-fund")}
        label={Labels.notifications}
      />

      <div className="notifcations">
        <div className="notify-block">
          <SearchInput
            placeholder={Labels.search}
            value={searchInputValue}
            onChange={(e) => {
              searchHandler(e.target.value);
            }}
          />
          <h4 className="notify">
            <span>Today</span> ({filteredList.length} new notifications)
          </h4>
          {filteredList.length > 0 ? (
            filteredList.map(
              ({ message: { data } }, index) =>
                page * pageCount >= index + 1 &&
                (page - 1) * pageCount < index + 1 && (
                  <div className="notifications-card" key={index}>
                    <div
                      className={`${
                        date(data.CustomDate) === currentDate && "current-date"
                      } card-body position-relative`}
                    >
                      <div className="card-content">
                        <h4 className="title">{data?.Title}</h4>
                        <p>
                          <span className="expend"> {Labels.customName} :</span>{" "}
                          {data?.CustomName ? data?.CustomName : "-"}
                        </p>
                        <p>
                          <span className="expend">{Labels.fundName} :</span>{" "}
                          {data?.Body ? data?.Body : ""}
                        </p>
                        <p>
                          <span className="expend">{Labels.value} :</span>{" "}
                          {Labels.rs} {data?.Amount ? data?.Amount : ""}
                        </p>
                      </div>
                      <div>
                        <p className={` date`}>
                          {Labels.due} :{" "}
                          {currentDate === date(data.CustomDate)
                            ? "Today"
                            : date(data.CustomDate)
                            ? date(data.CustomDate)
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )
          ) : (
            <EmptyRecord />
          )}
        </div>
        {filteredList && filteredList?.length > 0 && (
          <Pagination
            pageNumber={page}
            pageChange={setPage}
            handlePageSize={(limit) => {
              setPageCount(limit);
              setPage(1);
            }}
            pageSize={pageCount}
            totalPages={filteredList?.length / pageCount}
          />
        )}
      </div>
    </>
  );
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getPushNotificationApiCall: getPushNotification,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(Notification));
