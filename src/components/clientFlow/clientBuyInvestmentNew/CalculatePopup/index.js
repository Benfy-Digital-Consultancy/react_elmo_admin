import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FutureCorpus from "./FutureCorpus";
import Lumpsum from "./Lumpsum";
import MonthlySIP from "./MonthlySIP";
import "./style.scss";
const CalculatePopup = ({ props, history }) => {
  let [calculatePopupTab, setCalculatePopupTab] = useState("MonthlySIP");

  return (
    <>
      <div className="calculate-popup-title">Calculator</div>
      <div className="tabs-section">
        <div className="tabs">
          <div
            className={
              "tab cursor-pointer " +
              (calculatePopupTab === "MonthlySIP" ? "active" : "")
            }
            onClick={() => setCalculatePopupTab("MonthlySIP")}
          >
            Monthly SIP
          </div>
          <div
            className={
              "tab cursor-pointer " +
              (calculatePopupTab === "FutureCorpus" ? "active" : "")
            }
            onClick={() => setCalculatePopupTab("FutureCorpus")}
          >
            Future Corpus
          </div>
          <div
            className={
              "tab cursor-pointer " +
              (calculatePopupTab === "Lumpsum" ? "active" : "")
            }
            onClick={() => setCalculatePopupTab("Lumpsum")}
          >
            Lumpsum
          </div>
        </div>
        <div className="tab-content">
          {calculatePopupTab === "MonthlySIP" && (
            <>
              <MonthlySIP />
            </>
          )}
          {calculatePopupTab === "FutureCorpus" && (
            <>
              <FutureCorpus />
            </>
          )}
          {calculatePopupTab === "Lumpsum" && (
            <>
              <Lumpsum />
            </>
          )}
        </div>
      </div>
    </>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(null, mapDispatchToProps)(withRouter(CalculatePopup));
