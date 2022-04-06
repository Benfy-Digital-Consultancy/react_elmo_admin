import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SliderWrapper } from "components/Common/Slider";
const MonthlySIP = () => {
  const [sipSliderValues, setSipSliderValues] = useState({
    monthlySipValueSlider: 5000,
    initialLumpsumSlider: 100000,
    noOfYearsSlider: 20,
    rateOfReturnSlider: 12,
  });

  const [sipInputValues, setSipInputValues] = useState({
    monthlySipValue: 5000,
    initialLumpsum: 100000,
    noOfYears: 20,
    rateOfReturn: 12,
  });
  const [wealthValue, setWealthValue] = useState("");
  const onChangeInputFields = ({ target: { name, value } }) => {
    setSipInputValues({
      ...sipInputValues,
      [name]: value,
    });
    setSipSliderValues({
      ...sipSliderValues,
      [name + "Slider"]: value,
    });
  };

  const onChangeSliderValue = (name, value) => {
    let inputName = name.replace(/Slider/i, "");
    setSipInputValues({
      ...sipInputValues,
      [inputName]: value,
    });
    setSipSliderValues({
      ...sipSliderValues,
      [name]: value,
    });
  };

  useEffect(() => {
    calcFutureOfSIP(
      monthlySipValueSlider,
      initialLumpsum,
      noOfYears,
      rateOfReturn
    );
  }, [sipInputValues]);

  // Returns the future value of a monthly SIP
  const calcFutureOfSIP = (
    sipValue,
    initialLumpsumValue,
    noOfYears,
    rateOfReturn
  ) => {
    var futureValue = 0;
    if (sipValue == "" || noOfYears == "" || rateOfReturn == "") {
      // alert('please enter all values');
    } else {
      var monthlyRate = rateOfReturn / 12 / 100;
      var noOfMonths = noOfYears * 12;

      var futureOfLumpsumValue =
        initialLumpsumValue * Math.pow(1 + rateOfReturn / 100, noOfYears);
      //		var futureOfSIPValue=(sipValue * (1 + monthlyRate) * ((Math.pow((1+monthlyRate),noOfMonths)) - 1)/monthlyRate);

      //var futureOfSIPValue = sipValue * (monthlyRate) * (1 + monthlyRate) * ((Math.pow((1+monthlyRate),noOfMonths)) - 1);
      var futureOfSIPValue =
        (sipValue *
          (1 + monthlyRate) *
          (Math.pow(1 + monthlyRate, noOfMonths) - 1)) /
        monthlyRate;

      futureValue = futureOfLumpsumValue + futureOfSIPValue;
      setWealthValue(futureValue.toFixed(0));
    }
  };

  const { monthlySipValue, initialLumpsum, noOfYears, rateOfReturn } =
    sipInputValues;
  const {
    monthlySipValueSlider,
    initialLumpsumSlider,
    noOfYearsSlider,
    rateOfReturnSlider,
  } = sipSliderValues;

  return (
    <React.Fragment>
      <div className="tab-title">Future Value of a Monthly SIP</div>
      <SliderWrapper
        label="Monthly SIP value"
        value={monthlySipValueSlider}
        onChange={onChangeSliderValue}
        minValue={5000}
        maxValue={100000}
        sliderMinValue={`Rs. 500`}
        sliderMaxValue={`Rs. 1 Lakh`}
        valuleType={"Rs."}
        name="monthlySipValue"
        onChangeInputFields={onChangeInputFields}
        inputValue={monthlySipValue}
      />
      <SliderWrapper
        label="Initial Lumpsum"
        value={initialLumpsumSlider}
        onChange={onChangeSliderValue}
        minValue={100000}
        maxValue={5000000}
        sliderMinValue={`Rs. 100000`}
        sliderMaxValue={`Rs. 50 Lakhs`}
        valuleType={"Rs."}
        name="initialLumpsum"
        onChangeInputFields={onChangeInputFields}
        inputValue={initialLumpsum}
      />
      <SliderWrapper
        label="No.of Years"
        value={noOfYearsSlider}
        onChange={onChangeSliderValue}
        minValue={20}
        maxValue={100}
        sliderMinValue={`20 Yrs`}
        sliderMaxValue={`100 Yrs`}
        valuleType={"Yrs"}
        name="noOfYears"
        onChangeInputFields={onChangeInputFields}
        inputValue={noOfYears}
      />
      <SliderWrapper
        label="Rate of Return"
        value={rateOfReturnSlider}
        onChange={onChangeSliderValue}
        minValue={12}
        maxValue={100}
        sliderMinValue={`12%`}
        sliderMaxValue={`100%`}
        valuleType={"%"}
        name="rateOfReturn"
        onChangeInputFields={onChangeInputFields}
        inputValue={rateOfReturn}
      />
      <div className="pt-3">
        <p className="bottom-section">Wealth created : Rs. {wealthValue}</p>
      </div>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(null, mapDispatchToProps)(withRouter(MonthlySIP));
