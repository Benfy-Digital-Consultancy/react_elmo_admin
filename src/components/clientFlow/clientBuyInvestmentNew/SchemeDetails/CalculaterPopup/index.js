import React, { useEffect, useState } from "react";
import "./style.scss";
import Popup from "components/Common/Popup/Popup";
import { withRouter } from "react-router";
import { CommonSelect } from "components/Common/CommonSelect";
import { CommonInput } from "components/Common/CommonInput";
import validate from "service/validation";
import { validationRules } from "./validate";
import { InvestmentCalculator } from "redux/action/clientFlow/BuyInvestAct";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { amountWithRs } from "service/helperFunctions";

const CalculaterPopup = ({
  setPopup,
  popup = false,
  InvestmentCalculatorApiCall,
}) => {
  const [formDetails, setFormDetails] = useState({});
  const [investmentValue, setInvestmentValue] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);

  const [errors, setErrors] = useState({
    duration: "",
    Frequency_Type: "",
    amount: "",
    returnPercentage: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    const tempErrors = { ...errors };
    tempErrors[name] = undefined;
    setErrors({ ...tempErrors });
    setFormDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  //validate Fields
  const validateFields = (data) => {
    const fieldInvalidList = validate(data, validationRules());
    if (fieldInvalidList !== undefined) {
      setErrors({ ...errors, ...fieldInvalidList });
    }
    return !fieldInvalidList;
  };

  const handleSubmit = () => {
    let body = { ...formDetails };
    if (!validateFields(body)) return;
    handleToCalCulate();
  };

  // handleCaculate
  const handleToCalCulate = () => {
    setDisableBtn(true);
    const { duration, Frequency_Type, amount, returnPercentage } = formDetails;
    let payload = {
      TargetAmount: amount,
      Duration: duration,
      DurationType: Frequency_Type,
      RateOfPercantage: returnPercentage,
    };
    InvestmentCalculatorApiCall(payload)
      .then((data) => {
        if (data) {
          setInvestmentValue(data?.InstallmentAmout);
          setDisableBtn(false);
        }
      })
      .catch(() => {
        setDisableBtn(false);
      });
  };

  useEffect(() => {
    if (!popup) setFormDetails({});
  }, [popup]);

  return (
    <div className="investment-calculator-popup">
      <Popup isOpen={popup} setPopup={setPopup}>
        <div className="title">Investment Calculator</div>
        <div className="popup-data">
          <div className="row">
            <div className="col-lg-7 col-md-8 col-12">
              <div className="row">
                <div className="col-12">
                  <CommonInput
                    label="Target amount"
                    type="number"
                    name="amount"
                    onChange={handleChange}
                    value={formDetails.amount}
                    errorMessage={errors.amount || null}
                    isSubTextRequired={true}
                    subClassName
                  />
                </div>
                <div className="col-md-6 col-12">
                  <CommonInput
                    label="Duration"
                    type="number"
                    name="duration"
                    onChange={handleChange}
                    value={formDetails.duration}
                    errorMessage={errors.duration || null}
                    isSubTextRequired={true}
                    subClassName
                  />
                </div>
                <div className="col-md-6 col-12 investment-calculator-dropdown">
                  <CommonSelect
                    placeholder="Select"
                    options={[
                      { label: "Weeks", value: "Weeks" },
                      { label: "Months", value: "Months" },
                      { label: "Quarters", value: "Quarters" },
                      { label: "Half- Years", value: "Half- Years" },
                      { label: "Years", value: "Years" },
                    ]}
                    name="Frequency_Type"
                    value={formDetails.Frequency_Type}
                    label="Frequency Type"
                    onChange={handleChange}
                    errorMessage={errors.Frequency_Type || null}
                    // subClassName
                  />
                </div>
                <div className="col-12">
                  <CommonInput
                    label="% Rate of Return"
                    type="number"
                    name="returnPercentage"
                    onChange={handleChange}
                    value={formDetails.returnPercentage}
                    errorMessage={errors.returnPercentage || null}
                    isSubTextRequired={true}
                    subClassName
                  />
                </div>
              </div>
              <button
                className="primary-btn w-100 mt-4"
                onClick={() => handleSubmit()}
                disabled={disableBtn}
              >
                Calculate
              </button>
            </div>
            <div className="col-lg-2 d-lg-block d-none">
              <p className="border-right mb-0" />
            </div>
            {investmentValue && (
              <div className="col-lg-3 col-md-4 col-12">
                <div className="calculated-amount py-4">
                  <strong>{amountWithRs(investmentValue)}</strong>
                  <span>per {formDetails.Frequency_Type}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      InvestmentCalculatorApiCall: InvestmentCalculator,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(CalculaterPopup));
