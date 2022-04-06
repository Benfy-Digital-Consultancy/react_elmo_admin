import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { nfoGetSchemesData } from "redux/action/clientFlow/NfoAct";
import "./style.scss";
import NfoCard from "./NfoCard";
import { endpoints } from "service/helpers/config";
import { getDataFromStorage } from "service/helperFunctions";
import { PageLoader } from "components/Common/PageLoader";
import { EmptyRecord } from "components/Common/EmptyRecord";

function NFO(props) {
  const [loading, setLoading] = useState(false);
  const [NfoSchemeList, setNfoSchemeList] = useState([]);

  const { nfoGetSchemesDataApiCall } = props;

  //SipApiFunction
  const nfoSchemeDetails = useCallback(() => {
    const { USER_ROLE_kEY, USER_ROLE_DATA } = endpoints.auth;
    let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
    if (userRoleData) {
      setLoading(true);
      let payload = {
        ClientCode: userRoleData?.ClientCode,
        ProductCategoryId: 45,
      };

      nfoGetSchemesDataApiCall(payload)
        .then((data) => {
          setNfoSchemeList(data?.SchemeList);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [nfoGetSchemesDataApiCall]);

  useEffect(() => {
    nfoSchemeDetails();
  }, [nfoSchemeDetails]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="nfo-main-container">
      <div className="row">
        <div className="col-md-12 mt-3">
          {NfoSchemeList?.length > 0 ? (
            NfoSchemeList.map((nfodata, id) => {
              return <NfoCard key={id} nfodata={nfodata} />;
            })
          ) : (
            <EmptyRecord />
          )}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      nfoGetSchemesDataApiCall: nfoGetSchemesData,
    },
    dispatch
  );
};

let component = NFO;

export const NFOComp = connect(null, mapDispatchToProps)(withRouter(component));
