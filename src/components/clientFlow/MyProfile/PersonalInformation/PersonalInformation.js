import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, useHistory } from "react-router-dom";
import editIcon from "assets/images/edit.svg";
import { getStateMasterDetails } from "redux/action/clientFlow/MyProfileAct";
import { date } from "service/helperFunctions";
import { PageLoader } from "components/Common/PageLoader";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import "../MyProfile.scss";

const PersonalInformation = (props) => {
  const { Labels } = useLang();
  const { personalData, getStateMasterDetailsApi } = props;
  const newData = personalData?.clientDetails;
  const { clientMasterMFD } = newData;
  const [stateType, setStateType] = useState([]);
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const DOB = date(clientMasterMFD?.CLIENT_DOB, "DD/MM/YYYY");

  useEffect(() => {
    setLoading(true);
    getStateMasterDetailsApi()
      .then((data) => {
        let stateTypeOptions = [];
        data.DataObject.forEach((list) => {
          stateTypeOptions.push({
            label: list.State_Name,
            value: list.State_Code,
          });
          if (stateTypeOptions.length === data.DataObject.length)
            setStateType([...stateTypeOptions]);
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [getStateMasterDetailsApi]);

  useEffect(() => {
    for (let i = 0; i < stateType?.length; i++) {
      if (stateType[i].value === clientMasterMFD?.CLIENT_STATE) {
        setState(stateType[i].label);
      }
    }
  }, [clientMasterMFD, stateType]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <div className="profile-title">
        <span className="title">
          {Labels?.personalInformation}
          <img
            src={editIcon}
            alt="Edit"
            className="ms-4 cursor-pointer"
            onClick={() => history.push("/my-profile/edit-profile")}
          />
        </span>
      </div>
      <div className="profile-content">
        <div className="list-outer label-width-30 w-100 pt-3">
          <div className="col-md-6">
            <div className="list">
              <div className="label">{Labels?.emailId}:</div>
              <div className="value">{newData?.email}</div>
            </div>
            <div className="list">
              <div className="label">{Labels?.mobile}:</div>
              <div className="value verified">
                {endpoints?.ninetyOne} {newData?.mobile}
                <span>
                  {newData?.mobile_status === 1
                    ? Labels?.verified
                    : Labels?.nonVerified}
                </span>
              </div>
            </div>
            <div className="list">
              <div className="label">{Labels?.dob}:</div>
              <div className="value">{DOB}</div>
            </div>
            <div className="list">
              <div className="label">{Labels?.guardianName}:</div>
              <div className="value">
                {clientMasterMFD?.CLIENT_FATHER_HUSBAND_GUARDIAN ||
                  endpoints?.emptyDash}
              </div>
            </div>
            <div className="list">
              <div className="label">{Labels?.guardianPan}:</div>
              <div className="value">
                {clientMasterMFD?.CLIENT_GUARDIANPAN || endpoints?.emptyDash}
              </div>
            </div>
            <div className="list">
              <div className="label">{Labels?.countryStateCity}:</div>
              <div className="value">
                {clientMasterMFD?.CLIENT_COUNTRY +
                  endpoints?.comma +
                  state +
                  endpoints?.comma +
                  clientMasterMFD?.CLIENT_CITY}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="list">
              <div className="label">{Labels?.gender}:</div>
              <div className="value">
                {clientMasterMFD?.CLIENT_GENDER === endpoints?.M
                  ? Labels?.male
                  : Labels?.female}
              </div>
            </div>
            <div className="list">
              <div className="label">{Labels?.address}:</div>
              <div className="value">
                {clientMasterMFD?.CLIENT_ADD1 +
                  endpoints?.emptyDash +
                  clientMasterMFD?.CLIENT_ADD2 +
                  endpoints?.emptyDash +
                  clientMasterMFD?.CLIENT_ADD3}
              </div>
            </div>
            <div className="list">
              <div className="label">{Labels?.pin}:</div>
              <div className="value">{clientMasterMFD?.CLIENT_PINCODE}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getStateMasterDetailsApi: getStateMasterDetails,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(PersonalInformation));
