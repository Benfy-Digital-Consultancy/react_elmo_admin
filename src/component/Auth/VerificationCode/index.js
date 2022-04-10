import { history } from "helpers";
import React, { useState } from "react";
import "component/Auth/VerificationCode/style.scss";
import NormalButton from "component/common/NormalButton/NormalButton";
import { strings } from "service/helpers/Constants";
import FormInput from "component/common/FormInput";
import { Link } from "react-router-dom";

const Verification = () => {


    const onSubmit = (inputs) => {
        try {
            history.push("/auth/login");
        } catch (err) { }
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
                                            .....hui@gmail.com
                                        </p>
                                        <div className="blank mt-3 mb-3" />
                                        <div className="mt-4 counter">
                                            <div className="text-center"><label className="mb-3 font-regular-14">00.56</label></div>
                                            <div className="text-center"><label className="font-regular-14">Enter Verification Code</label></div>
                                        </div>

                                        <form onSubmit={onSubmit}>
                                            <div className="otp_align mt-5">
                                                <div className="row ">
                                                    <div className="col">
                                                        <FormInput />
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
                                                </div>
                                            </div>
                                            <div className="mt-4 ">
                                                <div className="text-center resend">
                                                    <label className="mb-3 font-bold-14">Re-send Verification Code</label>
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
