import React, { useEffect, useState } from "react";
import { NormalRadioButton } from "../NormalRadioButton";
import { CommonInput } from "../CommonInput";
import { CommonSelect } from "../CommonSelect";
import { DatePicker } from "../DatePicker";
import { NormalCheckbox } from "../NormalCheckbox";
import moment from "moment";
import { useLang } from "hooks/useLang";
import { endpoints } from "service/helpers/config";
const numToWords = require("number-to-words");

export const RecurringWithdrawal = ({
  disabled = false,
  details,
  handleChangeRadio,
  errors,
  minAmountRecurring,
  handleChange,
  SchemesDetail,
  sipDetails,
  handleSelectedFrequency,
}) => {
  const { Labels } = useLang();
  const [frequencyOptions, setFrequencyOptions] = useState([]);
  const [selectedFreqency, setSelectedFrequency] = useState(null);
  useEffect(() => {
    if (sipDetails && !details.Frequency_Type) {
      let options = [];
      sipDetails.forEach((list) => {
        options.push({
          label: list.sipSchemeDetails.SIPFREQUENCY,
          value: list.sipSchemeDetails.SIPFREQUENCY,
        });
        if (options.length === sipDetails.length) {
          setFrequencyOptions([...options]);
          let selectedObj = sipDetails.find(
            (x) => x.sipSchemeDetails.SIPFREQUENCY === options[0].value
          );
          if (selectedObj) {
            setSelectedFrequency(selectedObj);
            handleSelectedFrequency(selectedObj);
          }
          handleChange({
            target: { name: "Frequency_Type", value: options[0].value },
          });
        }
      });
    }
  }, [sipDetails, handleSelectedFrequency, handleChange, details]);

  const handleInputChange = (e) => {
    let selectedObj = sipDetails.find(
      (x) => x.sipSchemeDetails.SIPFREQUENCY === e.target.value
    );
    if (selectedObj) {
      setSelectedFrequency(selectedObj);
      handleSelectedFrequency(selectedObj);
    }
    handleChange(e);
  };

  const disableDateRanges = (current) => {
    let tempArray = selectedFreqency?.SIPFREQUENCY?.[0];
    if (details.First_Order_Today === "N") {
      let index = tempArray?.FirstOrderSIPDATES?.findIndex(
        (date) => date === moment(current).format("DD/MM/YYYY")
      );
      return index === -1;
    } else {
      let index = tempArray?.WithoutFirstOrderSIPDates?.findIndex(
        (date) => date === moment(current).format("DD/MM/YYYY")
      );
      return index === -1;
    }
  };

  //handle Num To Words
  const handleNumToWords = () => {
    if (details.RecurringRadioBtn !== endpoints.unit) {
      return numToWords.toWords(details.RecurringAmount) + " Rupees only";
    } else {
      return (
        details.RecurringAmount +
        " Units of " +
        numToWords.toWords(details.RecurringAmount * SchemesDetail.NAV) +
        " Rupees only"
      );
    }
  };
  const disabledKey =
    (details.RecurringRadioBtn === endpoints.amount &&
      details.RecurringAmount.length === 12) ||
    (details.RecurringRadioBtn === endpoints.unit &&
      details.RecurringAmount.length === 8);

  return (
    <div className={`pt-5 ${disabled ? "disabled" : ""}`}>
      <div className="text-center d-flex justify-content-center px-4 pb-4 mb-2">
        <NormalRadioButton
          disabled={disabled}
          checked={details.RecurringRadioBtn === endpoints.amount}
          onChange={(e) => handleChangeRadio(e, "RecurringRadioBtn")}
          label={Labels.amount}
          name={endpoints.amount}
        />
        <NormalRadioButton
          disabled={disabled}
          checked={details.RecurringRadioBtn === endpoints.unit}
          onChange={(e) => handleChangeRadio(e, "RecurringRadioBtn")}
          label={Labels.unit}
          name={endpoints.unit}
        />
      </div>
      <div className="row">
        <div className="col-6">
          <CommonSelect
            placeholder={Labels.selectPeriod}
            options={frequencyOptions}
            name={"Frequency_Type"}
            disabled={disabled}
            value={details.Frequency_Type}
            label={Labels.frequency}
            onChange={(e) => handleInputChange(e)}
            errorMessage={errors.Frequency_Type || null}
          />
        </div>
        <div className="col-6">
          <CommonInput
            type="number"
            disabled={disabled || !details.Frequency_Type}
            placeholder={Labels.noOfInstallments}
            label={Labels.installment}
            name="NoInstallment"
            onChange={handleChange}
            value={details.NoInstallment}
            errorMessage={errors.NoInstallment || null}
          />
        </div>
        <div className="col-12">
          <DatePicker
            label={Labels.installmentDate}
            onChange={handleChange}
            value={details.Installment_Date}
            placeholder={Labels.installmentDate}
            name={"Installment_Date"}
            disabledDate={disableDateRanges}
            disabled={disabled || !details.Frequency_Type}
            errorMessage={errors.Installment_Date || null}
          />
        </div>
        <div className="col-12">
          <CommonInput
            sublabel={`${Labels.minAmount}: ${Labels.rs} ${minAmountRecurring}`}
            type="number"
            disabled={!details.Frequency_Type || disabled || disabledKey}
            name="RecurringAmount"
            onChange={handleChange}
            value={details.RecurringAmount}
            errorMessage={errors.RecurringAmount || null}
            isSubTextRequired={
              details.RecurringRadioBtn === endpoints.amount ? true : false
            }
          />
          {disabledKey && (
            <div className="d-flex">
              <span
                className="ms-auto cursor-pointer mb-2"
                style={{ marginTop: "-6px" }}
                onClick={() => {
                  let body = {
                    target: { name: "RecurringAmount", value: "" },
                  };
                  handleChange(body);
                }}
              >
                {Labels.clear}
              </span>
            </div>
          )}
          {details.RecurringAmount && (
            <span className="notes">{handleNumToWords()}</span>
          )}
        </div>
      </div>
      <div className="pt-1 row">
        <div className="col-6">
          <NormalCheckbox
            className="custom-checkbox check-box"
            name={"First_Order_Today"}
            checked={details.First_Order_Today === "Y"}
            onChange={handleChange}
            disabled={disabled}
            label={Labels.firstOrderToday}
          />
        </div>
      </div>
    </div>
  );
};
