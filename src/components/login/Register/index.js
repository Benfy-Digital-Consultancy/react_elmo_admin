import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Statistic } from "antd";
import "./style.scss";
import UserIcon from "assets/images/user-grey.svg";
import EyeOffIcon from "assets/images/eye-off.svg";
import EyeOpenIcon from "assets/images/open-eye.png";
import LoginBanner from "assets/images/login-banner.png";
import PhoneIcon from "assets/images/phone.svg";
import MailIcon from "assets/images/mail.svg";
import UsersIcon from "assets/images/users.svg";
import { socialLogin, confirmOtp, forgotPassword } from "redux/action/LoginAct";
import { getUserReferralInfo } from "redux/action/clientFlow/ClientReferAct";

import {
  NormalButton,
  PopupSelectProfile,
  PopupMobileNumber,
  SocialLoginButtons,
} from "components/Common";
import { CommonInput } from "components/Common/CommonInput";
import { Logo } from "components/Common/Logo/Logo";
import { validationRules, otpValidation } from "./validateRules";
import validate from "validate.js";
import { Toast } from "service/toast";
import {
  getDataFromStorage,
  setDataFromStorage,
} from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";

const { Countdown } = Statistic;
const { code400, code110, code100, code200 } = endpoints.status_code;
const { success_title, error_title } = endpoints.response_error_msg;
function Register(props) {
  const { Labels, errorText } = useLang();
  let { history } = props;
  const [error, setErrors] = useState({});
  let [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    referal: "",
    otpValue: "",
    socailMobile: "",
    socailOtp: "",
    isCustom: 2,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [OtpVisible, setOtpVisible] = useState(false);
  const [otpId, setOtpId] = useState("");
  const [userTotalData, setUserTotalData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isButtonClicked, setisButtonClicked] = useState(false);
  const [timeCountInitial, setTimeCountInitial] = useState(Date.now() + 60000);
  const [timeCounterHide, setTimeCounterHide] = useState(true);
  const [resendBtnDisable, setResendBtnDisable] = useState(true);
  const [popupModal, setPopupModal] = useState(false);
  const [clientDetails, setClientDetails] = useState([]);
  const [getapploginRole, setApploginRole] = useState({});
  const [mobileInputPopup, setMobileInputPopup] = useState(false);
  const [socialMobileInputPopup, setSocialMobileInputPopup] = useState(false);
  const [objClinetDetailList, setObjClinetDetailList] = useState([]);
  const [socialConfirmModal, setSocialConfirmModal] = useState(false);
  const [socialOtpError, setSocialOtpError] = useState(false);
  const [socialOtpId, setSocialOtpId] = useState("");
  const [userSelectRadio, setUserSelectRadio] = useState(null);
  const [mobileNumberValidation, setMobileNumberValidation] = useState(false);
  const { mobile_not_match, mobile_num_min, mobile_otp_min } =
    errorText?.login_error_msg || {};

  //handle Change
  const handleChange = (e) => {
    const { name, value } = e.target || e || {};
    const tempErrors = { ...error };
    tempErrors[name] = undefined;
    setFormDetails({ ...formDetails, [name]: value });
    setErrors({ ...error, ...tempErrors });
  };

  //validate Fields
  const validateFields = (data, constraint) => {
    const fieldInvalidList = validate(data, constraint);

    if (fieldInvalidList !== undefined) {
      const errors = {
        ...fieldInvalidList,
      };
      setErrors({ ...errors, ...fieldInvalidList });
    }
    return !fieldInvalidList;
  };

  // handleEnterSubmit
  const handleLoginEnter = () => {
    handleToRegister();
  };

  useEffect(() => {
    sessionStorage.setItem(endpoints?.auth?.ISCUSTOMVALUE, 2);
  }, []);

  // handleToRegister

  const handleToRegister = () => {
    let { username, email, mobile, password, referal, isCustom } = formDetails;
    let body = {
      username,
      email,
      mobile,
      password,
    };
    if (!validateFields(body, validationRules())) return;
    setisButtonClicked(true);
    let payload = {
      IsDistributor: true,
      ReferralCode: referal,
      RegisterUserReferralCode: "",
      RegisterUserReferralLink: "",
      contactnumber: mobile,
      device_info: endpoints?.auth?.APIDEVICEINFO,
      email_or_mobile: email,
      fbId: "",
      googleId: "",
      isCustom: sessionStorage.getItem(endpoints?.auth?.ISCUSTOMVALUE),
      password: password,
      username: username,
    };

    setTimeCountInitial(Date.now() + 60000);

    props
      .SocialLoginApiCall(payload)
      .then((data) => {
        if (data.response.status_code !== code100) {
          Toast({
            type: error_title,
            message: data?.response?.message,
          });
          setisButtonClicked(false);
        }
        if (data.response.status_code === code100) {
          let msg = data.response.message;
          let otpid = msg.split(".");
          let otpvalue = otpid[1];
          let slicestring = otpvalue.slice(3, 8);
          setOtpId(slicestring);
          let userSocialData = data.UserReferralInfo;
          setUserTotalData(userSocialData);
          setisButtonClicked(false);
          if (isCustom === 2) {
            setCurrentStep(2);
          }
        }
      })
      .catch(() => {
        setisButtonClicked(false);
      });
  };

  const handleGenerateOtp = () => {
    sessionStorage.setItem(endpoints?.auth?.ISCUSTOMVALUE, 1);
    handleToRegister();
  };

  //
  const handleConfirmOtp = () => {
    let otpValue = formDetails.otpValue;
    let body = {
      otpValue,
    };
    if (!validateFields(body, otpValidation())) return;
    setisButtonClicked(true);
    let objData = {
      OTP_Id: otpId,
      OTP: otpValue,
      EmialId: userTotalData.Email,
      MobileNumber: userTotalData.Phone_Number,
      LanguageId: endpoints.auth.LanguageId,
    };
    props
      .confirmOtpApiCall(objData)
      .then((data) => {
        if (data?.status_code === code400) {
          setisButtonClicked(false);
        }
        if (data.status === success_title) {
          setisButtonClicked(false);
          history.push("/");
        }
      })
      .catch(() => {
        setisButtonClicked(false);
      });
  };

  // counterCompleted

  const counterCompleted = () => {
    setResendBtnDisable(false);
    setTimeCounterHide(false);
  };

  const handleToResendClick = () => {
    setResendBtnDisable(true);
    setTimeCounterHide(true);
    setTimeCountInitial(Date.now() + 60000);
    setFormDetails({ ...formDetails, otpValue: "" });
    handleGenerateOtp();
  };

  // social login

  // social google login
  const responseGoogle = (response) => {
    if (response?.hasOwnProperty(endpoints.profileObj)) {
      let socialReponse = response?.profileObj;
      let googleId = response?.profileObj?.googleId;
      setDataFromStorage(
        googleId,
        endpoints?.auth?.SOCIAL_ID,
        endpoints?.auth?.SOCIAL_ID_KEY
      );
      handleSocialLoginSession(socialReponse);
    }
  };

  const handleToPopup = () => {
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

  const handleSocialLoginSession = (data) => {
    const { SOCIAL_LOGIN_KEY, SOCIAL_LOGIN_DATA } = endpoints?.auth;
    setDataFromStorage(data, SOCIAL_LOGIN_DATA, SOCIAL_LOGIN_KEY);
    handleSocialLogin();
  };

  // handleSubmit
  const handleSocialLogin = async () => {
    const { SOCIAL_LOGIN_KEY, SOCIAL_LOGIN_DATA } = endpoints?.auth;

    let socialDecrytpData = getDataFromStorage(
      SOCIAL_LOGIN_DATA,
      SOCIAL_LOGIN_KEY
    );
    let socialInputMobile = formDetails.socailMobile;
    if (socialDecrytpData) {
      let payload = {
        IsDistributor: true,
        ReferralCode: "",
        RegisterUserReferralCode: "",
        RegisterUserReferralLink: "",
        contactnumber: socialInputMobile,
        device_info: endpoints.auth.APIDEVICEINFO,
        email_or_mobile: socialDecrytpData.email,
        fbId: "",
        googleId: socialDecrytpData.googleId,
        isCustom: "1",
        password: "",
        username: socialDecrytpData.name,
      };

      props.SocialLoginApiCall(payload).then((data) => {
        if (data.response.status_code === code400) {
          Toast({
            type: error_title,
            message: data?.response?.message,
          });
        }
        if (data.response.status_code === code200) {
          handleToPopup();
        }
        if (data.response.status_code === code110) {
          setSocialMobileInputPopup(true);
        }
        if (data.response.status_code === code100) {
          setSocialMobileInputPopup(false);
          setSocialConfirmModal(true);
          let msg = data.response.message;
          let otpid = msg.split(".");
          let otpvalue = otpid[1];
          let slicestring = otpvalue.slice(3, 8);
          setSocialOtpId(slicestring);
          let userSocialData = data.UserReferralInfo;
          setUserTotalData(userSocialData);
        }
      });
    }
  };

  const handleCheckSocialMobile = () => {
    let mobileNumberLength = formDetails.socailMobile;
    if (mobileNumberLength.length !== 10) {
      setMobileNumberValidation(true);
    } else {
      handleSocialLogin();
      setMobileNumberValidation(false);
    }
  };

  const handleSocialOtpCheck = () => {
    let otpvalue = formDetails.socailOtp;
    if (otpvalue.length !== 4) {
      setSocialOtpError(true);
    } else {
      let body = {
        OTP_Id: socialOtpId,
        OTP: otpvalue,
        EmialId: userTotalData.Email,
        MobileNumber: userTotalData.Phone_Number,
        LanguageId: endpoints.auth.LanguageId,
      };
      props
        .confirmOtpApiCall(body)
        .then((data) => {
          if (data.status === success_title) {
            handleSocialLogin();
            setSocialConfirmModal(false);
          }
        })
        .catch(() => {
          setisButtonClicked(false);
        });
    }
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
    window.location.reload();
  };

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

  // handletoModalClose
  const handleInputModalCancel = (modalName) => {
    if (modalName === endpoints?.selectProfile) {
      setPopupModal(false);
      handleSessionClear();
    }

    if (modalName === endpoints?.mobileInput) {
      setMobileInputPopup(false);
      handleSessionClear();
    }
    if (modalName === endpoints?.socialInput) {
      setSocialMobileInputPopup(false);
    }
    if (modalName === endpoints?.otpInput) {
      setSocialConfirmModal(false);
    }
  };
  // handletoModalClose

  // sessionClear
  const handleSessionClear = () => {
    const { USER_DETAILS } = endpoints?.auth;
    sessionStorage.removeItem(USER_DETAILS);
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
      if (data?.hasOwnProperty(endpoints.userInfo)) {
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

  // facebook
  const responseFacebook = (response) => {
    if (response.hasOwnProperty("email")) {
      let emailResponse = {
        name: response.name,
        email: response.email,
        googleId: response.id,
      };
      setDataFromStorage(
        response.id,
        endpoints?.auth?.SOCIAL_ID,
        endpoints?.auth?.SOCIAL_ID_KEY
      );
      handleSocialLoginSession(emailResponse);
    }
  };

  return (
    <div className="with-banner-page popup-modal-parent">
      <div className="left" style={{ backgroundImage: `url(${LoginBanner})` }}>
        <div className="question">{Labels.haveAccount}</div>
        <button
          className="primary-btn bordered white border-radius-50"
          onClick={() => history.push("/")}
        >
          {Labels.loginTitle}
        </button>
        <Logo
          url={
            props?.getWhiteLabelDetails?.ObjectResponse?.PartnerLogo !==
            undefined
              ? props?.getWhiteLabelDetails?.ObjectResponse?.PartnerLogo
              : endpoints?.login
          }
        />
      </div>
      <div className="right login-center-postion">
        {currentStep === 1 && (
          <div className="login-center-max">
            <div className="title">{Labels.register}</div>

            <div className="input-section grey-input-ui">
              <div className="input">
                <div className="with-icon">
                  <CommonInput
                    label={Labels.name}
                    name={endpoints.username}
                    placeholder={`${Labels.enter} ${Labels.your} ${Labels.name}`}
                    customClass="mt-2"
                    onChange={handleChange}
                    value={formDetails.username}
                    errorMessage={error.username ? error.username[0] : null}
                    handleKeypress={handleLoginEnter}
                  />
                  <img src={UserIcon} alt="login form" />
                </div>
              </div>
              <div className="input">
                <div className="with-icon">
                  <CommonInput
                    label={Labels.email}
                    type="email"
                    name="email"
                    placeholder={`${Labels.enter} ${Labels.your} ${Labels.emailId}`}
                    customClass="mt-2"
                    onChange={handleChange}
                    value={formDetails.email}
                    errorMessage={error.email ? error.email[0] : null}
                    handleKeypress={handleLoginEnter}
                  />
                  <img src={MailIcon} alt="login form" />
                </div>
              </div>
              <div className="input">
                <div className="with-icon">
                  <CommonInput
                    label={Labels.mobile}
                    customClass="mt-2"
                    name="mobile"
                    max={10}
                    placeholder={`${Labels.enter} ${Labels.your} ${Labels.mobile}`}
                    onChange={handleChange}
                    value={formDetails.mobile}
                    errorMessage={error.mobile ? error.mobile[0] : null}
                    handleKeypress={handleLoginEnter}
                  />
                  <img src={PhoneIcon} alt="login form" />
                </div>
              </div>
              <div className="input">
                <div className="with-icon">
                  <CommonInput
                    label={Labels.password}
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder={`${Labels.enter} ${Labels.your} ${Labels.password}`}
                    onChange={handleChange}
                    customClass="mt-2"
                    value={formDetails.password}
                    errorMessage={error.password ? error.password[0] : null}
                    handleKeypress={handleLoginEnter}
                  />
                  <img
                    src={passwordVisible ? EyeOpenIcon : EyeOffIcon}
                    alt="login"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                </div>
              </div>
              <div className="input">
                <div className="with-icon">
                  <CommonInput
                    type="text"
                    label={Labels.referral}
                    name="referal"
                    placeholder={`${Labels.enter} ${Labels.your} ${Labels.referralCode}`}
                    customClass="mt-2"
                    onChange={handleChange}
                    value={formDetails.referal}
                    errorMessage={error.referal ? error.referal[0] : null}
                    handleKeypress={handleLoginEnter}
                  />
                  <img src={UsersIcon} alt="login form" />
                </div>
              </div>
            </div>
            <NormalButton
              label={Labels.register}
              isPrimay={true}
              className="w-100"
              onClick={handleToRegister}
              disabled={isButtonClicked}
            />
            <div className="or-section">
              <span className="or-section-title">{Labels.or}</span>
              <div>
                <SocialLoginButtons
                  responseFacebook={responseFacebook}
                  responseGoogle={responseGoogle}
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="reg-verfiy-container">
            <div className="title">{Labels.verification}</div>
            <div className="register-verfiy-desc">
              <h6 className="desc">{Labels.verifyTitle}</h6>
            </div>
            <div className="input-section grey-input-ui">
              <div className="input">
                <div className="with-icon">
                  <CommonInput
                    name="otpValue"
                    label={Labels.otp}
                    type={OtpVisible ? "text" : "password"}
                    value={formDetails.otpValue}
                    placeholder={`${Labels.enter} ${Labels.your} ${Labels.otp}`}
                    onChange={handleChange}
                    max={4}
                    errorMessage={error.otpValue ? error.otpValue[0] : null}
                    handleKeypress={handleConfirmOtp}
                  />
                  <img
                    src={OtpVisible ? EyeOpenIcon : EyeOffIcon}
                    alt={Labels.otp}
                    onClick={() => setOtpVisible(!OtpVisible)}
                  />
                </div>
              </div>
            </div>
            {timeCounterHide && (
              <div className="counter-container">
                <Countdown
                  value={timeCountInitial}
                  format="mm:ss"
                  onFinish={counterCompleted}
                  valueStyle={{
                    fontSize: 14,
                    color: "#000",
                    textAlign: "center",
                  }}
                />
              </div>
            )}

            <NormalButton
              label={Labels.continue}
              isPrimay={true}
              className="w-100"
              onClick={handleConfirmOtp}
              disabled={isButtonClicked}
            />

            <div className="reg-verfiy-resend-container">
              <span className="resend-title-first">{Labels.didNotReceive}</span>
              <button
                disabled={resendBtnDisable}
                className="btn resendBtn"
                onClick={handleToResendClick}
              >
                {Labels.reSend}
              </button>
            </div>
          </div>
        )}
      </div>

      {popupModal && (
        <PopupSelectProfile
          visible={popupModal}
          handlePopuModalCancel={() =>
            handleInputModalCancel(endpoints?.selectProfile)
          }
          clientDetails={clientDetails}
          userSelectRadio={userSelectRadio}
          handleSetRoleId={(val, index) => handleSetRoleId(val, index)}
        />
      )}

      {(mobileInputPopup || socialMobileInputPopup || socialConfirmModal) && (
        <PopupMobileNumber
          autoFocus={true}
          type="text"
          visible={
            mobileInputPopup
              ? mobileInputPopup
              : socialMobileInputPopup
              ? socialMobileInputPopup
              : socialConfirmModal
          }
          handleInputModalCancel={() =>
            handleInputModalCancel(
              mobileInputPopup
                ? endpoints?.mobileInput
                : socialMobileInputPopup
                ? endpoints?.socialInput
                : endpoints?.otpInput
            )
          }
          title={
            socialConfirmModal
              ? `${Labels.enter} ${Labels.otp}`
              : `${Labels.enter} ${Labels.mobile}`
          }
          name={
            mobileInputPopup
              ? "mobile"
              : socialMobileInputPopup
              ? "socailMobile"
              : "socailOtp"
          }
          max={socialConfirmModal ? 4 : 10}
          value={
            mobileInputPopup
              ? formDetails.mobile
              : socialMobileInputPopup
              ? formDetails.socailMobile
              : formDetails.socailOtp
          }
          placeholder={
            socialConfirmModal
              ? `${Labels.enter} ${Labels.otp}`
              : `${Labels.enter} ${Labels.mobile}`
          }
          onChange={handleChange}
          handleKeypress={
            mobileInputPopup
              ? handleCheckMobile
              : socialMobileInputPopup
              ? handleCheckSocialMobile
              : handleSocialOtpCheck
          }
          mobileNumberVadiationStatus={
            socialConfirmModal ? socialOtpError : mobileNumberValidation
          }
          mobileNumberErroMsg={
            mobileInputPopup
              ? mobile_not_match
              : socialMobileInputPopup
              ? mobile_num_min
              : mobile_otp_min
          }
          label={socialConfirmModal ? Labels.check : Labels.submit}
          handleCheckMobile={
            mobileInputPopup
              ? handleCheckMobile
              : socialMobileInputPopup
              ? handleCheckSocialMobile
              : handleSocialOtpCheck
          }
          isButtonClicked={isButtonClicked}
        />
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      SocialLoginApiCall: socialLogin,
      confirmOtpApiCall: confirmOtp,
      ForgotPasswordApiCall: forgotPassword,
      getUserReferralInfoApi: getUserReferralInfo,
    },
    dispatch
  );
};
let mapStateToProps = (state) => {
  return {
    getWhiteLabelDetails: state.loginFlow.getWhiteLabelDetails,
  };
};

let component = Register;

export const RegisterComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(component));
