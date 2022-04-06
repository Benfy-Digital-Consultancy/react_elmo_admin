import React, { useState, useEffect, useCallback } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import ShareIcon from "assets/images/share-blue.svg";
import CalculaterPopup from "./CalculaterPopup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import SchemeDetailsCard from "./SchemeDetailsCard";
import { getSchemesData } from "redux/action/clientFlow/BuyInvestAct";
import {
  getDataFromStorage,
  setDataFromStorage,
} from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { useHistory } from "react-router-dom";
import { PageLoader } from "components/Common/PageLoader";

const SchemeDetailsCategory = (props) => {
  let { getSchemesDataApi } = props;
  const { schemeLabel } = useParams();
  const history = useHistory();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let schemeTitle = params.get("schemeTitle");
  let productId = params.get("productId");

  let [popup, setPopup] = useState(false);
  let [schemeDetailsData, setSchemeDetailsData] = useState([]);
  const [checkboxList, setCheckboxList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const breadCrumbsList = [
    {
      redirection: () => history.push("/buy-investment"),
      label: schemeLabel,
    },
    {
      label: schemeTitle,
    },
  ];

  const handleChangeCheckbox = (data) => {
    const { SchemeCode } = data;
    let newData = checkboxList;
    if (newData.indexOf(SchemeCode) !== -1) {
      setCheckboxList(newData.filter((val, index) => val !== SchemeCode));
    } else {
      newData.push(SchemeCode);
      setCheckboxList([...newData]);
    }
  };

  const getInvestSchemeDataFn = useCallback(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    setIsLoading(true);
    const { ClientCode } = userRoleData;
    let payload = { ClientCode: ClientCode, ProductCategoryId: 1 };
    getSchemesDataApi(payload).then((data) => {
      setIsLoading(false);
      const { schemeList } = data;
      setSchemeDetailsData(schemeList);
    });
  }, [getSchemesDataApi]);

  useEffect(() => {
    if (productId) {
      getInvestSchemeDataFn();
    }
  }, [getInvestSchemeDataFn, productId]);

  // handleCreateMandate

  // navigateToBuyinvestment

  const handleToNavigate = () => {
    const { BUY_INVESTMENT_DATA, BUY_INVESTMENT_KEY } = endpoints.auth;
    setDataFromStorage(checkboxList, BUY_INVESTMENT_DATA, BUY_INVESTMENT_KEY);
    history.push("/buyInvestment");
  };

  useEffect(() => {
    sessionStorage.removeItem(endpoints?.auth?.BUY_INVESTMENT_DATA);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="scheme-details">
      <div className="scheme-details-breadcrumbs">
        <div className="scheme-details-container">
          <BreadCrumbs breadCrumbsList={breadCrumbsList} />
          <div className="scheme-share-icons">
            <img src={ShareIcon} alt="ShareIcon" />
          </div>
        </div>
        <div className="scheme-invest-calculator">
          <p className="mb-0" onClick={() => setPopup(true)}>
            Investment Calculator
          </p>
        </div>
      </div>

      {schemeDetailsData &&
        schemeDetailsData?.map((schemeData, id) => {
          return (
            <div key={id}>
              <SchemeDetailsCard
                schemeData={schemeData}
                handleChangeCheckbox={handleChangeCheckbox}
              />
            </div>
          );
        })}

      <div className="scheme-btn-container">
        <button
          disabled={checkboxList.length > 0 ? false : true}
          className="primary-btn"
          onClick={() => handleToNavigate()}
        >
          Continue
        </button>
      </div>
      <CalculaterPopup setPopup={setPopup} popup={popup} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSchemesDataApi: getSchemesData,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(SchemeDetailsCategory);
