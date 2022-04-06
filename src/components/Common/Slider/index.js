import React from "react";
import { Slider } from "./Slider";
import "./style.scss";

export const SliderWrapper = ({
  onChange,
  value,
  label,
  minValue,
  sliderMinValue,
  sliderMaxValue,
  maxValue,
  valuleType,
  name,
  onChangeInputFields,
  inputValue = "",
  defaultValue,
}) => {
  const inputElements = document.querySelectorAll('[type="range"]');

  const handleInput = (inputElement) => {
    let isChanging = false;

    const setCSSProperty = () => {
      const percent =
        ((inputElement.value - inputElement.min) /
          (inputElement.max - inputElement.min)) *
        100;
      inputElement.style.setProperty("--webkitProgressPercent", `${percent}%`);
    };

    // Set event listeners
    const handleMove = () => {
      if (!isChanging) return;
      setCSSProperty();
    };

    inputElement.addEventListener("mousemove", handleMove);
    inputElement.addEventListener("click", setCSSProperty);
    // inputElement.addEventListener("value", handleMove, setCSSProperty);

    // Init input
    setCSSProperty();
  };

  const onChangeWithCss = (e) => {
    onChangeInputFields(e);
  };

  inputElements.forEach(handleInput);
  return (
    <div className="tab-list calculate-range">
      <div className="label text-grey pr-2 fw-500 fs-18">{label}</div>
      <div className="input">
        <input
          type="number"
          name={name}
          value={inputValue}
          // onChange={onChangeInputFields}
          onChange={onChangeWithCss}
          onWheel={(event) => event.currentTarget.blur()}
          min={sliderMinValue}
          maxLength={sliderMaxValue}
        />
      </div>
      <Slider
        defaultValue={defaultValue}
        minValue={minValue}
        sliderMinValue={sliderMinValue}
        sliderMaxValue={sliderMaxValue}
        maxValue={maxValue}
        valuleType={valuleType}
        onChange={(data) => onChange(name + "Slider", data)}
        value={value}
      />
    </div>
  );
};
