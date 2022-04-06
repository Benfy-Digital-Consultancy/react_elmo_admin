import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import EyeOffIcon from "assets/images/eye-off.svg";
import EyeOpenIcon from "assets/images/open-eye.png";
import "./style.scss";
import MailIcon from "assets/images/mail.svg";
import { connect } from "react-redux";
import LoginBanner from "assets/images/elmo_group.png";
import { NormalButton } from "components/Common";
import { CommonInput } from "components/Common/CommonInput";
import validate from "validate.js";
import {
  forgotPassword,
  confirmOtp,
  resetPassword,
} from "redux/action/LoginAct";
import { bindActionCreators } from "redux";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { Statistic } from "antd";
import {
  emailValidation,
  otpValidation,
  confirmValidation,
} from "./validateRules";

const { success_title } = endpoints.response_error_msg;

const { Countdown } = Statistic;

const ForgotPassword = (props) => {
  const { Labels } = useLang();
  let { history } = props;
  const [error, setErrors] = useState({});
  const [isButtonClicked, setisButtonClicked] = useState(false);
  let [currentStep, setCurrentStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [logindetails, setLoginDetails] = useState({
    Email_Id: "",
    OTP: "",
    OtpId: "",
    Phone_number: "",
    password: "",
    reEnterNewPassword: "",
    GuidId: "",
  });
  const [timeCountInitial, setTimeCountInitial] = useState(null);
  const [timeCounterHide, setTimeCounterHide] = useState(false);
  const [resendBtnDisable, setResendBtnDisable] = useState(true);

  //handle Change
  const handleChange = (e) => {
    const { name, value } = e.target || e || {};
    const tempErrors = { ...error };

    tempErrors[name] = undefined;
    setLoginDetails({ ...logindetails, [name]: value });
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

  /// handle Generate Otp
  const handleGenerateOtp = () => {
    let body = { Email_Id: logindetails.Email_Id, PhoneNumber: "" };

    if (!validateFields(body, emailValidation)) return;
    setisButtonClicked(true);
    props
      .ForgotPasswordApiCall(body)
      .then(({ response, email_send_data }) => {
        if (response.status === success_title) {
          console.log(email_send_data, "OTP testing purpose");
          setLoginDetails({
            ...logindetails,
            OtpId: email_send_data?.OTP_Id,
            Phone_number: email_send_data?.Phone_number,
            GuidId: email_send_data?.GuidId,
          });
          setisButtonClicked(false);
          setCurrentStep(2);
        } else {
          logindetails.Email_Id = "";
          setisButtonClicked(false);
          setCurrentStep(1);
        }
      })
      .catch(() => {
        setisButtonClicked(false);
      });
  };

  /// handle Validate Otp
  const validateOTP = (e) => {
    e.preventDefault();
    let body = {
      OTP_Id: logindetails.OtpId,
      OTP: logindetails.OTP,
      EmialId: logindetails.Email_Id,
      MobileNumber: logindetails.Phone_number,
      LanguageId: endpoints.auth.LanguageId,
    };
    if (!validateFields(body, otpValidation)) return;
    props
      .confirmOtpApiCall(body)
      .then((data) => {
        if (data.status === success_title) {
          setisButtonClicked(false);
          setCurrentStep(3);
        } else {
          logindetails.OTP = "";
        }
      })
      .catch(() => {
        logindetails.OTP = "";
        setisButtonClicked(false);
      });
  };

  /// handle Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();
    let body = {
      password: logindetails.password,
      reEnterNewPassword: logindetails.reEnterNewPassword,
    };

    if (!validateFields(body, confirmValidation)) return;
    let payload = {
      GuidId: logindetails.GuidId,
      CLIENT_CODE: "",
      NewPassword: logindetails.password,
      ConfirmNewPassword: logindetails.reEnterNewPassword,
      CurrentUserLogo: "",
      OTP: logindetails.OTP,
      OTP_Id: logindetails.OtpId,
    };
    props
      .resetPasswordApiCall(payload)
      .then((data) => {
        if (data.status === success_title) {
          setisButtonClicked(false);
          history.push("/login");
        }
      })
      .catch(() => {
        setisButtonClicked(false);
      });
  };
  // handleEnterSubmit
  const handleLoginEnter = (e, key) => {
    if (key === "email") {
      handleGenerateOtp();
    } else if (key === "otp") {
      validateOTP(e);
    } else {
      handleResetPassword(e);
    }
  };

  const counterCompleted = () => {
    setResendBtnDisable(false);
    setTimeCounterHide(false);
  };
  const handleTimer = () => {
    setResendBtnDisable(true);
    setTimeCountInitial(Date.now() + 60000);
    setTimeCounterHide(true);
  };
  useEffect(() => {
    if (currentStep === 2) {
      handleTimer();
    }
  }, [currentStep]);

  const handleReInitTimer = () => {
    handleGenerateOtp();
    handleTimer();
  };

  return (
    <div className="with-banner-page">
      <div className="left" style={{ backgroundImage: `url(${LoginBanner})` }}>
      </div>
      <div className="right">
        <div className="forgot-password-page">
          <div className="content">
            {currentStep === 1 && (

              <div className="forgot">
                <div className="forgot-title">{Labels.loginTitle}<span>{Labels.loginTitleCo}</span></div>
                <div className="forgot-sub-title">{Labels.forgotTitle}</div>
                <div className="login-discription">{Labels.willSendTitle}</div>
                <div className="input-section grey-input-ui">
                  <div className="input">
                    <div className="with-icon">
                      <CommonInput
                        label={Labels.emailId}
                        name="Email_Id"
                        placeholder={`${Labels.enter} ${Labels.your} ${Labels.emailId}`}
                        onChange={handleChange}
                        value={logindetails.Email_Id}
                        errorMessage={error.Email_Id ? error.Email_Id[0] : null}
                        handleKeypress={(e) => {
                          handleLoginEnter(e, "email");
                        }}
                      />
                      <img
                        src={MailIcon}
                        alt="login form"
                        className="forgot-password-img"
                      />
                    </div>
                  </div>
                </div>
                <NormalButton
                  label={Labels.submit}
                  isPrimay={true}
                  className="w-100"
                  onClick={handleGenerateOtp}
                  disabled={isButtonClicked}
                />
              </div>
            )}
            {currentStep === 2 && (
              <>
                <div className="forgot">
                  <div className="forgot-title">{Labels.loginTitle}<span>{Labels.loginTitleCo}</span></div>
                  <div className="forgot-sub-title">{Labels.forgotTitle}</div>
                  <div className="login-discription">{Labels.emailIdSent}</div>
                  {timeCounterHide && (
                    <>
                      <div className="counter-container pb-2">
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
                      <div className="Verify-Code">{Labels.enterVerifyCode}</div>
                    </>

                  )}
                  <div className="input-section grey-input-ui otp">

                    <div className="input ">
                      <div className="row checked-otp">
                        <div className="col-2">
                          <CommonInput
                            name="OTP"
                            placeholder={`${Labels.enter} ${Labels.your} ${Labels.otp}`}
                            onChange={handleChange}
                            value={logindetails.OTP}
                            errorMessage={error.OTP ? error.OTP[0] : null}
                            handleKeypress={(e) => {
                              handleLoginEnter(e, "otp");
                            }}
                            max={4}
                            type={otpVisible ? "text" : "password"}
                          />
                        </div>
                        <div className="col-2">
                          <CommonInput
                            name="OTP"
                            placeholder={`${Labels.enter} ${Labels.your} ${Labels.otp}`}
                            onChange={handleChange}
                            value={logindetails.OTP}
                            errorMessage={error.OTP ? error.OTP[0] : null}
                            handleKeypress={(e) => {
                              handleLoginEnter(e, "otp");
                            }}
                            max={4}
                            type={otpVisible ? "text" : "password"}
                          />
                        </div>
                        <div className="col-2">
                          <CommonInput
                            name="OTP"
                            placeholder={`${Labels.enter} ${Labels.your} ${Labels.otp}`}
                            onChange={handleChange}
                            value={logindetails.OTP}
                            errorMessage={error.OTP ? error.OTP[0] : null}
                            handleKeypress={(e) => {
                              handleLoginEnter(e, "otp");
                            }}
                            max={4}
                            type={otpVisible ? "text" : "password"}
                          />
                        </div>
                        <div className="col-2">
                          <CommonInput
                            name="OTP"
                            placeholder={`${Labels.enter} ${Labels.your} ${Labels.otp}`}
                            onChange={handleChange}
                            value={logindetails.OTP}
                            errorMessage={error.OTP ? error.OTP[0] : null}
                            handleKeypress={(e) => {
                              handleLoginEnter(e, "otp");
                            }}
                            max={4}
                            type={otpVisible ? "text" : "password"}
                          />
                        </div>
                      </div>


                    </div>
                  </div>
                  <div className={`${resendBtnDisable ? "disable" : "btn resendBtn"
                    } + resend-Otp`}
                    onClick={handleReInitTimer}>
                    {Labels.didNotReceive}
                  </div>
                  <NormalButton
                    label={Labels.verify}
                    isPrimay={true}
                    className="w-100 forgot"
                    onClick={(e) => {
                      validateOTP(e);
                    }}
                    disabled={isButtonClicked}
                  />
                </div>

              </>
            )}
            {currentStep === 3 && (
              <div className="reset">
                <div className="reset">
                  <div className="forgot-title">{Labels.loginTitle}<span>{Labels.loginTitleCo}</span></div>
                  <div className="forgot-sub-title">{Labels.forgotTitle}</div>
                  <div className="login-discription">{Labels.resetMessage}</div>
                  <div className="input-section grey-input-ui">
                    <div className="input">
                      <div className="with-icon">
                        <CommonInput
                          label={Labels.newPassword}
                          name="password"
                          type={passwordVisible ? "text" : "password"}
                          value={logindetails.password}
                          placeholder={`${Labels.enter} ${Labels.your} ${Labels.newPassword}`}
                          onChange={handleChange}
                          handleKeypress={handleLoginEnter}
                          errorMessage={error.password ? error.password[0] : null}
                        />
                        <img
                          src={passwordVisible ? EyeOpenIcon : EyeOffIcon}
                          alt="login form"
                          className="forgot-password-img"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        />
                      </div>
                    </div>
                    <div className="input">
                      <div className="with-icon">
                        <CommonInput
                          label={Labels.confirmPassword}
                          name="reEnterNewPassword"
                          type={passwordVisible ? "text" : "password"}
                          value={logindetails.reEnterNewPassword}
                          placeholder={`${Labels.enter} ${Labels.your} ${Labels.confirmPassword}`}
                          onChange={handleChange}
                          handleKeypress={handleLoginEnter}
                          errorMessage={
                            error.reEnterNewPassword
                              ? error.reEnterNewPassword[0]
                              : null
                          }
                        />
                        <img
                          src={passwordVisible ? EyeOpenIcon : EyeOffIcon}
                          alt="login form"
                          className="forgot-password-img"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        />
                      </div>
                    </div>
                  </div>
                  <NormalButton
                    label={Labels.resetPassword}
                    isPrimay={true}
                    className="w-100"
                    onClick={(e) => {
                      handleResetPassword(e);
                    }}
                    disabled={isButtonClicked}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ForgotPasswordApiCall: forgotPassword,
      confirmOtpApiCall: confirmOtp,
      resetPasswordApiCall: resetPassword,
    },
    dispatch
  );
};
let mapStateToProps = (state) => {
  return {
    getWhiteLabelDetails: state.loginFlow.getWhiteLabelDetails,
  };
};

let component = ForgotPassword;

export const ForgotPasswordComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(component));
