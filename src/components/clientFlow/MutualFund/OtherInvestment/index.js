import React, { useEffect, useCallback, useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { otherInvestmentsDetails } from "redux/action/clientFlow/MutualFundAct";
import { getDataFromStorage } from "service/helperFunctions";
import { PageLoader } from "components/Common/PageLoader";
import { endpoints } from "service/helpers/config";
import "./style.scss";
import { useLang } from "hooks/useLang";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { useParams } from "react-router-dom";
import InvestmentData from "./InvestmentData";
import InvestmentCard from "./InvestmentCard";

const OtherInvestment = (props) => {
  const { Labels } = useLang();
  const { otherInvestmentsDetailsApi, history } = props;
  const [isLoading, setIsloading] = useState(false);
  const [investmentsDetails, setInvestmentDetails] = useState({});
  const [dropdownId, setDropdownId] = useState("");

  let { ProductInvestmentList = [], ProductInvestment = {} } =
    investmentsDetails || {};

  console.log(ProductInvestmentList, ProductInvestment, "ashjhsa");
  const { fundType, productId } = useParams();

  const otherInvestmentsApiFunc = useCallback(() => {
    const userRoleDataValue = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    if (userRoleDataValue && productId) {
      setIsloading(true);
      let body = {
        Client_Code: userRoleDataValue?.ClientCode,
        ProductId: productId,
      };
      otherInvestmentsDetailsApi(body)
        .then(({ ObjectResponse }) => {
          setInvestmentDetails(ObjectResponse);
          setIsloading(false);
        })
        .catch(() => setIsloading(false));
    }
  }, [otherInvestmentsDetailsApi, productId]);

  const breadCrumbsList = [
    {
      redirection: () => history.push("/dashboard"),
      label: Labels.dashboard,
    },
    {
      label: fundType,
    },
  ];

  useEffect(() => {
    otherInvestmentsApiFunc();
  }, [otherInvestmentsApiFunc]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <div className="mutual-fund">
        <div className="current-page-title">
          <h1 className="page-name">
            <BreadCrumbs breadCrumbsList={breadCrumbsList} />
          </h1>
        </div>
        <div className="page-content">
          <InvestmentData
            investmentSummary={ProductInvestment}
            productId={productId}
          />
          <div className="other-investments">
            {ProductInvestmentList?.map((item, index) => {
              var tabValue = dropdownId === "mutual-fund-list-" + index;
              return (
                <div
                  key={index}
                  className={`dropdown-list ${tabValue ? "active" : ""}`}
                >
                  <InvestmentCard
                    item={item}
                    tabValue={tabValue}
                    setDropdownId={setDropdownId}
                    index={index}
                    productId={productId}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      otherInvestmentsDetailsApi: otherInvestmentsDetails,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(OtherInvestment));
