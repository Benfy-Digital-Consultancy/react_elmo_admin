import { history } from "helpers";
import React, { useState } from "react";
import "component/Auth/Login/style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
import Checkbox from '@mui/material/Checkbox';

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
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-3">
              <div className="container">
                <div className="row py-5 text-center">
                  <div className="col-md-9 col-lg-8 mx-auto"></div>
                </div>
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading">
                      <span className="title_elmo">ELMO</span>
                      <span className="title_admin">Admin</span>
                    </h3>
                    <p className="mb-4 text-muted discription">
                      Please provide the valid informations for a<br />
                      seamless sign in process
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mt-5">
                        <InputBox
                          errors={errors}
                          type={"text"}
                          value={mailId}
                          placeholder="Official mail ID"
                          name="mailId"
                          register={register({
                            required: true,
                            pattern: /\S+@\S+\.\S+/,
                          })}
                        />
                        <FormErrorMessage
                          error={errors.mailId}
                          messages={{
                            required: "Mail ID is required",
                            pattern: "Invalid Mail ID",
                          }}
                        />
                      </div>
                      <div className="mt-4">
                        <InputBox
                          errors={errors}
                          value={password}
                          placeholder="Password"
                          type="password"
                          name="password"
                          register={register({
                            required: true,
                          })}
                        />
                        <FormErrorMessage
                          error={errors.password}
                          messages={{
                            required: "Password is required",
                          }}
                        />
                      </div>
                      <div className=" forgot">
                        <div><Checkbox {...label} defaultChecked color="success" />
                          <span className="small">Remeber Me</span></div>
                        <div><span className="small" href="#">
                          Forgot password?
                        </span></div>
                      </div>
                      <div className="mt-5">
                        <NormalButton loginButton label="login" />
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
