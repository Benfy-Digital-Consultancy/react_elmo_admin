import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { getAllMasterDetails } from "redux/action/clientFlow/MyProfileAct";
import { PageLoader } from "components/Common/PageLoader";
import { ContentType } from "service/helpers/Constants";
import { useLang } from "hooks/useLang";
import "../MyProfile.scss";

const Accounts = (props) => {
  const { Labels } = useLang();
  const { accountData, getAllMasterDetailsApi } = props;
  const newData = accountData?.clientDetails;
  const { clientMasterMFD } = newData;
  const [holdingTypeData, setHoldingTypeData] = useState([]);
  const [holdingType, setHoldingType] = useState();
  const [holdingMode, setHoldingMode] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllMasterDetailsApi()
      .then((data) => {
        setHoldingTypeData(data?.mst_ClientHolding);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [getAllMasterDetailsApi]);

  useEffect(() => {
    for (let i = 0; i < holdingTypeData?.length; i++) {
      if (holdingTypeData[i]?.CODE === clientMasterMFD?.CLIENT_HOLDING) {
        setHoldingType(holdingTypeData[i]?.DETAILS);
      }
    }
  }, [clientMasterMFD, holdingTypeData]);

  useEffect(() => {
    for (let i = 0; i < ContentType?.length; i++) {
      if (ContentType[i]?.code === clientMasterMFD?.CLIENT_TYPE) {
        setHoldingMode(ContentType[i]?.value);
      }
    }
  }, [clientMasterMFD]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="list-outer w-75 col-2">
        <div className="list">
          <div className="label">{Labels?.accountHoldingType}:</div>
          <div className="value">{holdingType}</div>
        </div>
        <div className="list-title">{Labels?.holdingMode}</div>
        <div className="list">
          <div className="label">{Labels?.holdingType}:</div>
          <div className="value">{holdingMode}</div>
        </div>
      </div>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllMasterDetailsApi: getAllMasterDetails,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(Accounts));
