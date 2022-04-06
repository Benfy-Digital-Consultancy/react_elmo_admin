import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import moment from "moment";
import ClipBoardIcon from "assets/images/clipboard.svg";
import UserIcon from "assets/images/user.svg";
import ShieldIcon from "assets/images/shield.svg";
import {
  ACCOUNT_TYPE,
  HOLDING_TYPE,
  SOURCE_WEALTH,
  INDIVIDUAL_ARRAY,
  AM_ARRAY,
  INCOME_ARRAY,
  COUNTRY_BIRTH,
  STATE,
  CITY_BIRTH,
  CITY,
  COUNTRY,
  OCCUPATION,
  HOLDING_MODE,
  createFamilyErrors,
} from "service/helpers/Constants";
import { DatePicker, NormalCheckbox } from "components/Common";
import { AppBack } from "components/Common/AppBack";
import { CommonInput } from "components/Common/CommonInput";
import { CommonSelect } from "components/Common/CommonSelect";
import ErrorComponent from "components/Common/ErrorComponent";
import { NormalRadioButton } from "components/Common/NormalRadioButton";
import "./CreateFamily.scss";
import { useLang } from "hooks/useLang";

const CreateFamily = () => {
  const { Labels } = useLang();
  let [error, setErrors] = useState({ userId: "" });
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(null);
  const [bankList, setBankList] = useState([
    { default: "", account_number: "", account_type: "", ifsc: "" },
  ]);
  let [formDetails, setFormDetails] = useState({
    pan: "",
    email: "",
    full_name: "",
    dob: "",
    mobile: "",
    individual: "",
    gender: "",
    am: "",
    country_birth: "",
    city_birth: "",
    country: "",
    pinCode: "",
    state: "",
    address: "",
    city: "",
    occupation: "",
    source_wealth: "",
    income: "",
    holding_mode: "",
    nominee: "",
    holding_type: "",
    relationShip: "",
    minor: "",
    nominee_dob: "",
    guardian: "",
    communication: "",
    agree: "",
    signature: "",
  });

  let handleInputChange = (e) => {
    const { name, value } = e.target || e || {};
    const tempErrors = { ...error };
    tempErrors[name] = undefined;
    setFormDetails({ ...formDetails, [name]: value });
    // const list = [...bankList];
    // list[index][name] = value;
    // setBankList(list);
    setErrors({ ...error, ...tempErrors });
  };

  const handleBankChange = (e, index) => {
    const { name, value } = e.target || e || {};
    const tempErrors = { ...error };
    tempErrors[name] = undefined;
    const list = [...bankList];
    for (let i = 0; i < bankList.length; i++) {
      if (index !== activeIndex) {
        if (value === true) {
          bankList[i].default = false;
        }
      }
      bankList[index].default = true;
    }
    list[index][name] = value;
    setBankList(list);
    setErrors({ ...error, ...tempErrors });
  };

  const handleRemoveClick = (index) => {
    const list = [...bankList];
    list.splice(index, 1);
    setBankList(list);
  };

  const handleAddClick = () => {
    setBankList([
      ...bankList,
      { default: "", account_number: "", account_type: "", ifsc: "" },
    ]);
  };

  const dateRange = (current) => {
    return current > moment();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let requiredFields = [
      "pan",
      "email",
      "full_name",
      "dob",
      "mobile",
      "individual",
      "gender",
      "am",
      "country_birth",
      "city_birth",
      "country",
      "pinCode",
      "state",
      "address",
      "city",
      "occupation",
      "source_wealth",
      "income",
      "holding_mode",
      "default",
      "account_number",
      "account_type",
      "ifsc",
      "nominee",
      "holding_type",
      "relationShip",
      "guardian",
      "communication",
      "agree",
    ];
    let validateRequiredFields = requiredFields.every((key) => {
      if (key === "email") {
        let re = /\S+@\S+\.\S+/;
        return formDetails[key] !== "" && re.test(formDetails[key]);
      }
      return formDetails[key] !== "";
    });
    if (validateRequiredFields) {
      return null;
    } else {
      requiredFields.forEach((key) => {
        // for (let i = 0; i <= bankList?.length; i++) {
        //   if (bankList[i][key] === "") {
        //     error[key] = createFamilyErrors[key];
        //   }
        // }
        if (formDetails[key] === "" || bankList[0][key] === "") {
          error[key] = createFamilyErrors[key];
        } else if (key === "pan") {
          var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
          var panNumber = formDetails[key];
          if (regpan.test(panNumber)) {
            error[key] = "";
          } else {
            error[key] = "Invalid Pan Number";
          }
        } else if (key === "mobile") {
          var regx = /^[6-9]\d{9}$/;
          var mobile_number = formDetails[key];
          var valid = regx.test(mobile_number);
          var mobile_length = formDetails[key].length;
          if (mobile_length === 10 && valid === false) {
            error[key] = "Invalid Mobile Number";
          } else if (mobile_length === 10 && valid === true) {
            error[key] = "";
          } else if (mobile_length < 10) {
            error[key] = "Number below 10 digits";
          }
        } else if (key === "email") {
          let re = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
          let validateEmail = re.test(formDetails[key]);
          if (validateEmail) {
            error[key] = "";
          } else {
            error[key] = "Please enter valid emial id";
          }
        } else {
          error[key] = "";
        }
      });
    }
    setErrors({ ...error });
  };

  return (
    <div className="client-create-page" id="client-create-page-input">
      <div>
        <AppBack
          onClick={() => history.push("/family")}
          label="Create family member"
        />
      </div>
      <div className="page-content">
        <form className="page-form">
          <div className="form-header">
            <span>
              <img alt="clipBoardIcon" src={ClipBoardIcon} />
              {Labels.KYC} {Labels.information}
            </span>
          </div>
          <div className="input-section grey-input-ui">
            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  label="PAN"
                  name="pan"
                  placeholder="Enter your PAN number"
                  value={formDetails.pan}
                  onChange={handleInputChange}
                  errorMessage={error?.pan && createFamilyErrors.pan}
                />
              </div>
              <div className="col-md-6">
                <CommonInput
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter your email id"
                  value={formDetails.email}
                  onChange={handleInputChange}
                  errorMessage={error?.email && createFamilyErrors.email}
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  label="Full name"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={formDetails.full_name}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.full_name && createFamilyErrors.full_name
                  }
                />
              </div>
              <div className="col-md-6">
                <DatePicker
                  label="Date of Birth"
                  name="dob"
                  value={formDetails.dob}
                  dateFormat="dd/MM/yyyy"
                  onChange={handleInputChange}
                  selected={formDetails.dob}
                  shouldCloseOnSelect={true}
                  disabledDate={dateRange}
                  errorMessage={error?.dob && createFamilyErrors.dob}
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  label="Mobile number"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  value={formDetails.mobile}
                  onChange={handleInputChange}
                  errorMessage={error?.mobile && createFamilyErrors.mobile}
                />
              </div>
              <div className="col-md-6">
                <CommonSelect
                  options={INDIVIDUAL_ARRAY}
                  name="individual"
                  value={formDetails.individual}
                  label="Individual"
                  onChange={handleInputChange}
                  errorMessage={
                    error?.individual && createFamilyErrors.individual
                  }
                />
              </div>
            </div>
          </div>
          <div className="form-header">
            <span>
              <img alt="userIcon" src={UserIcon} />
              Personal Details
            </span>
          </div>
          <div className="input-section grey-input-ui">
            <div className="row w-100 align-items-center">
              <label className="side-heading">Gender</label>
              <div className="d-flex">
                <NormalRadioButton
                  id="gender"
                  checked={formDetails.gender === "male"}
                  onChange={() => {
                    let body = {
                      target: {
                        name: "gender",
                        value: "male",
                      },
                    };
                    handleInputChange(body);
                  }}
                  label="Male"
                  name="gender"
                />
                <NormalRadioButton
                  id="gender"
                  checked={formDetails.gender === "female"}
                  onChange={() => {
                    let body = {
                      target: {
                        name: "gender",
                        value: "female",
                      },
                    };
                    handleInputChange(body);
                  }}
                  label="Female"
                  name="gender"
                />
              </div>
              {error.gender && <ErrorComponent message={error.gender} />}
            </div>

            <div className="row w-100 align-items-center mt-2">
              <div className="col-md-6">
                <CommonSelect
                  options={AM_ARRAY}
                  name="am"
                  value={formDetails.am}
                  label="I am"
                  onChange={handleInputChange}
                  errorMessage={error?.am && createFamilyErrors.am}
                />
              </div>
              <div className="col-md-6">
                <CommonSelect
                  options={COUNTRY_BIRTH}
                  name="country_birth"
                  value={formDetails.country_birth}
                  label="Country of birth"
                  onChange={handleInputChange}
                  errorMessage={
                    error?.country_birth && createFamilyErrors.country_birth
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={CITY_BIRTH}
                  name="city_birth"
                  value={formDetails.city_birth}
                  label="City of birth"
                  onChange={handleInputChange}
                  errorMessage={
                    error?.city_birth && createFamilyErrors.city_birth
                  }
                />
              </div>
            </div>

            <div className="inputs-title">
              <h6>Address</h6>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={COUNTRY}
                  name="country"
                  value={formDetails.country}
                  label="Country"
                  onChange={handleInputChange}
                  errorMessage={error?.country && createFamilyErrors.country}
                />
              </div>
              <div className="col-md-6">
                <CommonInput
                  type="number"
                  label="Pincode"
                  name="pinCode"
                  placeholder="Enter your pincode"
                  value={formDetails.pinCode}
                  onChange={handleInputChange}
                  errorMessage={error?.pinCode && createFamilyErrors.pinCode}
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={STATE}
                  name="state"
                  value={formDetails.state}
                  label="State"
                  onChange={handleInputChange}
                  errorMessage={error?.state && createFamilyErrors.state}
                />
              </div>
              <div className="col-md-6">
                <CommonInput
                  label="Address"
                  name="address"
                  placeholder="Enter your Address"
                  value={formDetails.address}
                  onChange={handleInputChange}
                  errorMessage={error?.address && createFamilyErrors.address}
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={CITY}
                  name="city"
                  value={formDetails.city}
                  label="City"
                  onChange={handleInputChange}
                  errorMessage={error?.city && createFamilyErrors.city}
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={OCCUPATION}
                  name="occupation"
                  value={formDetails.occupation}
                  label="Occupation"
                  onChange={handleInputChange}
                  errorMessage={
                    error?.occupation && createFamilyErrors.occupation
                  }
                />
              </div>
              <div className="col-md-6">
                <CommonSelect
                  options={SOURCE_WEALTH}
                  name="source_wealth"
                  value={formDetails.source_wealth}
                  label="Source of wealth"
                  onChange={handleInputChange}
                  errorMessage={
                    error?.source_wealth && createFamilyErrors.source_wealth
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={INCOME_ARRAY}
                  name="income"
                  value={formDetails.income}
                  label="Income"
                  onChange={handleInputChange}
                  errorMessage={error?.income && createFamilyErrors.income}
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonSelect
                  options={HOLDING_MODE}
                  name="holding_mode"
                  value={formDetails.holding_mode}
                  label="Holding mode"
                  onChange={handleInputChange}
                  errorMessage={
                    error?.holding_mode && createFamilyErrors.holding_mode
                  }
                />
              </div>
            </div>

            <div className="inputs-title bank_account_border">
              <h6>Bank Account</h6>
              <label className="side-heading">Account detail</label>
            </div>

            {bankList.map((item, index) => {
              if (index === 5) return null;
              return (
                <React.Fragment>
                  <div className="row w-100 align-items-center">
                    <div className="col-md-6">
                      <NormalCheckbox
                        className="custom-checkbox check-box"
                        name="default"
                        onChange={(e) => {
                          handleBankChange(e, index, item);
                          setActiveIndex(index);
                        }}
                        value={item.default}
                        label="Mark as default"
                        checked={index === activeIndex}
                      />
                      {error?.default && (
                        <ErrorComponent message={error.default} />
                      )}
                    </div>
                    <div className="col-md-6">
                      <CommonInput
                        type="number"
                        label="Account number"
                        name="account_number"
                        placeholder="Enter your account number"
                        value={item.account_number}
                        onChange={(e) => handleBankChange(e, index, item)}
                        errorMessage={
                          error?.account_number &&
                          createFamilyErrors.account_number
                        }
                      />
                    </div>
                  </div>

                  <div className="row w-100 align-items-end">
                    <div className="col-md-6">
                      <CommonSelect
                        options={ACCOUNT_TYPE}
                        name="account_type"
                        value={item.account_type}
                        onChange={(e) => handleBankChange(e, index, item)}
                        errorMessage={
                          error?.account_type && createFamilyErrors.account_type
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <CommonInput
                        label="IFSC"
                        name="ifsc"
                        placeholder="Enter your IFSC"
                        value={item.ifsc}
                        onChange={(e) => handleBankChange(e, index, item)}
                        errorMessage={error?.ifsc && createFamilyErrors.ifsc}
                      />
                    </div>
                  </div>
                  <div className="row w-100 align-items-end">
                    <div className="col-md-6"></div>
                    <div className="col-md-6 d-flex justify-content-end">
                      {bankList.length !== 1 && (
                        <button
                          className="primary-btn flex-end"
                          onClick={() => handleRemoveClick(index)}
                        >
                          Remove item {index + 1}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    {index === 4
                      ? null
                      : bankList.length - 1 === index && (
                          <div className="account-detail-button mt-3">
                            <button
                              onClick={handleAddClick}
                              className="primary-btn green bordered"
                            >
                              Add another account
                            </button>
                          </div>
                        )}
                  </div>
                </React.Fragment>
              );
            })}

            <div className="w-100 bank_account_border"></div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  label="Nominee"
                  name="nominee"
                  placeholder="Enter Nominee name"
                  value={formDetails.nominee}
                  onChange={handleInputChange}
                  errorMessage={error?.nominee && createFamilyErrors.nominee}
                />
              </div>
              <div className="col-md-6">
                <CommonSelect
                  options={HOLDING_TYPE}
                  name="holding_type"
                  value={formDetails.holding_type}
                  label="Account holding type"
                  onChange={handleInputChange}
                  errorMessage={
                    error?.holding_type && createFamilyErrors.holding_type
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <CommonInput
                  label="Relationship"
                  name="relationShip"
                  placeholder="Enter relationship"
                  value={formDetails.relationShip}
                  onChange={handleInputChange}
                  errorMessage={
                    error?.relationShip && createFamilyErrors.relationShip
                  }
                />
              </div>
            </div>

            <div className="row w-100 align-items-center my-3">
              <div className="col-md-6">
                <NormalCheckbox
                  className="custom-checkbox check-box"
                  name="minor"
                  onChange={handleInputChange}
                  value={formDetails.minor}
                  label="Minor"
                />
              </div>
            </div>

            <div className="row w-100 align-items-center">
              <div className="col-md-6">
                <DatePicker
                  label="Nominee DOB"
                  name="nominee_dob"
                  dateFormat="dd/MM/yyyy"
                  value={formDetails.nominee_dob}
                  onChange={handleInputChange}
                  selected={formDetails.nominee_dob}
                  shouldCloseOnSelect={true}
                  disabledDate={dateRange}
                />
              </div>
              <div className="col-md-6">
                <CommonInput
                  label="Guardian name"
                  name="guardian"
                  placeholder="Enter name"
                  value={formDetails.guardian}
                  onChange={handleInputChange}
                  errorMessage={error?.guardian && createFamilyErrors.guardian}
                />
              </div>
            </div>
          </div>

          <div className="form-header">
            <span>
              <img alt="shieldIcon" src={ShieldIcon} />
              {Labels.verification}
            </span>
          </div>

          <div className="input-section grey-input-ui">
            <div className="row w-100 align-items-center">
              <label className="side-heading">Communication preference</label>
              <div className="d-flex">
                <NormalRadioButton
                  id="communication"
                  checked={formDetails.communication === "physical"}
                  onChange={() => {
                    let body = {
                      target: {
                        name: "communication",
                        value: "physical",
                      },
                    };
                    handleInputChange(body);
                  }}
                  label="Physical"
                  name="physical"
                />
                <NormalRadioButton
                  id="communication"
                  checked={formDetails.communication === "email"}
                  onChange={() => {
                    let body = {
                      target: {
                        name: "communication",
                        value: "email",
                      },
                    };
                    handleInputChange(body);
                  }}
                  label="Email"
                  name="email"
                />
              </div>
              {error.communication && (
                <ErrorComponent message={error.communication} />
              )}
            </div>

            <div className="row w-100 align-items-center my-3 mt-5">
              <div className="col-md-6">
                <NormalCheckbox
                  className="custom-checkbox check-box"
                  name="agree"
                  value={formDetails.agree}
                  onChange={handleInputChange}
                  label="I have read and agree to the Terms & conditions"
                />
              </div>
              {error.agree && <ErrorComponent message={error.agree} />}
            </div>
          </div>

          <div className="form-header">
            <span>
              <img alt="shieldIcon" src={ShieldIcon} />
              Signature
            </span>
          </div>
          <div className="input-section grey-input-ui">
            <div className="input">
              <div className="blank" />
              <label>Signature of the member</label>
            </div>
          </div>

          <div className="button-section">
            <button className="primary-btn bordered grey primary-btn-fontweight">
              {Labels.cancel}
            </button>
            <button
              className="primary-btn primary-btn-fontweight"
              onClick={handleSubmit}
            >
              Add account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(CreateFamily);
