import React from "react";
import logo from "assets/images/meradoc.png";
import "./styles.scss";
import { useForm } from "react-hook-form";
import FormInput from "component/common/FormInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";

const AppointmentComp = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  return (
    <div className="main-container">
      <div className="basicSection py-4">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className="sectionCall mt-4">
          <h3 className="sectionHead pb-2 mb-0">Appointment Settings</h3>
          <div className="row">
            <div className="col-9">
              <div className="row mt-4">
                <div className="col-4">
                  <div>
                    <label>Hospital Name*</label>
                    <FormInput
                      placeholder="Enter hospital name"
                      errors={errors}
                      name="hospitalName"
                      register={register({
                        required: true,
                      })}
                      error={errors.hospitalName}
                      messages={{
                        required: "Mail ID is required",
                      }}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <label>Location*</label>
                    <FormInput
                      placeholder="Enter Location"
                      errors={errors}
                      name="location"
                      register={register({
                        required: true,
                      })}
                      error={errors.location}
                      messages={{
                        required: "Mail ID is required",
                      }}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <label>Fees(In Person)*</label>
                    <FormInput
                      placeholder="Enter here"
                      errors={errors}
                      name="fees"
                      register={register({
                        required: true,
                      })}
                      error={errors.fees}
                      messages={{
                        required: "Mail ID is required",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <div>
                    <label>Fees (Video/Audio Call)*</label>
                    <FormInput
                      placeholder="Enter here"
                      errors={errors}
                      name="fees"
                      register={register({
                        required: true,
                      })}
                      error={errors.fees}
                      messages={{
                        required: "Mail ID is required",
                      }}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <label>Interval time per Appointments</label>
                    <input
                      className="disabledInput"
                      defaultValue={"15 Mins"}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <label>Time period for each Appointments</label>
                    <input
                      className="disabledInput"
                      defaultValue={"30 Mins"}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4 mb-5">
                <div className="col-4">
                  <div>
                    <label>From Time</label>
                    <NormalMultiSelect />
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <label>To Time</label>
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
  );
};

export default AppointmentComp;
