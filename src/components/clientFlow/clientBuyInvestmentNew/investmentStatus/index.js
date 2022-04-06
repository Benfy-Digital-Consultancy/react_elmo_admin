import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InvestmentStatusCard from "./investmentStatusCard";
import "./style.scss";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { history } from "service/helpers";

const InvestmentStatus = () => {
  const breadCrumbsList = [
    {
      redirection: () => history.push("/investmentPlan"),
      label: "Invest",
    },
    {
      label: "Confirm Purchase",
    },
  ];

  return (
    <div className="invest_status_scheme_details">
      <div className="scheme-details-breadcrumbs">
        <BreadCrumbs breadCrumbsList={breadCrumbsList} />
      </div>
      <InvestmentStatusCard statusMode={true} />
      <InvestmentStatusCard statusMode={false} />
      <div className="investment_status_button">
        <button className="primary-btn">Confirm</button>
        <button className="primary-btn bordered">Back</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(null, mapDispatchToProps)(InvestmentStatus);
