import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Popup from "components/Common/Popup/Popup";
import CutOffTimes from "components/clientFlow/OrderDetails/CutOffTimes";

const CutOfTimeModal = ({ setCutOfTimeViewPopup, isVisible = false }) => {
  return (
    <div className="success-popup">
      <Popup isOpen={isVisible} setPopup={setCutOfTimeViewPopup}>
        <CutOffTimes hideHeading={true}  />
      </Popup>
    </div>
  );
};

export default connect(null, null)(withRouter(CutOfTimeModal));
