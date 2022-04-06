import React from "react";
import moment from "moment";
import { CommonInput } from "components/Common/CommonInput";
import { DatePicker } from "components/Common/DatePicker";
import { CommonSelect } from "components/Common/CommonSelect";
import { useLang } from "hooks/useLang";
const numToWords = require("number-to-words");

const RecurringAmount = ({
  details,
  selectedFreqency,
  frequencyOptions,
  handleChange,
  errors,
  minAmountRecurring,
}) => {
  const { Labels } = useLang();
  const disableDateRanges = (current) => {
    let tempArray = selectedFreqency?.SIPFREQUENCY?.[0];
    let index = tempArray?.WithoutFirstOrderSIPDates?.findIndex(
      (date) => date === moment(current).format("DD/MM/YYYY")
    );
    return index === -1;
  };

  return (
    <div className="row">
      <div className="col-4">
        <CommonSelect
          placeholder={Labels.selectPeriod}
          options={frequencyOptions}
          name={"Frequency_Type"}
          value={details.Frequency_Type}
          label={Labels.frequency}
          onChange={(e) => handleChange(e)}
          errorMessage={errors.Frequency_Type || null}
          customClass="mt-3"
        />
      </div>
      <div className="col-4">
        <CommonInput
          type="number"
          placeholder={Labels.noOfInstallments}
          label={Labels.installment}
          name="NoInstallment"
          onChange={handleChange}
          value={details.NoInstallment}
          disabled={!details.Frequency_Type}
          errorMessage={errors.NoInstallment || null}
          customClass="mt-3"
        />
      </div>
      <div className="col-4">
        <DatePicker
          label={Labels.installmentDate}
          onChange={handleChange}
          value={details.Installment_Date}
          placeholder={Labels.installmentDate}
          name={"Installment_Date"}
          disabledDate={disableDateRanges}
          disabled={!details.Frequency_Type}
          errorMessage={errors.Installment_Date || null}
          customClass="mt-3"
        />
      </div>
      <div className="col-4">
        <CommonInput
          type="number"
          sublabel={`MIN ONE TIME AMOUNT: ${Labels.rs} ${minAmountRecurring}`}
          name={"MinAmount"}
          onChange={handleChange}
          value={details.MinAmount}
          disabled={details.MinAmount.length === 12 || !details.Frequency_Type}
          errorMessage={errors.MinAmount || null}
          customClass="mt-3"
        />
        {details.MinAmount.length === 12 && (
          <div className="d-flex">
            <span
              className="ms-auto cursor-pointer mb-2"
              style={{ marginTop: "-6px" }}
              onClick={() => {
                let body = {
                  target: { name: "MinAmount", value: "" },
                };
                handleChange(body);
              }}
            >
              {Labels.clear}
            </span>
          </div>
        )}
        {details.MinAmount && (
          <span className="notes">
            {numToWords.toWords(details.MinAmount) + " Rupees only"}
          </span>
        )}
      </div>
    </div>
  );
};

export default RecurringAmount;
