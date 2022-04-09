import React from "react";
import logo from "assets/images/meradoc.png";
import "./styles.scss";
import FormInput from "component/common/FormInput";
import FormErrorMessage from "component/common/ErrorMessage";
import { useForm } from "react-hook-form";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import TextBox from "component/common/TextBox/TextBox";

const BasicDetailsComp = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (inputs) => {
    reset({ firstName: "" });
  };

  return (
    <div>
      <div className="main-container">
        <div className="basicSection py-4">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div className="sectionCall mt-4">
            <h3 className="sectionHead pb-2 mb-0">Basic Details</h3>
            <div className="row">
              <div className="col-9">
                <div className="row mt-5 mb-4">
                  <div className="col-4">
                    <div>
                      <label>First Name*</label>
                      <FormInput
                        placeholder="Enter Name"
                        errors={errors}
                        name="firstName"
                        register={register({
                          required: true,
                        })}
                        error={errors.firstName}
                        messages={{
                          required: "Mail ID is required",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>Last Name*</label>
                      <FormInput
                        placeholder="Enter Name"
                        errors={errors}
                        name="lastName"
                        register={register({
                          required: false,
                        })}
                        error={errors.lastName}
                        messages={{
                          required: "",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>Email ID*</label>
                      <FormInput
                        placeholder="Enter Email"
                        errors={errors}
                        name="emailId"
                        register={register({
                          required: false,
                        })}
                        error={errors.emailId}
                        messages={{
                          required: "",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 mb-4">
                    <div>
                      <label>Mobile Number*</label>
                      <FormInput
                        placeholder="Enter Mobile Number"
                        errors={errors}
                        name="mobileNumber"
                        register={register({
                          required: false,
                        })}
                        error={errors.lastName}
                        messages={{
                          required: "",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>Gender*</label>
                      <NormalMultiSelect />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>DOB*</label>
                      <FormInput
                        placeholder="Enter Mobile Number"
                        errors={errors}
                        name="mobileNumber"
                        register={register({
                          required: false,
                        })}
                        error={errors.mobileNumber}
                        messages={{
                          required: "",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-12">
                    <div>
                      <label>About*</label>
                      <TextBox />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">sa</div>
            </div>
            {/* <button onClick={handleSubmit(onSubmit)}>ok</button> */}
            <h3 className="sectionHead pb-2 mb-0 mt-5">Address Details</h3>
            <div className="row">
              <div className="col-9">
                <div className="row mt-4">
                  <div className="col-4">
                    <div>
                      <label>Address Line 1*</label>
                      <FormInput
                        placeholder="Enter address"
                        errors={errors}
                        name="address1"
                        register={register({
                          required: false,
                        })}
                        error={errors.address1}
                        messages={{
                          required: "",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>Address Line 2*</label>
                      <FormInput
                        placeholder="Enter address"
                        errors={errors}
                        name="address2"
                        register={register({
                          required: false,
                        })}
                        error={errors.address2}
                        messages={{
                          required: "",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>City*</label>
                      <NormalMultiSelect />
                    </div>
                  </div>
                </div>
                <div className="row mt-4 mb-5">
                  <div className="col-4">
                    <div>
                      <label>Pin Code*</label>
                      <FormInput
                        placeholder="Enter your pincode"
                        errors={errors}
                        name="pinCode"
                        register={register({
                          required: false,
                        })}
                        error={errors.address1}
                        messages={{
                          required: "",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>Address Line 2*</label>
                      <NormalMultiSelect />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>City*</label>
                      <NormalMultiSelect />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsComp;
