import React, { useEffect, useState, useCallback } from "react";
import "./style.scss";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InvestedSummary from "./investmentSummary";
import InvestedIn from "./investedIn";
import {
  getAllProductInvest,
  getSchemeDataFromProduct,
} from "redux/action/clientFlow/DashboardAct";
import SugestedInvest from "./suggestedInvest";
import { getDataFromStorage } from "service/helperFunctions";
import Popup from "components/Common/Popup/Popup";
import ReportIcon from "assets/images/report.svg";
import { Tabs, Tab } from "react-bootstrap";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { PageLoader } from "components/Common/PageLoader";

const { USER_ROLE_kEY, USER_ROLE_DATA } = endpoints.auth;

function ClientDashboardComp({
  getAllProductInvestApiCall,
  getSchemeDataFromProductApiCall,
}) {
  const [userList, setUserList] = useState({});
  const [noData, setNoData] = useState(false);
  let [loaderId, setLoaderId] = useState(null);
  let [loader, setLoader] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const [schemeData, setSchemeData] = useState(null);
  const [pageLoaderState, setPageLoaderState] = useState(true);
  const { Labels } = useLang();

  const getAllProductInvestFn = useCallback(
    (ClientCode) => {
      let body = {
        Client_Code: ClientCode,
        param1: "",
      };
      getAllProductInvestApiCall(body).then((data) => {
        if (data) {
          setPageLoaderState(false);
          setUserList(data);
          data?.otherInvestmentDetail?.filter(
            ({ CurrentValue }) => CurrentValue > 0 && setNoData(true)
          );
        }
      });
    },
    [getAllProductInvestApiCall]
  );

  useEffect(() => {
    let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
    if (userRoleData) {
      let { ClientCode } = userRoleData;
      getAllProductInvestFn(ClientCode);
    }
  }, [getAllProductInvestFn]);

  const handleInfo = (id) => {
    setLoaderId(id);
    setLoader(true);
    setInfoPopup(false);
    let body = {
      ProductCategoryId: id,
      LanguageId: endpoints.auth.LanguageId,
      ClientCode: "",
      device: "",
      AMCCode: "",
      SebiCategoryId: "",
      SebiSubCategoryId: "",
      DefaultProductId: "",
    };
    getSchemeDataFromProductApiCall(body).then((data) => {
      if (data?.ObjectResponse?.TitleResponse) {
        setSchemeData({ ...data?.ObjectResponse?.TitleResponse[0] });
        setInfoPopup(true);
        setLoader(false);
      }
    });
  };
  if (pageLoaderState) {
    return <PageLoader />;
  }
  return (
    <>
      <div className="client-dashboard">
        <div className="top-section">
          <InvestedSummary investmentSummary={userList?.InvestmentSummary} />
        </div>
        <div className="invest-tab">
          {noData && (
            <Tabs
              defaultActiveKey="Productwise"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="Productwise" title={Labels.productWise}>
                <div className="middle-section invested-in">
                  <div className="content-title invest-title">
                    <span>{Labels.investedIn}</span>
                  </div>
                  <div className="section-content">
                    <InvestedIn
                      otherInvestmentDetail={userList?.otherInvestmentDetail}
                      handleInfo={handleInfo}
                      loaderId={loaderId}
                      loader={loader}
                      family={false}
                    />
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Goal wise" title={Labels.goalWise}>
                <div className="goal-wise">{Labels.noData}</div>
              </Tab>
            </Tabs>
          )}
        </div>

        <div className="bottom-section">
          <div className="content-title">
            <span>{Labels.suggestedInvestment}</span>
          </div>
          {userList?.otherInvestmentDetail?.length > 0 ? (
            <SugestedInvest
              otherInvestmentDetail={userList?.otherInvestmentDetail}
              handleInfo={handleInfo}
              loaderId={loaderId}
              loader={loader}
            />
          ) : (
            <p className="mt-5 pt-3 px-3">{Labels.noData}</p>
          )}
        </div>
        {infoPopup && (
          <div className="info-popup-outer">
            <Popup
              isOpen={infoPopup}
              setPopup={(value) => {
                setInfoPopup(value);
                setSchemeData(null);
              }}
            >
              <div className="info-popup">
                <div className="title-block">
                  <span className="pb-3">{Labels.productDetail}</span>
                  <div className="title">
                    <img src={ReportIcon} alt="reportIcon" />
                    <strong>{schemeData?.Title}</strong>
                  </div>
                </div>
                <div
                  className="info-section"
                  dangerouslySetInnerHTML={{
                    __html: schemeData?.TitleDescription,
                  }}
                />
              </div>
            </Popup>
          </div>
        )}
      </div>
    </>
  );
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllProductInvestApiCall: getAllProductInvest,
      getSchemeDataFromProductApiCall: getSchemeDataFromProduct,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ClientDashboardComp));
