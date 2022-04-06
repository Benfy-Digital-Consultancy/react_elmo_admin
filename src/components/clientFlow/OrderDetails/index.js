import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Card } from "antd";
import { getOrderDetails } from "redux/action/clientFlow/OrderAct";
import { getDataFromStorage } from "service/helperFunctions";
import { PageLoader } from "components/Common/PageLoader";
import SearchInput from "components/Common/SearchInput";
import { EmptyRecord } from "components/Common/EmptyRecord";
import Pagination from "components/Common/Pagination/Pagination";
import { OrderDetailsTitles } from "service/helpers/Constants";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import CardDetails from "./CardDetails/index";
import "./orderDetails.scss";

const ViewOrder = (props) => {
  const { Labels } = useLang();
  const { getOrderDetailsApi, history } = props;
  const [activeTab, setActiveTab] = useState("All");
  const [ListData, setListData] = useState([]);
  const [duplicateListData, setDuplicateListData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(endpoints.auth.pageLimit);
  const [loading, setLoading] = useState(false);

  const orderDetail = useCallback(() => {
    setLoading(true);
    const userRoleDataValue = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    let source = getDataFromStorage(
      endpoints.auth.WHITELIST_SOURCE_DATA,
      endpoints.auth.WHITELIST_SOURCE_KEY
    );
    if (userRoleDataValue) {
      let client_code = userRoleDataValue?.ClientCode;
      let sub_broker_code = userRoleDataValue?.SubBroker_Code;
      let body = {
        ClientCode: client_code,
        SubbrokerCode: sub_broker_code,
        PageNumber: page,
        Pagesize: pageCount,
        SortbyColumn: "OrderDate",
        SortbyDirection: "desc",
        WhereState: activeTab,
        WhereType: "ALL",
        userRequest: {
          AppOrWeb: endpoints.auth.WEB,
          deviceInfo: endpoints.auth.APIDEVICEINFO,
          LoggedInRoleId: userRoleDataValue?.role_id,
          Source: source,
          UID: userRoleDataValue?.uid,
        },
      };
      getOrderDetailsApi(body)
        .then((data) => {
          setListData([...data.ViewOrderListWeb]);
          setDuplicateListData([...data.ViewOrderListWeb]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [getOrderDetailsApi, activeTab, page, pageCount]);

  useEffect(() => {
    orderDetail();
  }, [orderDetail]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearch("");
    setPage(1);
    setPageCount(endpoints.auth.pageLimit);
  };

  const searchHandler = (key) => {
    setSearch(key);
    const searchFilteredData = duplicateListData.filter(
      ({ Order_number, Folio_Number, SchemeName }) => {
        return (
          Order_number.indexOf(key) !== -1 ||
          Folio_Number.indexOf(key) !== -1 ||
          SchemeName?.toLowerCase().indexOf(key.toLowerCase()) !== -1
        );
      }
    );
    setListData(searchFilteredData);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <div className="view-order-page">
        <div className="rmvieworder-container">
          <SearchInput
            placeholder={`${Labels.searchBy} ${Labels.orderNumber}, ${Labels.schemeName}, ${Labels.folioNumber}`}
            className="rmvieworder-placholder"
            value={search}
            onChange={(e) => {
              searchHandler(e.target.value);
            }}
          />
          <div className="cursor-pointer">
            <span
              className="cut-title"
              onClick={() => history.push("/order-details/cut-off-times")}
            >
              {Labels.cutoffTime}
            </span>
          </div>
        </div>
        <div className="tab-bar pt-3">
          {OrderDetailsTitles.map((item, index) => {
            return (
              <div
                className={"tab " + (activeTab === item?.title ? "active" : "")}
                onClick={() => handleTabChange(item?.title)}
                key={index}
              >
                {item?.title}
              </div>
            );
          })}
        </div>
        <div className="box-list-section">
          {activeTab && (
            <div className="box">
              {ListData?.length > 0 ? (
                ListData?.map((list, index) => {
                  return (
                    <div key={index} className="mb-2">
                      <Card>
                        <CardDetails data={list} />
                      </Card>
                    </div>
                  );
                })
              ) : (
                <EmptyRecord />
              )}
            </div>
          )}
          {ListData &&
            ListData?.length > 0 &&
            (search?.length === 0 ? (
              <Pagination
                pageNumber={page}
                pageChange={setPage}
                handlePageSize={(limit) => {
                  setPageCount(limit);
                  setPage(1);
                }}
                totalPages={
                  search?.length === 0
                    ? ListData[0].TotalCount / pageCount
                    : ListData?.length / pageCount
                }
                pageSize={pageCount}
              />
            ) : null)}
        </div>
      </div>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getOrderDetailsApi: getOrderDetails,
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    ViewOrderListWeb: state.orderDetailsStore.ViewOrderListWeb,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewOrder));
