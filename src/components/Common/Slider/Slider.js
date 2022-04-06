import React from "react";
import "./style.scss";

export const Slider = ({
  onChange,
  value,
  minValue,
  sliderMinValue,
  sliderMaxValue,
  maxValue,
  valuleType,
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

    // Init input
    setCSSProperty();
  };

  inputElements.forEach(handleInput);

  return (
    <div className="calculate-progress">
      <div className="line">
        <div className="progressed-line">
          <div className="dot">
            <div className="slider-parent">
              <div className="buble">
                <span>
                  {valuleType === "Rs." && valuleType} {value}{" "}
                  {valuleType !== "Rs." && valuleType}
                </span>
              </div>
              <input
                type="range"
                min={minValue}
                max={maxValue}
                value={value}
                onChange={({ target: { value: radius } }) => {
                  onChange(radius);
                }}
                defaultValue={defaultValue}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between fs-14 fw-500 text-grey">
        <span>{sliderMinValue}</span>
        <span>{sliderMaxValue}</span>
      </div>
    </div>
  );
};
