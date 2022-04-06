import React from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import GoogleIcon from "assets/images/google.svg";
import "./SocialLoginButtons.scss";
import { endpoints } from "service/helpers/config";

export const SocialLoginButtons = ({ responseFacebook, responseGoogle }) => {
  return (
    <div className="socialLoginContainer">
      <FacebookLogin
        appId={endpoints?.auth?.SOCIAL?.SOCIAL_LOGIN_FACEBOOKID}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa-facebook"
        textButton=""
        cssClass="soicalLogin-customStyle"
      />
      <GoogleLogin
        clientId={endpoints?.auth?.SOCIAL?.SOCIAL_LOGIN_GOOGLEID}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={(renderProps) => (
          <img
            src={GoogleIcon}
            alt="niveshsocial login"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="socialLoginGooleIcon"
          />
        )}
        buttonText=""
        className="socialGoogleBtn"
      />
    </div>
  );
};
