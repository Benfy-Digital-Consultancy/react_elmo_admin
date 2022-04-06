import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SliderWrapper } from "components/Common/Slider";
const FutureCorpus = () => {
  const [sipSliderValues, setSipSliderValues] = useState({
    monthlySipValueSlider: 10000000,
    initialLumpsumSlider: 100000,
    noOfYearsSlider: 20,
    rateOfReturnSlider: 10,
  });

  const [sipInputValues, setSipInputValues] = useState({
    monthlySipValue: 10000000,
    initialLumpsum: 100000,
    noOfYears: 20,
    rateOfReturn: 10,
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
    calcSIPForCorpus(monthlySipValue, initialLumpsum, noOfYears, rateOfReturn);
  }, [sipInputValues]);

  // Returns the SIP value of a desired future corpus
  const calcSIPForCorpus = (
    futureCorpus,
    initialInvestment,
    noOfYears,
    rateOfReturn
  ) => {
    var sipValue = 0;
    var futureValue = 0;
    if (futureCorpus == "" || noOfYears == "" || rateOfReturn == "") {
    } else {
      var monthlyRate = rateOfReturn / 12 / 100;
      var noOfMonths = noOfYears * 12;

      var futureValueOfInitialInvestment =
        initialInvestment * Math.pow(1 + rateOfReturn / 100, noOfYears);
      var revisedCorpus = futureCorpus - futureValueOfInitialInvestment;

      sipValue =
        (revisedCorpus * monthlyRate) /
        ((Math.pow(1 + monthlyRate, noOfMonths) - 1) * (1 + monthlyRate));
    }
    setWealthValue(sipValue.toFixed(0));
    //Your Monthly SIP : Rs.
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
      <div className="tab-title">SIP value of a desire future corpus</div>
      <SliderWrapper
        label="Future Corpus"
        value={monthlySipValueSlider}
        onChange={onChangeSliderValue}
        minValue={10000000}
        maxValue={100000000}
        sliderMinValue={`Rs. 1000000`}
        sliderMaxValue={`Rs. 1 Crore`}
        valuleType={"Rs."}
        name="monthlySipValue"
        onChangeInputFields={onChangeInputFields}
        inputValue={monthlySipValue}
      />
      <SliderWrapper
        label="Initial Investment"
        value={initialLumpsumSlider}
        onChange={onChangeSliderValue}
        minValue={100000}
        maxValue={13646000}
        sliderMinValue={`Rs. 100000`}
        sliderMaxValue={`Rs. 1 Crore`}
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
        minValue={10}
        maxValue={100}
        sliderMinValue={`10%`}
        sliderMaxValue={`100%`}
        valuleType={"%"}
        name="rateOfReturn"
        onChangeInputFields={onChangeInputFields}
        inputValue={rateOfReturn}
      />
      <div className="pt-3">
        <p className="bottom-section">Your Monthly : Rs. {wealthValue}</p>
      </div>
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(null, mapDispatchToProps)(withRouter(FutureCorpus));
