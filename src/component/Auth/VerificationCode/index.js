import { history } from "helpers";
import React, { useEffect, useRef, useState } from "react";
import "component/Auth/VerificationCode/style.scss";
import NormalButton from "component/common/NormalButton/NormalButton";
import { strings } from "service/helpers/Constants";
import FormInput from "component/common/FormInput";
import { Link } from "react-router-dom";
import OtpInput from 'react-otp-input';

const Verification = () => {

    const [otp, setOtp] = useState("");

    const [timer, setTimer] = useState("");
    const [resendEnable, setResendEnable] = useState(false);
    const [timerCount, setTimerCount] = useState(60000);

    useEffect(() => {
        executeTimer()
    }, [timerCount,resendEnable])



    const executeTimer = () => {
        let seconds = Math.floor((timerCount / 1000) % 60);

        let minutes = Math.floor((timerCount / (1000 * 60)) % 60);

        let minuteText = minutes.toString().length == 1 ? '0' + minutes : minutes
        let secondText = seconds.toString().length == 1 ? '0' + seconds : seconds;
        if(timerCount == 60000){
            setTimer(minuteText + ':' + secondText);
        }
        setTimeout(async () => {
            if (seconds > -1) {
                setTimer(minuteText + ':' + secondText);
                let count = timerCount - 1000;
                await setTimerCount(count);
            }else{
                setResendEnable(true)
            }
        }, 1000);
    };

    const onSubmit = (inputs) => {
        try {
            history.push("/auth/login");
        } catch (err) { }
    };


    const handleResend =() =>{
        if(resendEnable){
            alert("a")
        }
    }


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
                                {console.log(resendEnable,"dada")}
                                <div className="row">
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h3 className="login-heading">
                                            <span className="title_elmo">{strings.elmo}</span>
                                            <span className="title_admin">Admin</span>
                                        </h3>
                                        <label className="font-bold-20 forgot_lable">Forgot Password</label>
                                        <p className="mb-4 text-muted discription">
                                            An verification code has been sent to<br />
                                            .....hui@gmail.com{resendEnable}
                                        </p>
                                        <div className="blank mt-3 mb-3" />
                                        <div className="mt-4 counter">
                                            <div className="text-center"><label className="mb-3 font-regular-14">{timer}</label></div>
                                            <div className="text-center"><label className="font-regular-14">Enter Verification Code</label></div>
                                        </div>

                                        <form onSubmit={onSubmit}>
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
                                                            register={input1}
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
                                                <div className="text-center resend" onClick={handleResend}>
                                                        <label className={"mb-3 font-bold-14 in-active-resend"+ (resendEnable == true ? ' resend-button' : ' ') }>Re-send Verification Code</label>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <Link to="/auth/reset-password">
                                                    <NormalButton loginButton label="Verify" />
                                                </Link>
                                            </div>

                                        </form>
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
