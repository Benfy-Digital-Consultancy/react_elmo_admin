import React, { useState, useEffect, useCallback } from "react";
import "./sidebar.scss";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Logo } from "components/Common/Logo/Logo";
import { getClientDetail } from "redux/action/clientFlow/DashboardAct";
import { getUserReferralInfo } from "redux/action/clientFlow/ClientReferAct";
import { bindActionCreators } from "redux";
import Info from "assets/images/info.svg";
import Popup from "../Popup/Popup";
import Correct from "assets/images/correct.png";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import {
  getDataFromStorage,
  setDataFromStorage,
} from "service/helperFunctions";

import { PopupSelectProfile } from "components/Common/PopupSelectProfile";
import { PopupMobileNumber } from "components/Common/PopupMobileNumber";

import { NormalButton } from "components/Common/NormalButton";
function SideBar(props) {
  const { Labels, errorText } = useLang();
  let [formDetails, setFormDetails] = useState({
    mobile: "",
  });
  const [infoPopup, setInfoPopup] = useState(false);
  const [logoutStatus, setLogoutStatus] = useState(false);
  const [getapploginRole, setApploginRole] = useState({});
  const [objClinetDetailList, setObjClinetDetailList] = useState([]);
  const [mobileNumberValidation, setMobileNumberValidation] = useState(false);
  const [mobileInputPopup, setMobileInputPopup] = useState(false);
  const [clientDetails, setClientDetails] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [userSelectRadio, setUserSelectRadio] = useState(null);
  const [switchProfileHide, setSwitchProfileHide] = useState(false);
  const [parentID, setParentID] = useState();
  const [childID, setChildID] = useState();
  const [parentName, setParentName] = useState();

  const { mobile_not_match } = errorText?.login_error_msg || {};

  const { getClientDetailApiCall, kycData } = props;

  const fetchUsersList = useCallback(() => {
    const {
      USER_ROLE_kEY,
      USER_ROLE_DATA,
      FAMILY_DROPDOWN_FLAG,
      FAMILY_DROPDOWN_KEY,
      WHITELIST_SOURCE_KEY,
      WHITELIST_SOURCE_DATA,
      PARENT_INFO_KEY,
      PARENT_INFO_DATA,
    } = endpoints.auth;
    let source = getDataFromStorage(
      WHITELIST_SOURCE_DATA,
      WHITELIST_SOURCE_KEY
    );
    let userRoleData = getDataFromStorage(USER_ROLE_kEY, USER_ROLE_DATA);
    setChildID(userRoleData?.ClientCode);
    if (userRoleData) {
      let ip = sessionStorage.getItem(endpoints.auth.IP);
      let body = {
        AppOrWeb: endpoints.auth.WEB,
        client_code: userRoleData?.ClientCode,
        sub_broker_code: userRoleData?.SubBroker_Code,
        UserRequest: {
          AppOrWeb: endpoints?.auth.WEB,
          deviceInfo: endpoints?.APIDEVICEINFO,
          IPAddress: ip,
          LoggedInRoleId: userRoleData?.role_id,
          Source: source,
          UID: userRoleData?.uid,
        },
      };

      if (!kycData) {
        getClientDetailApiCall(body).then(({ ObjectResponse }) => {
          setDataFromStorage(
            "false",
            FAMILY_DROPDOWN_FLAG,
            FAMILY_DROPDOWN_KEY
          );
          let ParentId =
            ObjectResponse?.clientDetails?.clientMasterMFD?.ParentId;
          let parentData = ObjectResponse?.clientDetails;
          setDataFromStorage(parentData, PARENT_INFO_KEY, PARENT_INFO_DATA);
          if (ParentId) {
            if (ParentId === userRoleData?.ClientCode) {
              setDataFromStorage(
                "true",
                FAMILY_DROPDOWN_FLAG,
                FAMILY_DROPDOWN_KEY
              );
            }
          }
        });
      } else {
        setDataFromStorage("false", FAMILY_DROPDOWN_FLAG, FAMILY_DROPDOWN_KEY);
        let ParentId = kycData?.clientMasterMFD?.ParentId;
        if (ParentId) {
          if (ParentId === userRoleData?.ClientCode) {
            setDataFromStorage(
              "true",
              FAMILY_DROPDOWN_FLAG,
              FAMILY_DROPDOWN_KEY
            );
          }
        }
      }
    }
  }, [getClientDetailApiCall, kycData]);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  const fetchUser = useCallback(() => {
    const { PARENT_INFO_KEY, PARENT_INFO_DATA } = endpoints.auth;
    let source = getDataFromStorage(PARENT_INFO_KEY, PARENT_INFO_DATA);
    setParentID(source?.clientMasterMFD?.ParentId);
    setParentName(source?.clientMasterMFD?.ParentName);
  }, []);

  useEffect(() => {
    fetchUser();
  });

  let currentBasePath = props.match.path.split("/")[1];

  let { currentFlow, apploginRole, history } = props;

  // handleToLogout

  const handleToLogout = () => {
    sessionStorage.clear();
    history.push("/");
    window.location.reload();
  };

  const handleToLogoutModal = () => {
    setLogoutStatus(true);
  };

  // handletosort
  const handleToSort = (a, b) => {
    if (a.role_id > b.role_id) return 1;
    if (a.role_id < b.role_id) return -1;
    return 0;
  };

  // handleToSessionSet

  const handleSessionSet = (data) => {
    const { USER_ROLE_kEY, USER_ROLE_DATA } = endpoints.auth;
    setDataFromStorage(data, USER_ROLE_kEY, USER_ROLE_DATA);
    props.history.push("/");
    sessionStorage.removeItem(endpoints?.auth?.STP_DATA);
    sessionStorage.removeItem(endpoints?.auth?.SWITCH_STP_DATA);
    sessionStorage.removeItem(endpoints?.auth?.INVEST_DATA);
    window.location.reload();
  };

  // handleRoleId
  const handleSetRoleId = async (item, index) => {
    setUserSelectRadio(index);
    setMobileInputPopup(false);
    setPopupModal(false);
    HandlegetUserReferralInfo(item);
  };

  const HandlegetUserReferralInfo = (userData) => {
    let userobject = getapploginRole;
    let payload = {
      UserCode: userData?.client_code,
      RoleId: userobject?.role_id,
    };
    props.getUserReferralInfoApi(payload).then((data) => {
      if (data?.hasOwnProperty("UserInfo")) {
        let updateUserRole = {
          ...userobject,
          name: data?.UserInfo?.FullName,
          code: data?.UserInfo?.ClientCode,
          uid: data?.UserInfo?.uid,
          SBCode: data?.UserInfo?.SBCode,
          RMCode: data?.UserInfo?.RMCode,
          ClientCode: data?.UserInfo?.ClientCode,
          FullName: data?.UserInfo?.FullName,
          Email: data?.UserInfo?.Email,
          Phone_Number: data?.UserInfo?.Phone_Number,
          ReferralCode: data?.UserInfo?.ReferralCode,
          ReferralLink: data?.UserInfo?.ReferralLink,
          ReferralCount: data?.UserInfo?.ReferralCount,
        };
        handleSessionSet(updateUserRole);
      }
    });
  };

  // handletoModalClose
  const handleInputModalCancel = (modalName) => {
    if (modalName === endpoints.selectProfile) {
      setPopupModal(false);
    }

    if (modalName === endpoints.mobileInput) {
      setMobileInputPopup(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target || e || {};

    setFormDetails({ ...formDetails, [name]: value });
    setMobileNumberValidation(false);
  };

  // handlecheckMobileNumber

  const handleCheckMobile = () => {
    let userentermobilenumer = formDetails.mobile;
    let filterlistdata = objClinetDetailList.filter(
      (item) => item.mobile === userentermobilenumer
    );
    if (filterlistdata.length > 1) {
      setMobileInputPopup(false);
      setClientDetails(filterlistdata);
      setPopupModal(true);
    } else if (filterlistdata.length === 1) {
      let filterDataObject = filterlistdata[0];
      let userobject = getapploginRole;
      let newObject = {
        ...userobject,
        name: filterDataObject.client_name,
        ClientCode: filterDataObject.client_code,
        SubBroker_Code: filterDataObject.sub_broker_code,
        email: filterDataObject.email,
        Phone_Number: filterDataObject.mobile,
      };
      handleSessionSet(newObject);
    } else if (filterlistdata.length === 0) {
      setMobileNumberValidation(true);
    }
  };

  // handleToSelectProfile

  const handleToSwitchProfile = () => {
    const { USER_DETAILS, USER_DETAILS_KEY } = endpoints?.auth;
    let userDetailValue = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
    if (userDetailValue) {
      userDetailValue?.apploginRole.sort(handleToSort);
      let AppLoginFirstData = {
        name: userDetailValue?.apploginRole[0]?.name,
        role_id: userDetailValue?.apploginRole[0]?.role_id,
        rolename: userDetailValue?.apploginRole[0]?.rolename,
        code: userDetailValue?.apploginRole[0]?.code,
        Mobile: userDetailValue?.apploginRole[0]?.Mobile,
        SubBroker_Code: userDetailValue?.subBrokerDetails?.SubBroker_Code,
        ARN_No: userDetailValue?.subBrokerDetails?.ARN_No,
        EUIN_No: userDetailValue?.subBrokerDetails?.EUIN_No,
        Master_Broker: userDetailValue?.subBrokerDetails?.Master_Broker,
        uid: userDetailValue?.UserReferralInfo?.uid,
        SBCode: userDetailValue?.UserReferralInfo?.SBCode,
        RMCode: userDetailValue?.UserReferralInfo?.RMCode,
        ClientCode: userDetailValue?.UserReferralInfo?.ClientCode,
        FullName: userDetailValue?.UserReferralInfo?.FullName,
        Email: userDetailValue?.UserReferralInfo?.Email,
        Phone_Number: userDetailValue?.UserReferralInfo?.Phone_Number,
        ReferralCode: userDetailValue?.UserReferralInfo?.ReferralCode,
        ReferralLink: userDetailValue?.UserReferralInfo?.ReferralLink,
        ReferralCount: userDetailValue?.UserReferralInfo?.ReferralCount,
      };
      setApploginRole(AppLoginFirstData);
      setObjClinetDetailList(userDetailValue?.objClinetDetailList);
      const OBJ_CLIENT_LENGTH = userDetailValue?.objClinetDetailList?.length;
      if (AppLoginFirstData && OBJ_CLIENT_LENGTH === 0) {
        handleSessionSet(AppLoginFirstData);
      }
      if (OBJ_CLIENT_LENGTH === 1) {
        handleSessionSet(AppLoginFirstData);
      }
      if (OBJ_CLIENT_LENGTH > 1) {
        var UserObjectListMobile =
          userDetailValue?.objClinetDetailList[0].mobile;
        var mobileVerifcationStatus = false;
        let userListData = userDetailValue?.objClinetDetailList;

        for (var i = 0; i < userListData.length; i++) {
          if (userListData[i].mobile !== UserObjectListMobile) {
            mobileVerifcationStatus = true;
            break;
          }
        }

        if (mobileVerifcationStatus) {
          setMobileInputPopup(true);
        } else {
          setClientDetails(userDetailValue?.objClinetDetailList);
          setPopupModal(true);
        }
      }
    }
  };

  useEffect(() => {
    const { USER_DETAILS, USER_DETAILS_KEY } = endpoints?.auth;
    let userDetailValue = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
    const { objClinetDetailList } = userDetailValue;
    if (objClinetDetailList.length > 1) {
      setSwitchProfileHide(true);
    }
  }, []);

  const switchToParent = () => {
    const { USER_DETAILS, USER_DETAILS_KEY } = endpoints?.auth;
    let userDetailValue = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
    let subBrokerCode = "";
    for (let i = 0; i <= userDetailValue?.objClinetDetailList?.length; i++) {
      if (parentID === userDetailValue?.objClinetDetailList[i]?.client_code) {
        subBrokerCode =
          userDetailValue?.objClinetDetailList[i]?.sub_broker_code;
      }
    }
    if (userDetailValue) {
      let AppLoginFirstData = {
        name: parentName,
        role_id: userDetailValue?.apploginRole[0]?.role_id,
        rolename: userDetailValue?.apploginRole[0]?.rolename,
        code: parentID,
        Mobile: userDetailValue?.apploginRole[0]?.Mobile,
        SubBroker_Code: subBrokerCode,
        ARN_No: userDetailValue?.subBrokerDetails?.ARN_No,
        EUIN_No: userDetailValue?.subBrokerDetails?.EUIN_No,
        Master_Broker: userDetailValue?.subBrokerDetails?.Master_Broker,
        uid: userDetailValue?.UserReferralInfo?.uid,
        SBCode: userDetailValue?.UserReferralInfo?.SBCode,
        RMCode: userDetailValue?.UserReferralInfo?.RMCode,
        ClientCode: parentID,
        FullName: userDetailValue?.UserReferralInfo?.FullName,
        Email: userDetailValue?.UserReferralInfo?.Email,
        Phone_Number: userDetailValue?.UserReferralInfo?.Phone_Number,
        ReferralCode: userDetailValue?.UserReferralInfo?.ReferralCode,
        ReferralLink: userDetailValue?.UserReferralInfo?.ReferralLink,
        ReferralCount: userDetailValue?.UserReferralInfo?.ReferralCount,
      };
      handleSessionSet(AppLoginFirstData);
    }
  };

  let clientFlowMenus = () => {
    return (
      <>
        <Link
          to="/dashboard"
          className={
            currentBasePath === endpoints.dashboard ? endpoints.active : ""
          }
        >
          {Labels.dashboard}
        </Link>
        {parentID === childID ? (
          <Link
            to="/family"
            className={
              currentBasePath === endpoints.family ? endpoints.active : ""
            }
          >
            {Labels.family}
          </Link>
        ) : null}
        <Link
          to="/client-refer"
          className={
            currentBasePath === endpoints.clientRefer ? endpoints.active : ""
          }
        >
          {Labels.referaClient}
        </Link>
        <Link
          to="/sip"
          className={currentBasePath === endpoints.sip ? endpoints.active : ""}
        >
          {Labels.sipDetails}
        </Link>
        <Link
          to="/order-details"
          className={
            currentBasePath === endpoints.orderDetails ? endpoints.active : ""
          }
        >
          {Labels.orderDetails}
        </Link>
        <Link
          to="/nfo"
          className={currentBasePath === endpoints.nfo ? endpoints.active : ""}
        >
          {Labels.nfo}
        </Link>
        <Link
          to="/report"
          className={
            currentBasePath === endpoints.report ? endpoints.active : ""
          }
        >
          {Labels.Report}
        </Link>
        <Link
          to="/my-profile"
          className={
            currentBasePath === endpoints.myProfile ? endpoints.active : ""
          }
        >
          {Labels.myprofile}
        </Link>
        <Link
          to="/bankMandate"
          className={
            currentBasePath === endpoints.bankMandate ? endpoints.active : ""
          }
        >
          {Labels.bankMandate}
        </Link>
        {switchProfileHide && (
          <Link onClick={handleToSwitchProfile}>{Labels.switchProfile}</Link>
        )}
        <Link onClick={handleToLogoutModal}>{Labels.logout}</Link>
      </>
    );
  };

  return (
    <div className="side-bar">
      <div className="logo">
        <Logo
          url={
            props?.getWhiteLabelDetails?.ObjectResponse?.PartnerLogo !==
            undefined
              ? props?.getWhiteLabelDetails?.ObjectResponse?.PartnerLogo
              : endpoints.redColorLogo
          }
          onClick={() => history.push("/dashboard")}
        />
      </div>
      <div className="scroll-content">
        <div className="user-details">
          <div className="user-name">
            <div className="cursor-pointer" onClick={switchToParent}>
              {parentName === apploginRole?.name || parentName === null
                ? ""
                : parentName + ">>"}
            </div>
            {apploginRole?.name}
          </div>
          <div className="user-code">
            {Labels.code} :{" "}
            {apploginRole?.ClientCode ? apploginRole?.ClientCode : "-"}
          </div>
        </div>
        {kycData ? (
          <div
            className={`kyc-content ${
              kycData?.KYCstatus === endpoints.Verified &&
              kycData?.ProfileStatus === "Completed"
                ? "kyc-status"
                : "kyc-break"
            } `}
          >
            <p>
              {Labels.KYC} :{" "}
              {kycData?.KYCstatus === endpoints.Verified ? (
                <img src={Correct} alt="Correct" className="tick-img"></img>
              ) : (
                <span>{kycData?.KYCstatus ? kycData?.KYCstatus : "NA"}</span>
              )}
            </p>
            <p>
              {Labels.profile} :{" "}
              {kycData?.ProfileStatus === "Completed" ? (
                <img src={Correct} alt="Correct" className="tick-img"></img>
              ) : (
                <span>
                  {kycData?.ProfileStatus
                    ? kycData?.ProfileStatus
                    : "INCOMPLETE"}
                </span>
              )}
            </p>
            <span className="info">
              {kycData?.KYCstatus !== endpoints.Verified && (
                <img
                  src={Info}
                  alt="Info"
                  onClick={() => {
                    setInfoPopup(!infoPopup);
                  }}
                />
              )}
            </span>
          </div>
        ) : null}

        <div className="menu-list">
          {currentFlow === "CLIENTFLOW" || currentFlow === endpoints.all
            ? clientFlowMenus()
            : ""}
        </div>
      </div>
      <div className="confirm-popup">
        <Popup isOpen={infoPopup} setPopup={(value) => setInfoPopup(value)}>
          <div className="confirm-model">
            <div className="text-center">
              <h5>{Labels.confirm}</h5>
              <p>
                Client profile is incomplete. Please complete their profile
                first, to transact in mutual funds.
              </p>
            </div>
            <div className="row justify-content-center">
              <div className="col-3">
                <NormalButton
                  label={Labels.cancel}
                  className="w-100 mr-3"
                  outline={true}
                  onClick={() => {
                    setInfoPopup(false);
                  }}
                />
              </div>
              <div className="col-3">
                <NormalButton
                  label={Labels.okay}
                  isPrimay={true}
                  className="w-100"
                  onClick={() => {
                    setInfoPopup(false);
                  }}
                />
              </div>
            </div>
          </div>
        </Popup>
      </div>

      <div className="logout-popup-modal">
        <Popup
          setPopup={() => {
            setLogoutStatus(false);
          }}
          isOpen={logoutStatus}
          close={false}
        >
          <div className="logout-modal-container">
            <div className="text-center">
              <h5 className="popup-title pb-2">{Labels.logout}</h5>
              <h6 className="popup-description">{Labels.logoutTitle}</h6>
            </div>
            <div className="row logout-btn-container">
              <div className="col-4">
                <NormalButton
                  label={Labels.no}
                  className="cancel-btn-width"
                  outline={true}
                  onClick={() => {
                    setLogoutStatus(false);
                  }}
                />
              </div>
              <div className="col-4">
                <NormalButton
                  label={Labels.yes}
                  isPrimay={true}
                  className="btn-height"
                  onClick={handleToLogout}
                />
              </div>
            </div>
          </div>
        </Popup>
      </div>

      <div className="popup-modal-parent">
        {popupModal && (
          <PopupSelectProfile
            visible={popupModal}
            handlePopuModalCancel={() =>
              handleInputModalCancel(endpoints.selectProfile)
            }
            clientDetails={clientDetails}
            userSelectRadio={userSelectRadio}
            handleSetRoleId={(val, index) => handleSetRoleId(val, index)}
          />
        )}
        {mobileInputPopup && (
          <PopupMobileNumber
            autoFocus={true}
            type="text"
            visible={mobileInputPopup}
            handleInputModalCancel={() =>
              handleInputModalCancel(endpoints.mobileInput)
            }
            title={`${Labels.enter} ${Labels.mobile}`}
            name="mobile"
            max={10}
            value={formDetails.mobile}
            placeholder={`${Labels.enter} ${Labels.mobile}`}
            onChange={handleChange}
            handleKeypress={handleCheckMobile}
            mobileNumberVadiationStatus={mobileNumberValidation}
            mobileNumberErroMsg={mobile_not_match}
            label={Labels.submit}
            handleCheckMobile={handleCheckMobile}
          />
        )}
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    getWhiteLabelDetails: state.loginFlow.getWhiteLabelDetails,
    kycData: state.dashboardStore.kycList,
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getClientDetailApiCall: getClientDetail,
      getUserReferralInfoApi: getUserReferralInfo,
    },
    dispatch
  );
};

let component = SideBar;

export const SideBarCmp = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(component));
