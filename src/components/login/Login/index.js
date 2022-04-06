import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./style.scss";
import UserIcon from "assets/images/user-grey.svg";
import EyeOffIcon from "assets/images/eye-off.svg";
import LoginBanner from "assets/images/elmo_group.png";
import { login, socialLogin, confirmOtp } from "redux/action/LoginAct";
import { getUserReferralInfo } from "redux/action/clientFlow/ClientReferAct";
import {
  NormalButton,
  NormalCheckbox,
} from "components/Common";
import { CommonInput } from "components/Common/CommonInput";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { Link } from "react-router-dom";

function LoginPage(props) {
  const { Labels } = useLang();
  let { history } = props;

  return (
    <div className="with-banner-page popup-modal-parent">
      <div className="left" style={{ backgroundImage: `url(${LoginBanner})` }}>
      </div>
      <div className="right login-center-postion">
        <div className="login-center-max">
          <div className="login-title">{Labels.loginTitle}<span>{Labels.loginTitleCo}</span></div>
          <div className="login-discription">{Labels.loginDes}</div>
          <div className="input-section grey-input-ui">
            <div className="input">
              <div className="with-icon">
                <CommonInput
                  type="text"
                  label={Labels.emailId}
                  name={endpoints?.username}
                  placeholder={`${Labels.enter} ${Labels.your} ${Labels.emailId}`}
                />

                <img src={UserIcon} alt="login form" />
              </div>
            </div>
            <div className="input">
              <div className="with-icon">
                <CommonInput
                  label={Labels.password}
                  name={endpoints?.password}
                  placeholder={`${Labels.enter} ${Labels.your} ${Labels.password}`}
                />
                <img
                  src={EyeOffIcon}
                  alt={Labels.password}
                />

                <div className="bottom-right-content">
                  <span>
                    <NormalCheckbox /><span className="remember-me">{Labels.rememberMe}</span>
                  </span>
                  <span
                    className="forgot-password"
                    onClick={() => history.push("/forgot-password")}
                  >
                    {Labels.forgotPassword}?
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <Link to={history.push('/dashboard')}> */}
          <NormalButton
            label={Labels.loginTitle}
            isPrimay={true}
            className="w-100 max-width-btn"
          />
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      LoginApiCall: login,
      SocialLoginApiCall: socialLogin,
      confirmOtpApiCall: confirmOtp,
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

let component = LoginPage;

export const LoginComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(component));
