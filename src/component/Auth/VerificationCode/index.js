import { history } from "helpers";
import React, { useEffect, useRef, useState } from "react";
import "component/Auth/VerificationCode/style.scss";
import NormalButton from "component/common/NormalButton/NormalButton";
import { strings } from "service/helpers/Constants";
import FormInput from "component/common/FormInput";
import { Link, useLocation } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { request } from "service";
import endponts from "service/endponts";
import moment from "moment";
import { Toast } from "service/toast";
import { message } from "antd";

const Verification = () => {

    const [otp, setOtp] = useState("");

    const [timer, setTimer] = useState("");
    const [resendEnable, setResendEnable] = useState(false);
    const [timerCount, setTimerCount] = useState(60000);
    const location = useLocation();

    const [email, setEmail] = useState("")
    const [encodedeEmail, setEncodedEmail] = useState("")

    useEffect(() => {
        if (location.state && location.state.email) {
            let userEmail = location.state.email ? location.state.email : "";
            setEncodedEmail(userEmail)
            let em = userEmail.split("").reverse().join("");
            let encrypt = em.split("@");
            let emailValue = (encrypt[1] + "").substring(0, 3)
            let atValues = "...." + emailValue.split("").reverse().join("") + "@" + encrypt[0].split("").reverse().join("");
            setEmail(atValues);
        }
    }, [location]);



    const onClickResend = () => {
        if (resendEnable) {
            let currentDate = moment().utcOffset('+05:30').format("MM-DD-YYYY HH:mm:ss")
            request({
                url: endponts.Endpoints.forgotPassword,
                method: endponts.APIMethods.POST,
                data: {
                    email: encodedeEmail,
                    requestedDateTime: currentDate
                }
            }).then(() => {

                Toast({ type: "success", message: 'Otp resend successfully.' });
                setTimerCount(60000);
                setResendEnable(false)
            })
        }
    }


    useEffect(() => {
        executeTimer()
    }, [timerCount, resendEnable])



    const executeTimer = () => {
        let seconds = Math.floor((timerCount / 1000) % 60);

        let minutes = Math.floor((timerCount / (1000 * 60)) % 60);

        let minuteText = minutes.toString().length == 1 ? '0' + minutes : minutes
        let secondText = seconds.toString().length == 1 ? '0' + seconds : seconds;
        if (timerCount == 60000) {
            setTimer(minuteText + ':' + secondText);
        }
        setTimeout(async () => {
            if (seconds > -1) {
                setTimer(minuteText + ':' + secondText);
                let count = timerCount - 1000;
                await setTimerCount(count);
            } else {
                setResendEnable(true)
            }
        }, 1000);
    };

    const onSubmit = (inputs) => {
        let currentDate = moment().utcOffset('+05:30').format("MM-DD-YYYY HH:mm:ss")
        request({
            url: endponts.Endpoints.verifyOTP,
            method: endponts.APIMethods.POST,
            data: {
                email: encodedeEmail,
                requestedDateTime: currentDate,
                OTP: otp
            }
        }).then(() => {
            history.push({
                pathname: "/auth/reset-password",
                state: { email: encodedeEmail }
            });
        })
    };


   

    return (
        <div>
            <div className="container-fluid">
                <div className="row no-gutter">
                    <div className="d-none d-md-flex col-md-4 col-lg-7 bg-image"></div>
                    <div className="col-md-8 col-lg-5 bg_color">
                        <div className="login d-flex align-items-center py-3">
                            <div className="container">
                                <div className="row py-5 text-center">
                                    <div className="col-md-9 col-lg-8 mx-auto"></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h3 className="login-heading">
                                            <span className="title_elmo">{strings.elmo}</span>
                                            <span className="title_admin">Admin</span>
                                        </h3>
                                        <label className="font-bold-20 forgot_lable">Forgot Password</label>
                                        <p className="mb-4 text-muted discription">
                                            An verification code has been sent to<br />
                                            {email}
                                        </p>
                                        <div className="blank mt-3 mb-3" />
                                        <div className="mt-4 counter">
                                            <div className="text-center"><label className="mb-3 font-regular-14">{timer}</label></div>
                                            <div className="text-center"><label className="font-regular-14">Enter Verification Code</label></div>
                                        </div>

                                        <div className="otp_align mt-3">

                                            <OtpInput
                                                value={otp}
                                                onChange={(e) => setOtp(e)}
                                                numInputs={4}
                                                hasErrored
                                                isInputNum
                                                inputStyle={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderColor: '#8692A6',
                                                    borderWidth: '1px'
                                                }}
                                                separator={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                                            />
                                            {/* <div className="row ">
                                                    <div className="col">
                                                        <FormInput 
                                                            maxlength={"1"}/>
                                                    </div>
                                                    <div className="col">
                                                        <FormInput />
                                                    </div>
                                                    <div className="col">
                                                        <FormInput />
                                                    </div>
                                                    <div className="col">
                                                        <FormInput />
                                                    </div>
                                                </div> */}
                                        </div>


                                        <div className="mt-4 ">
                                            <div className="text-center resend" onClick={onClickResend}>
                                                <label className={"mb-3 font-bold-14 in-active-resend" + (resendEnable == true ? ' resend-button' : ' ')}>Re-send Verification Code</label>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <NormalButton onClick={onSubmit} loginButton label="Verify" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;
