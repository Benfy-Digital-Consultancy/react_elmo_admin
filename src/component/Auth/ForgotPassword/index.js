import { history } from "helpers";
import React, { useState } from "react";
import "component/Auth/ForgotPassword/styles.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
import Checkbox from '@mui/material/Checkbox';
import { strings } from "service/helpers/Constants";
import { BsCheck } from "react-icons/bs";
import { AppBack } from "component/common/AppBack";
import { Link } from "react-router-dom";
import { request } from "service";
import endponts from "service/endponts";
import moment from "moment";


const ForgotPassword = () => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [mailId, setmainId] = useState("");
    const [password, setpassword] = useState("");

    const onSubmit = (inputs) => {
        let currentDate = moment().utcOffset('+05:30').format("DD-MM-YYYY hh:mm:ss")
        request({
            url: endponts.Endpoints.forgotPassword,
            method:endponts.APIMethods.POST,
            data:{
                email:inputs.mailId,
                requestedDateTime:currentDate
            }
        }).then(()=>{

            history.push({
                    pathname: "/auth/verification",
                    state: { email: inputs.mailId }
                });
        })

    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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
                                            We’ll send a Verification Code to your<br />
                                            Email ID
                                        </p>
                                        <div className="blank mt-3 mb-3" />
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mt-5">
                                                <label className="font-bold-16">E-mail ID *</label>
                                                {/* <div className="input_field"> */}
                                                <InputBox
                                                    errors={errors}
                                                    type={"text"}
                                                    value={mailId}
                                                    placeholder="test@gmail.com"
                                                    name="mailId"
                                                    register={register({
                                                        required: true,
                                                        pattern: /\S+@\S+\.\S+/,
                                                    })}
                                                />
                                                {/* <div className="tick_icon"><BsCheck size={25} /></div>
                        </div> */}

                                                <FormErrorMessage
                                                    error={errors.mailId}
                                                    messages={{
                                                        required: "Mail ID is required",
                                                        pattern: "Invalid Mail ID",
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <AppBack onClick={() => history.goBack()} label="Back to Login" />
                                            </div>
                                            <div className="mt-5">
                                                    <NormalButton loginButton label="Submit" />
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

export default ForgotPassword;
