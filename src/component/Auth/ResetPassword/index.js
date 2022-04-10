import { history } from "helpers";
import React, { useState } from "react";
import "component/Auth/ResetPassword/styles.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
import Checkbox from '@mui/material/Checkbox';
import { strings } from "service/helpers/Constants";
import { BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


const ResetPassword = () => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [mailId, setmainId] = useState("");
    const [password, setpassword] = useState("");

    const onSubmit = (inputs) => {
        try {
            history.push("/admin/dashboard");
        } catch (err) { }
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
                                        <label className="font-bold-20 reset_label">Forgot Password</label>
                                        <p className="mb-4 text-muted discription">
                                            Your new password must be different from <br />
                                            the previous used passwords
                                        </p>
                                        <div className="blank mt-3 mb-3" />
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mt-4">
                                                <label className="font-bold-16">Password </label>
                                                {/* <div className="input_field"> */}
                                                <InputBox
                                                    errors={errors}
                                                    value={password}
                                                    placeholder=" Password"
                                                    type="password"
                                                    name="password"
                                                    register={register({
                                                        required: true,
                                                    })}
                                                />
                                                {/* <div><label className="show" >Show</label></div>
                        </div> */}
                                                <FormErrorMessage
                                                    error={errors.password}
                                                    messages={{
                                                        required: "Password is required",
                                                    }}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <label className="font-bold-16">Confirm Password </label>
                                                {/* <div className="input_field"> */}
                                                <InputBox
                                                    errors={errors}
                                                    value={password}
                                                    placeholder=" Re-enter Password"
                                                    type="password"
                                                    name="password"
                                                    register={register({
                                                        required: true,
                                                    })}
                                                />
                                                {/* <div><label className="show" >Show</label></div>
                        </div> */}
                                                <FormErrorMessage
                                                    error={errors.password}
                                                    messages={{
                                                        required: "Password is required",
                                                    }}
                                                />
                                            </div>

                                            <div className="mt-5">
                                                <Link to="/auth/login">
                                                    <NormalButton loginButton label="Reset Password" />
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

export default ResetPassword;
