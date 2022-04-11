import { history } from "helpers";
import React, { useState } from "react";
import "component/Auth/Login/style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
import Checkbox from '@mui/material/Checkbox';
import { strings } from "service/helpers/Constants";
import { BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";


const LoginComp = () => {
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
                    <p className="mb-4 text-muted discription">
                      Please provide the valid informations for a<br />
                      seamless sign in process
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
                      <div className="mt-4">
                        <label className="font-bold-16">Password *</label>
                        {/* <div className="input_field"> */}
                        <InputBox
                          errors={errors}
                          value={password}
                          placeholder="Enter Password"
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
                      <div className="forgot">
                        <div><Checkbox {...label} defaultChecked color="success" />
                          <span className="small">Remeber Me</span></div>
                        <div>
                          <Link to="/auth/forgot-password">
                            <span className="small" href="#">
                              Forgot password?
                            </span></Link></div>
                      </div>
                      <div className="mt-5">
                        <NormalButton loginButton label="Login" />
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

export default LoginComp;
